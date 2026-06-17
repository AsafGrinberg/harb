"use client";

type Highlight = {
  text: string;
  icon: "shield" | "document" | "savings";
};

const highlights: Highlight[] = [
  {
    text: 'דו"ח מקיף של כל הביטוחים',
    icon: "shield",
  },
  {
    text: "זיהוי ביטוחים כפולים לחיסכון מיטבי",
    icon: "document",
  },
  {
    text: 'חיסכון 5,400 ש"ח בשנה',
    icon: "savings",
  },
];

function Icon({ type }: { type: Highlight["icon"] }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-10 md:h-10 shrink-0" aria-hidden="true">
        {/* Blue Shield Background */}
        <path d="M32 2L4 12v18c0 19 14 30 28 32 14-2 28-13 28-32V12L32 2z" fill="#0072A8" />
        {/* Center Person */}
        <circle cx="32" cy="26" r="6" fill="#FFF" />
        <path d="M20 44c0-6 8-10 12-10s12 4 12 10v4H20v-4z" fill="#FFF" />
        {/* Left Person */}
        <circle cx="18" cy="30" r="4" fill="#88C0D0" />
        <path d="M10 44c0-4 5-7 8-8v8h-8z" fill="#88C0D0" />
        {/* Right Person */}
        <circle cx="46" cy="30" r="4" fill="#88C0D0" />
        <path d="M54 44c0-4-5-7-8-8v8h8z" fill="#88C0D0" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-10 md:h-10 shrink-0" aria-hidden="true">
        {/* Document Base */}
        <path d="M14 2h26l14 14v46H14V2z" fill="#0072A8" />
        <path d="M40 2v14h14" fill="#005A88" />
        <rect x="22" y="22" width="20" height="4" rx="2" fill="#FFF" />
        <rect x="22" y="32" width="24" height="4" rx="2" fill="#FFF" />
        <rect x="22" y="42" width="12" height="4" rx="2" fill="#FFF" />
        {/* Small Orange Shield */}
        <path d="M48 38l-10-4v-8l10-4 10 4v8l-10 4z" fill="#F47429" />
        <path d="M48 24l-8 3v6l8 3 8-3v-6l-8-3zm0 9l-5-2v-3l5-2 5 2v3l-5 2z" fill="#FFF" />
      </svg>
    );
  }

  // savings
  return (
    <svg viewBox="0 0 64 64" className="w-6 h-6 md:w-10 md:h-10 shrink-0" aria-hidden="true">
      {/* House Base */}
      <path d="M32 4L2 28h8v34h44V28h8L32 4z" fill="#8D5D46" />
      <path d="M32 14L10 31v29h44V31L32 14z" fill="#F8FAFC" />
      {/* Orange Shield */}
      <path d="M32 26l-12-4v-8l12-4 12 4v8l-12 4z" fill="#F47429" />
      <path d="M32 24l-9-3v-5l9-3 9 3v5l-9 3z" fill="#FFF" />
    </svg>
  );
}

export default function HeroHighlights() {
  return (
    <div className="w-full max-w-5xl mb-3 md:mb-5 mx-auto" dir="rtl">
      <div className="w-full px-2 sm:px-4 py-1 md:py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
          {highlights.map((item, index) => (
            <div
              key={item.text}
              className={`flex items-center justify-start md:justify-center gap-2 md:gap-3 px-2 md:px-4 text-[#0A1E33] text-[15px] md:text-[22px] font-extrabold leading-tight ${
                index > 0 ? "md:border-r-2 md:border-[#D8E0E7]" : ""
              }`}
              style={{ flex: 1 }}
            >
              <span className="inline-flex items-center justify-center shrink-0">
                <Icon type={item.icon} />
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}