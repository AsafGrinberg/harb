"use client";
import { useState } from "react";
import { CircleHelp, Loader2 } from "lucide-react";

const WEBHOOK = "https://hook.eu2.make.com/9f3wrh3omt22solb5xy4meoo32nv76vr";

function validPhone(v: string): boolean {
  return /^0[2-9]\d{7,8}$/.test(v.replace(/[-\s]/g, ""));
}

function validId(id: string): boolean {
  const padded = id.padStart(9, "0");
  if (!/^\d{9}$/.test(padded)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let n = parseInt(padded[i]) * ((i % 2) + 1);
    if (n > 9) n -= 9;
    sum += n;
  }
  return sum % 10 === 0;
}

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const MONTHS = [
  { value: "01", label: "ינואר" }, { value: "02", label: "פברואר" },
  { value: "03", label: "מרץ" },   { value: "04", label: "אפריל" },
  { value: "05", label: "מאי" },   { value: "06", label: "יוני" },
  { value: "07", label: "יולי" },  { value: "08", label: "אוגוסט" },
  { value: "09", label: "ספטמבר" },{ value: "10", label: "אוקטובר" },
  { value: "11", label: "נובמבר" },{ value: "12", label: "דצמבר" },
];
const cy = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => String(cy - i));

type FormData = {
  name: string; phone: string; id: string;
  issueDay: string; issueMonth: string; issueYear: string;
};

const INPUT_CLS =
  "w-full border border-[#d4d4d4] rounded-lg px-3 py-2.5 text-sm bg-white outline-none transition focus:border-[#F34B1A] focus:ring-2 focus:ring-[#F34B1A]/10";

