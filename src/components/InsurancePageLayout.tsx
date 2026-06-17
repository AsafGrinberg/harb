import Header from "./Header";
import LeadForm from "./LeadForm";
import TrustSection from "./TrustSection";
import ProcessSection from "./ProcessSection";
import InsuranceTypes from "./InsuranceTypes";
import InfoTabs from "./InfoTabs";
import Footer from "./Footer";
import StickyBar from "./StickyBar";

interface Props {
  title: string;
  subtitle: string;
}

const badges = ["✅ ללא עלות", "✅ ללא התחייבות", "✅ בדיקה תוך דקות"];

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
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {badges.map((b) => (
                <span
                  key={b}
                  className="bg-white rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200 shadow-sm"
                >
                  {b}
                </span>
              ))}
            </div>
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
