import Header from "@/components/Header";
import LeadForm from "@/components/LeadForm";
import TrustSection from "@/components/TrustSection";
import ProcessSection from "@/components/ProcessSection";
import InsuranceTypes from "@/components/InsuranceTypes";
import InfoTabs from "@/components/InfoTabs";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* ─── Hero ──────────────────────────────────────────────── */}
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
          {/* white overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#fff",
              opacity: 0.87,
            }}
            aria-hidden="true"
          />

          <div
            className="relative max-w-5xl mx-auto px-4 py-6 md:py-10 flex flex-col items-center text-center"
          >
            {/* Headline */}
            <h1
              className="text-3xl md:text-5xl font-bold leading-tight mb-2"
              style={{ color: "#0072A8" }}
            >
              בדיקת הר הביטוח
            </h1>
            <h2
              className="text-base md:text-xl font-semibold mb-4 max-w-2xl leading-snug"
              style={{ color: "#F34B1A" }}
            >
              בדקו עכשיו אם אתם משלמים ביטוח כפול וחסכו אלפי שקלים בשנה!
            </h2>

            {/* Trust badges (inline under subtitle) */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {[
                "✅ ללא עלות",
                "✅ ללא התחייבות",
                "✅ בדיקה תוך דקות",
              ].map((b) => (
                <span
                  key={b}
                  className="bg-white rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200 shadow-sm"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Form */}
            <LeadForm />
          </div>
        </section>

        {/* ─── Features ─────────────────────────────────────────── */}
        <TrustSection />

        {/* ─── Company logos ────────────────────────────────────── */}
        <ProcessSection />

        {/* ─── Insurance types ──────────────────────────────────── */}
        <InsuranceTypes />

        {/* ─── Info tabs ────────────────────────────────────────── */}
        <InfoTabs />
      </main>

      <Footer />

      {/* Sticky bottom CTA */}
      <StickyBar />
    </>
  );
}

