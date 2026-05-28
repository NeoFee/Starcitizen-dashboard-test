import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/news/HeroSection";
import NewsDashboard from "@/components/news/NewsDashboard";
import StatusBar from "@/components/status/StatusBar";
import ToolsSection from "@/components/tools/ToolsSection";
import StreamersSection from "@/components/streaming/StreamersSection";
import TwitchSection from "@/components/streaming/TwitchSection";

export default function Home() {
  return (
    <>
      {/* Fixed star field background */}
      <div className="star-field" aria-hidden="true" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <StatusBar />

        <main className="flex flex-col flex-1">
          <HeroSection />

          {/* News */}
          <section id="news">
            <NewsDashboard />
          </section>

          <hr className="section-divider mx-8" />

          {/* Streams: YouTube Content Creator + Twitch */}
          <section id="streams">
            <StreamersSection />
            <hr className="section-divider mx-8" />
            <TwitchSection />
          </section>

          <hr className="section-divider mx-8" />

          {/* Community Tools */}
          <section id="tools">
            <ToolsSection />
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
