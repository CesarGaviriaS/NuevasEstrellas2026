export default function JsonLd({ data }: { data: Record<string, any> }) {
    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
            />
        </section>
    );
}
