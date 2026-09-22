import { Metadata } from 'next';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';
import PostReader from '@/components/sections/PostReader';
import { getPostBySlug, getAllPostSlugs, stripHtml, getFeaturedImageUrl } from '@/lib/wordpress';
import JsonLd from '@/components/JsonLd';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    try {
        const slugs = await getAllPostSlugs();
        if (slugs.length === 0) {
            return [{ slug: 'hello-world' }];
        }
        return slugs.map((slug) => ({ slug }));
    } catch {
        return [{ slug: 'hello-world' }];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Noticia | Torneo Nuevas Estrellas',
            description: 'Lee las últimas noticias y anuncios oficiales del Torneo Nuevas Estrellas.'
        };
    }

    const title = stripHtml(post.title.rendered);
    const description = stripHtml(post.excerpt.rendered) || `Lee "${title}" en el portal oficial de Nuevas Estrellas.`;
    const image = getFeaturedImageUrl(post, 'https://nuevasestrellas.com/articulos/20-11-2025.png');

    return {
        title: `${title} | Nuevas Estrellas`,
        description,
        openGraph: {
            title: `${title} | Nuevas Estrellas`,
            description,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ],
            type: 'article',
            publishedTime: post.date
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image]
        }
    };
}

export default async function SinglePostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    const schemaData = post ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": stripHtml(post.title.rendered),
        "image": [getFeaturedImageUrl(post, 'https://nuevasestrellas.com/articulos/20-11-2025.png')],
        "datePublished": post.date,
        "dateModified": post.date,
        "author": [{
            "@type": "Person",
            "name": post._embedded?.author?.[0]?.name || "Nuevas Estrellas"
        }]
    } : null;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            {schemaData && <JsonLd data={schemaData} />}
            <main className="flex-grow pt-20">
                <PostReader slug={slug} initialPost={post} />
            </main>
            <Footer />
        </div>
    );
}
