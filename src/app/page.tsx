import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/news/HeroSection";
import NewsDashboard from "@/components/news/NewsDashboard";
import StatusBar from "@/components/status/StatusBar";

export default function Home() {
  return (
    <>
      <Header />
      <StatusBar />
      <main className="flex flex-col flex-1">
        <HeroSection />
        <NewsDashboard />
      </main>
      <Footer />
    </>
  );
}
