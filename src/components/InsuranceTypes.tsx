// SVG icons matching the reference site style (white circles, orange+blue icons)
const types = [
  {
    label: "ביטוח מחלות קשות",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect x="10" y="6" width="28" height="36" rx="3" fill="#0072A8" />
        <rect x="14" y="12" width="20" height="3" rx="1.5" fill="white" />
        <rect x="14" y="18" width="16" height="3" rx="1.5" fill="white" />
        <circle cx="33" cy="33" r="9" fill="#F34B1A" />
        <path d="M33 28v10M28 33h10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "ביטוח משכנתא",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <path d="M8 24L24 10l16 14v16H30v-9h-12v9H8V24z" fill="#0072A8" />
        <circle cx="35" cy="34" r="8" fill="#F34B1A" />
        <path d="M31.5 34l2.5 2.5 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "ביטוח בריאות",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <path d="M24 40C14 33 8 26 8 19a8 8 0 0116-2 8 8 0 0116 2c0 7-6 14-16 21z" fill="#F34B1A" />
        <path d="M18 19h12M24 13v12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "ביטוח חיים",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <path d="M24 6L8 18v22h12V28h8v12h12V18L24 6z" fill="#0072A8" />
        <circle cx="24" cy="14" r="5" fill="#F34B1A" />
        <path d="M21 14h6M24 11v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "ביטוח רכב",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect x="6" y="20" width="36" height="16" rx="4" fill="#0072A8" />
        <path d="M12 20l4-8h16l4 8" stroke="#0072A8" strokeWidth="2" fill="none" />
        <circle cx="14" cy="36" r="5" fill="white" stroke="#0072A8" strokeWidth="2" />
        <circle cx="34" cy="36" r="5" fill="white" stroke="#0072A8" strokeWidth="2" />
        <path d="M24 14l2 3-3 2 3 2-2 3" stroke="#F34B1A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <circle cx="14" cy="36" r="2" fill="#0072A8" />
        <circle cx="34" cy="36" r="2" fill="#0072A8" />
      </svg>
    ),
  },
  {
    label: "ביטוח אובדן כושר עבודה",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="24" cy="10" r="5" fill="#0072A8" />
        <path d="M14 26c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#0072A8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="14" y="25" width="20" height="13" rx="3" fill="#0072A8" />
        <circle cx="34" cy="36" r="7" fill="#F34B1A" />
        <path d="M31 36h6M34 33v6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "ביטוח לעסק",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <circle cx="17" cy="14" r="5" fill="#0072A8" />
        <circle cx="31" cy="14" r="5" fill="#0072A8" opacity="0.6" />
        <path d="M6 36c0-8 5-13 11-13s11 5 11 13" fill="#0072A8" />
        <path d="M28 36c0-6 3-11 8-13" stroke="#0072A8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="35" cy="30" r="8" fill="#F34B1A" />
        <path d="M32 30l2 2.5 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function InsuranceTypes() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: "#0072A8" }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-12">
          מה נאתר עבורך בדו&quot;ח המקיף של הר הביטוח?
        </h2>

        {/* Icons row */}
        <div
          className="flex flex-wrap justify-center gap-6 md:gap-2"
          style={{ direction: "ltr" }}
        >
          {types.map((t) => (
            <a
              key={t.label}
              href="#form"
              className="flex flex-col items-center gap-3 group"
              style={{ width: "110px" }}
            >
              {/* White circle */}
              <div
                className="flex items-center justify-center rounded-full bg-white shadow-md group-hover:shadow-lg transition-shadow"
                style={{
                  width: "84px",
                  height: "84px",
                  border: "1.5px solid rgba(0,0,0,0.1)",
                }}
              >
                {t.svg}
              </div>
              {/* Underlined label */}
              <span
                className="text-white text-xs font-medium underline leading-snug text-center"
                style={{ direction: "rtl" }}
              >
                {t.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