const SELECT_CLS =
  "flex-1 border border-[#d4d4d4] rounded-lg px-2 py-2.5 text-sm text-center bg-white outline-none transition focus:border-[#F34B1A] focus:ring-2 focus:ring-[#F34B1A]/10";

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormData>({
    name: "", phone: "", id: "", issueDay: "", issueMonth: "", issueYear: "",
  });
  const [err1, setErr1] = useState("");
  const [err2, setErr2] = useState("");

  const set = (key: keyof FormData, val: string) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const handleStep1 = () => {
    if (data.name.trim().length < 2) { setErr1("נא להזין שם מלא"); return; }
    if (!validPhone(data.phone)) { setErr1("נא להזין מספר טלפון תקין (לדוגמה: 0501234567)"); return; }
    setErr1(""); setStep(2);
  };

  const handleSubmit = async () => {
    if (!validId(data.id)) { setErr2("מספר תעודת זהות אינו תקין"); return; }
    if (!data.issueDay || !data.issueMonth || !data.issueYear) {
      setErr2("נא לבחור יום, חודש ושנת הנפקה"); return;
    }
    const issueDate = `${data.issueYear}-${data.issueMonth}-${data.issueDay}`;
    const dt = new Date(issueDate);
    if (isNaN(dt.getTime())) { setErr2("תאריך לא תקין"); return; }
    if (dt > new Date()) { setErr2("תאריך הנפקה לא יכול להיות בעתיד"); return; }
    setErr2(""); setLoading(true);
    try {
      const pageUrl = typeof window !== "undefined" ? window.location.href : "";
      const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();

      const makePayload = {
        name: data.name,
        field_54e0af9: data.phone,
        field_d22f71f: data.id.padStart(9, "0"),
        field_0009608: issueDate,
        issue_day: data.issueDay,
        issue_month: data.issueMonth,
        issue_year: data.issueYear,
        page_url: pageUrl,
        submitted_at: new Date().toISOString(),
      };

      const leadImPayload = {
        name: data.name,
        phone: data.phone,
        ssn: data.id.padStart(9, "0"),
        ssn_date: issueDate,
        page_url: pageUrl,
        utm_source: search.get("utm_source") ?? "",
        utm_medium: search.get("utm_medium") ?? "",
        utm_campaign: search.get("utm_campaign") ?? "",
        utm_content: search.get("utm_content") ?? "",
        utm_term: search.get("utm_term") ?? "",
      };

      const [makeResult, leadImResult] = await Promise.allSettled([
        fetch(WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(makePayload),
        }),
        fetch("/api/leadim", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadImPayload),
        }),
      ]);

      const makeOk = makeResult.status === "fulfilled" && makeResult.value.ok;
      const leadImOk = leadImResult.status === "fulfilled" && leadImResult.value.ok;
      if (!makeOk && !leadImOk) {
        throw new Error("Lead submit failed");
      }

      setDone(true);
    } catch {
      setErr2("אירעה שגיאה, נסו שוב");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="form"
      className="bg-white rounded-2xl border border-[#e6e6e6] shadow-sm w-full"
      style={{ maxWidth: "460px" }}
    >
      {/* Card head */}
      <div className="px-5 pt-6 pb-0 text-center">
        <div className="inline-flex items-center gap-1.5 bg-[#e6f1fb] text-[#0c447c] text-xs px-3 py-1 rounded-lg mb-3">
          🛡 בדיקה ללא עלות וללא התחייבות
        </div>
        <h2 className="text-xl font-semibold text-[#1a1a1a] leading-tight">גלו את הביטוחים שלכם</h2>
        <p className="text-sm text-gray-500 mt-1.5 mb-4">מילוי לוקח פחות מ-30 שניות</p>
        {/* Progress */}
        <div className="flex gap-2 mb-5">
          <div className={`flex-1 h-1 rounded-sm transition-colors ${step >= 1 ? "bg-[#F34B1A]" : "bg-gray-200"}`} />
          <div className={`flex-1 h-1 rounded-sm transition-colors ${step >= 2 ? "bg-[#F34B1A]" : "bg-gray-200"}`} />
        </div>
      </div>

      {/* Done */}
      {done && (
        <div className="px-5 pb-6 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-3xl font-bold mx-auto mb-3">✓</div>
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">קיבלנו את הפנייה</h3>
          <p className="text-sm text-gray-500">נציג יחזור אליכם תוך שעות ספורות</p>
        </div>
      )}

      {/* Step 1 */}
      {!done && step === 1 && (
        <div className="px-5 pb-2">
          <div className="mb-3.5">
            <input type="text" placeholder="שם מלא" autoComplete="name"
              value={data.name} onChange={(e) => set("name", e.target.value)}
              className={INPUT_CLS} />
          </div>
          <div className="mb-3.5">
            <input type="tel" inputMode="numeric" placeholder="טלפון" autoComplete="tel" dir="ltr"
              value={data.phone} onChange={(e) => set("phone", e.target.value.replace(/[^\d-]/g, ""))}
              className={INPUT_CLS + " text-right"} />
          </div>
          {err1 && <div className="text-red-600 text-xs mb-3 px-3 py-2 bg-red-50 rounded-md" role="alert">{err1}</div>}
          <button onClick={handleStep1}
            className="w-full py-3 rounded-lg text-white font-semibold text-sm mb-2 hover:opacity-90 transition"
            style={{ backgroundColor: "#F34B1A" }}>
            המשך לבדיקה ←
          </button>
        </div>
      )}

      {/* Step 2 */}
      {!done && step === 2 && (
        <div className="px-5 pb-2">
          <div className="mb-3.5">
            <input type="text" inputMode="numeric" maxLength={9} placeholder="תעודת זהות" autoComplete="off" dir="ltr"
              value={data.id} onChange={(e) => set("id", e.target.value.replace(/\D/g, "").slice(0, 9))}
              className={INPUT_CLS + " text-right"} />
          </div>
          <div className="mb-3.5">
            <div className="flex items-center justify-between mb-1.5 gap-2">
              <p className="text-xs text-gray-500 text-right">תאריך הנפקה</p>
              <a
                href="/teudat-zehut-example.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md border transition"
                style={{ color: "#F34B1A", borderColor: "#F34B1A", backgroundColor: "#fff7f3" }}
                aria-label="איפה נמצא תאריך ההנפקה בתעודת הזהות"
              >
                <CircleHelp size={13} aria-hidden="true" />
                איפה זה?
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <select value={data.issueDay} onChange={(e) => set("issueDay", e.target.value)} className={SELECT_CLS} aria-label="יום">
                <option value="">יום</option>
                {DAYS.map((d) => <option key={d} value={d}>{parseInt(d)}</option>)}
              </select>
              <select value={data.issueMonth} onChange={(e) => set("issueMonth", e.target.value)} className={SELECT_CLS} aria-label="חודש">
                <option value="">חודש</option>
                {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <select value={data.issueYear} onChange={(e) => set("issueYear", e.target.value)} className={SELECT_CLS} aria-label="שנה">
                <option value="">שנה</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          {err2 && <div className="text-red-600 text-xs mb-3 px-3 py-2 bg-red-50 rounded-md" role="alert">{err2}</div>}
          <div className="flex gap-2 mb-2">
            <button onClick={() => setStep(1)}
              className="border border-[#d4d4d4] text-gray-600 px-4 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition">
              חזור
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 py-2.5 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#F34B1A" }}>
              {loading ? <><Loader2 className="animate-spin" size={16} aria-hidden="true" />שולח...</> : "קבלת תוצאות ←"}
            </button>
          </div>
        </div>
      )}

      {/* Legal */}
      {!done && (
        <p className="text-[11px] text-gray-400 text-center px-5 py-4 leading-relaxed border-t border-gray-50 mt-1">
          שליחת הטופס מהווה הסכמה ליצירת קשר ולמדיניות הפרטיות לפי{" "}
          <a href="/terms" className="text-gray-500 underline" target="_blank" rel="noopener noreferrer">תקנון האתר</a>.{" "}
          גילוי נאות: האתר מופעל על ידי גוף פרטי ואינו האתר הממשלתי &quot;הר הביטוח&quot;.
        </p>
      )}
    </div>
  );
}

