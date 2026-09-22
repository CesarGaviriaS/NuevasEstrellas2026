'use client';

import { useState, useEffect } from 'react';
import IntroSection from '@/components/sections/IntroSection';
import HeroSection from '@/components/sections/HeroSection';
import WhoWeAreSection from '@/components/sections/WhoWeAreSection';
import AboutSection from '@/components/sections/AboutSection';
import ModelSection from '@/components/sections/ModelSection';
import ImpactSection from '@/components/sections/ImpactSection';
import MetricsSection from '@/components/sections/MetricsSection';
import AwardsSection from '@/components/sections/AwardsSection';
import TalentSection from '@/components/sections/TalentSection';
import GallerySection from '@/components/sections/GallerySection';
import PartnersSection from '@/components/sections/PartnersSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';
import { getHomeConfig, defaultHomeConfig, HomeSectionConfig } from '@/lib/wordpress';

interface HomeSectionRendererProps {
    initialConfig?: HomeSectionConfig;
}

export default function HomeSectionRenderer({ initialConfig = defaultHomeConfig }: HomeSectionRendererProps) {
    const [config, setConfig] = useState<HomeSectionConfig>(initialConfig);

    useEffect(() => {
        let isMounted = true;

        async function fetchLiveConfig() {
            try {
                const liveConfig = await getHomeConfig();
                if (isMounted) {
                    setConfig(liveConfig);
                }
            } catch (err) {
                console.warn('Usando configuración por defecto del home:', err);
            }
        }

        fetchLiveConfig();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            {config.mostrar_intro && <IntroSection />}
            {config.mostrar_hero && (
                <HeroSection 
                    title={config.hero_titulo} 
                    subtitle={config.hero_subtitulo} 
                    slide1={config.hero_slide_1}
                    slide2={config.hero_slide_2}
                    slide3={config.hero_slide_3}
                />
            )}
            {config.mostrar_quienes_somos && (
                <WhoWeAreSection 
                    intro={config.whoweare_intro} 
                    image={config.whoweare_imagen}
                />
            )}
            {config.mostrar_acerca_de && <AboutSection />}
            {config.mostrar_modelo && <ModelSection />}
            {config.mostrar_impacto && (
                <ImpactSection 
                    text={config.impact_texto} 
                    bgImage={config.impact_imagen}
                />
            )}
            {config.mostrar_metricas && (
                <MetricsSection 
                    participantes={config.metric_participantes}
                    proyectados={config.metric_proyectados}
                    categorias={config.metric_categorias}
                />
            )}
            {config.mostrar_premios && (
                <AwardsSection 
                    image={config.premios_imagen}
                />
            )}
            {config.mostrar_talento && (
                <TalentSection 
                    image={config.talento_imagen}
                />
            )}
            {config.mostrar_galeria && <GallerySection />}
            {config.mostrar_patrocinadores && (
                <PartnersSection 
                    title={config.sponsors_titulo} 
                    description={config.sponsors_descripcion} 
                    sponsors={config.sponsors}
                />
            )}
            {config.mostrar_equipo && <TeamSection />}
            {config.mostrar_contacto && (
                <ContactSection 
                    representative={config.contacto_representante}
                    email={config.contacto_email}
                    whatsapp={config.contacto_whatsapp}
                />
            )}
        </>
    );
}
