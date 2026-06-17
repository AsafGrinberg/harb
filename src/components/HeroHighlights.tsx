type Highlight = {
  text: string;
  icon: "shield" | "document" | "savings";
  iconBg: string;
};

const highlights: Highlight[] = [
  {
    text: 'דו"ח מקיף של כל הביטוחים',
    icon: "shield",
    iconBg: "#EAF4FB",
  },
  {
    text: "זיהוי ביטוחים כפולים לחיסכון מיטבי",
    icon: "document",
    iconBg: "#EAF4FB",
  },
  {
    text: 'חיסכון 5,400 ש"ח בשנה',
    icon: "savings",
    iconBg: "#FFF1EA",
  },
];

function Icon({ type }: { type: Highlight["icon"] }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.5-2.9 7.9-7 9-4.1-1.1-7-4.5-7-9V6l7-3z" />
        <path d="M9.4 12.4l1.8 1.8 3.7-3.7" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M8 3h6l4 4v14H8a2 2 0 01-2-2V5a2 2 0 012-2z" />
        <path d="M14 3v4h4" />
        <path d="M10 12h6M10 16h6M10 8h2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 2v3" />
      <path d="M12 19v3" />
      <path d="M4.9 4.9l2.1 2.1" />
      <path d="M17 17l2.1 2.1" />
      <path d="M2 12h3" />
      <path d="M19 12h3" />
      <path d="M4.9 19.1L7 17" />
      <path d="M17 7l2.1-2.1" />
      <circle cx="12" cy="12" r="4.2" />
    </svg>
  );
}

export default function HeroHighlights() {
  return (
    <div className="w-full max-w-4xl mb-5">
      <div
        className="w-full rounded-xl border border-[#E0E6EB] bg-[#F5F8FA] px-2 sm:px-4 py-2 shadow-sm"
        dir="rtl"
      >
        <div className="flex flex-col md:flex-row md:items-center">
          {highlights.map((item, index) => (
            <div
              key={item.text}
              className="flex items-center justify-center gap-2 px-2 py-2 text-[#0D2233] text-[13px] md:text-[22px] font-semibold"
              style={{
                flex: 1,
                borderInlineStart: index > 0 ? "1px solid #D8E0E7" : "none",
              }}
            >
              <span
                className="inline-flex items-center justify-center rounded-md w-6 h-6 md:w-8 md:h-8"
                style={{ backgroundColor: item.iconBg }}
              >
                <span className={item.icon === "savings" ? "text-[#F34B1A]" : "text-[#1479B8]"}>
                  <Icon type={item.icon} />
                </span>
              </span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
