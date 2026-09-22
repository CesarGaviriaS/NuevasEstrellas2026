import Navbar from '@/components/sections/Navbar';
import HomeSectionRenderer from '@/components/sections/HomeSectionRenderer';
import Footer from '@/components/sections/Footer';
import { getHomeConfig } from '@/lib/wordpress';

export default async function Home() {
  const initialConfig = await getHomeConfig();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HomeSectionRenderer initialConfig={initialConfig} />
      </main>
      <Footer />
    </div>
  );
}
