const navLinks = [
  { label: "הר ביטוח", href: "/" },
  { label: "הר ביטוח בדיקת ביטוחים", href: "/" },
  { label: "הר ביטוח לאדם שנפטר", href: "/" },
  { label: "בלוג", href: "/" },
];

const duplLinks = [
  { label: "כפל ביטוחי בריאות", href: "/כפל-ביטוחי-בריאות" },
  { label: "כפל ביטוח תאונות אישיות", href: "/כפל-ביטוח-תאונות-אישיות" },
  { label: "כפל ביטוח סיעודי", href: "/כפל-ביטוח-סיעודי" },
  { label: "כפל ביטוח משכנתא", href: "/כפל-ביטוח-משכנתא" },
  { label: "כפל ביטוח חיים", href: "/כפל-ביטוח-חיים" },
  { label: "כפל ביטוח דירה ותכולה", href: "/כפל-ביטוח-דירה-ותכולה" },
  { label: "כפל ביטוח אובדן כושר עבודה", href: "/כפל-ביטוח-אובדן-כושר-עבודה" },
];

const articles = [
  { label: "ביטוח סיעודי – פרטי או קופת חולים?", href: "/ביטוח-סיעודי-פרטי-או-קופת-חולים" },
  { label: "כיצד לחסוך בביטוח חיים", href: "/כפל-ביטוח-חיים" },
  { label: "מדריך לביטוח אובדן כושר עבודה", href: "/כפל-ביטוח-אובדן-כושר-עבודה" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F34B1A" }} aria-label="תחתית האתר">
      {/* Main columns */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo column */}
        <div className="flex flex-col items-start gap-4">
          <img src="/logo.png" alt="הר הביטוחים שלי" className="h-16 object-contain" />
          <p className="text-white/80 text-xs leading-relaxed">
            בודקים. משווים. חוסכים.<br />
            סוכנות ביטוח פרטית מוסמכת
          </p>
        </div>

        {/* ניווט באתר */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 border-b border-white/20 pb-2">ניווט באתר</h3>
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white/80 hover:text-white text-xs transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* כפל ביטוח */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 border-b border-white/20 pb-2">כפל ביטוח</h3>
          <ul className="space-y-2">
            {duplLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white/80 hover:text-white text-xs transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* מאמרים */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-4 border-b border-white/20 pb-2">מאמרים אחרונים</h3>
          <ul className="space-y-2">
            {articles.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-white/80 hover:text-white text-xs transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom legal strip */}
      <div
        className="border-t text-center py-4 px-4"
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
      >
        <p className="text-white/70 text-xs">
          © {new Date().getFullYear()} הר הביטוחים שלי | סוכנות ביטוח פרטית מוסמכת |{" "}
          <a href="/terms" className="underline hover:text-white transition-colors">תנאי שימוש</a>{" "}
          |{" "}
          <a href="/terms" className="underline hover:text-white transition-colors">מדיניות פרטיות</a>
          <br />
          גילוי נאות: אתר זה מופעל על ידי גוף פרטי ואינו האתר הממשלתי &quot;הר הביטוח&quot;.
        </p>
      </div>

      {/* Extra legal strip */}
      <div className="py-3 px-4 text-center" style={{ backgroundColor: "rgba(0,0,0,0.28)" }}>
        <p className="text-white/80 text-xs">
          <a href="/terms" className="underline hover:text-white transition-colors">בכפוף לתקנון</a>
          {" | "}האתר מופעל ע&quot;י סוכנות ביטוח פרטית מוסמכת
          {" | "}הבהרה: האתר אינו &quot;הר הביטוח&quot; הממשלתי
        </p>
      </div>
    </footer>
  );
}

