import Header from "./Header";
import LeadForm from "./LeadForm";
import TrustSection from "./TrustSection";
import ProcessSection from "./ProcessSection";
import InsuranceTypes from "./InsuranceTypes";
import InfoTabs from "./InfoTabs";
import Footer from "./Footer";
import StickyBar from "./StickyBar";
import HeroHighlights from "./HeroHighlights";

interface Props {
  title: string;
  subtitle: string;
}

export default function InsurancePageLayout({ title, subtitle }: Props) {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section
          style={{
            backgroundColor: "#94CDDB",
            backgroundImage: "url('/ChatGPT-Image-Sep-29-2025-04_14_39-PM.png')",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
          className="overflow-hidden"
        >
          <div
            style={{ position: "absolute", inset: 0, backgroundColor: "#fff", opacity: 0.87 }}
            aria-hidden="true"
          />
          <div className="relative max-w-5xl mx-auto px-4 py-6 md:py-10 flex flex-col items-center text-center">
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-2"
              style={{ color: "#0072A8" }}
            >
              {title}
            </h1>
            <h2
              className="text-base md:text-xl font-semibold mb-4 max-w-2xl leading-snug"
              style={{ color: "#F34B1A" }}
            >
              {subtitle}
            </h2>
            <HeroHighlights />
            <LeadForm />
          </div>
        </section>

        <TrustSection />
        <ProcessSection />
        <InsuranceTypes />
        <InfoTabs />
      </main>

      <Footer />
      <StickyBar />
    </>
  );
}
