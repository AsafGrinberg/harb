import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThankYouConversionTracker from "@/components/ThankYouConversionTracker";

export const metadata: Metadata = {
  title: "תודה שבחרת בנו | הר ביטוח",
  description: "פרטיך התקבלו בהצלחה. אחד ממנהלי התיקים שלנו יחזור אליך בקרוב.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <ThankYouConversionTracker />
      <Header />
      <main
        className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center"
        dir="rtl"
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{ backgroundColor: "#E8F5E9" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10"
            fill="none"
            stroke="#2E7D32"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl font-extrabold mb-3"
          style={{ color: "#0072A8" }}
        >
          תודה שבחרת בנו!
        </h1>

        {/* Sub-message */}
        <p
          className="text-lg md:text-xl font-semibold mb-2 max-w-lg"
          style={{ color: "#1a1a1a" }}
        >
          קיבלנו את פרטיך בהצלחה.
        </p>
        <p
          className="text-base md:text-lg text-gray-600 max-w-md mb-8 leading-relaxed"
        >
          אחד ממנהלי התיקים שלנו יתקשר אליך בקרוב —{" "}
          <span className="font-bold text-[#F34B1A]">תהיה זמין בדקות הקרובות</span>.
        </p>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-gray-500">
          <span>✔ ייעוץ מקצועי וחינמי</span>
          <span>✔ ללא התחייבות</span>
          <span>✔ חיסכון ממוצע 5,400 ש&quot;ח בשנה</span>
        </div>

        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm shadow-md hover:scale-105 transition-transform"
          style={{ background: "linear-gradient(135deg,#F34B1A 0%,#ff6a3f 100%)" }}
        >
          חזרה לדף הבית
        </Link>
      </main>
      <Footer />
    </>
  );
}
