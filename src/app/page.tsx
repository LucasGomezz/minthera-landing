import { PetalField } from "@/components/background/PetalField";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Closing } from "@/components/sections/Closing";
import { IdealFor } from "@/components/sections/IdealFor";
import { Work } from "@/components/sections/Work";
import { BrowserMockup } from "@/components/mockup/BrowserMockup";
import { CodePanel } from "@/components/mockup/CodePanel";
import { Hero } from "@/components/sections/Hero";
import { StoryLayout } from "@/components/story/StoryLayout";
import { StoryProvider } from "@/components/story/StoryProvider";
import { StorySection } from "@/components/story/StorySection";
import { stages } from "@/content/site";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Saltar al contenido
      </a>
      <PetalField />
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <StoryProvider>
          <StoryLayout
            intro={<Hero />}
            aside={
              <div className="relative">
                <BrowserMockup />
                <CodePanel />
              </div>
            }
            mobileAside={<BrowserMockup compact />}
          >
            {stages.map((stage, i) => (
              <StorySection key={stage.id} stage={stage} index={i + 1} />
            ))}
          </StoryLayout>
        </StoryProvider>
        <Work />
        <IdealFor />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
