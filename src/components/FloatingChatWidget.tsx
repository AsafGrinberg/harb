"use client";

import { useMemo, useRef, useState } from "react";
import { X, Send, ShieldCheck } from "lucide-react";

type ChatMessage = {
  id: number;
  sender: "bot" | "user";
  text: string;
};

type ChatData = {
  name: string;
  phone: string;
  tz: string;
  issueDate: string;
  insurances: string[];
};

const WEBHOOK_URL = "https://hook.eu2.make.com/ro15qdcxvb9ciuhfum8ebd2ojkr3g3s9";
const BRAND_ICON_SRC = "/הר-ביטוח.png";

const insuranceOptions = [
  "ביטוח מחלות קשות",
  "ביטוח משכנתא",
  "ביטוח בריאות",
  "ביטוח חיים",
  "ביטוח רכב",
  "ביטוח אובדן כושר עבודה",
  "ביטוח סיעודי",
  "ביטוח תאונות אישיות",
  "ביטוח לעסק",
  "אחר",
];

const initialData: ChatData = {
  name: "",
  phone: "",
  tz: "",
  issueDate: "",
  insurances: [],
};

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [step, setStep] = useState(0);
  const [quickReplies, setQuickReplies] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputPlaceholder, setInputPlaceholder] = useState("...הקלד הודעה");
  const [inputType, setInputType] = useState<"text" | "tel" | "number">("text");
  const [showInput, setShowInput] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [showMulti, setShowMulti] = useState(false);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [showConsent, setShowConsent] = useState(false);
  const [showManagerCard, setShowManagerCard] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<ChatData>(initialData);
  const idRef = useRef(1);

  const progress = useMemo(() => {
    const map: Record<number, number> = { 0: 10, 1: 25, 2: 40, 3: 55, 4: 70, 5: 85, 6: 100 };
    return map[step] ?? 0;
  }, [step]);

  const whatsappDeepLink = useMemo(() => {
    const selected = data.insurances.length > 0 ? data.insurances.join(", ") : "לא צוינו";
    const text = `היי, שמי ${data.name || "-"}, תעודת זהות ${data.tz || "-"}, תאריך הנפקה ${data.issueDate || "-"} מעוניין/ת לבצע סדר בתיק הביטוחי, לבדוק כפילויות, להוזיל עלויות. למיטב ידיעתי יש לי ביטוח/י: ${selected}. אשמח לשוחח`;
    return `https://wa.me/972547136655?text=${encodeURIComponent(text)}`;
  }, [data]);

  const nextId = () => {
    const id = idRef.current;
    idRef.current += 1;
    return id;
  };

  const addBot = (text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), sender: "bot", text }]);
  };

  const addUser = (text: string) => {
    setMessages((prev) => [...prev, { id: nextId(), sender: "user", text }]);
  };

  const resetInputsVisibility = () => {
    setQuickReplies([]);
    setShowInput(false);
    setShowDate(false);
    setShowMulti(false);
    setShowConsent(false);
    setShowManagerCard(false);
    setErrorText("");
  };

  const askStep = (nextStep: number) => {
    setStep(nextStep);
    resetInputsVisibility();

    if (nextStep === 0) {
      addBot("85% מהמשפחות משלמות 3,500 שח מיותרים בשנה על ביטוחים כפולים. הבדיקה חינם ולוקחת בערך דקה. שנחבר אותך לנציג לבדיקה מיידית?");
      setQuickReplies(["כן, חברו אותי", "אולי אחר כך"]);
      return;
    }

    if (nextStep === 1) {
      addBot("מה השם המלא שלך?");
      setInputPlaceholder("שם מלא");
      setInputType("text");
      setShowInput(true);
      return;
    }

    if (nextStep === 2) {
      addBot(`תודה ${data.name || "!"} מה מספר הטלפון שלך?`);
      setInputPlaceholder("מספר טלפון");
      setInputType("tel");
      setShowInput(true);
      return;
    }

    if (nextStep === 3) {
      addBot("מה מספר תעודת הזהות שלך?");
      setInputPlaceholder("תעודת זהות");
      setInputType("number");
      setShowInput(true);
      return;
    }

    if (nextStep === 4) {
      addBot("מה תאריך ההנפקה של תעודת הזהות?");
      setShowDate(true);
      return;
    }

    if (nextStep === 5) {
      addBot("אילו ביטוחים יש לך כיום? אפשר לבחור יותר מאפשרות אחת.");
      setShowMulti(true);
      return;
    }

    if (nextStep === 6) {
      addBot("מצוין. נשאר רק אישור אחרון כדי שנוכל לשלוח לנציג.");
      setShowConsent(true);
    }
  };

  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      askStep(0);
    }
  };

  const handleQuickReply = (reply: string) => {
    addUser(reply);
    if (reply.includes("אולי")) {
      addBot("בשמחה, כשתרצו נציג כאן בשבילכם.");
      setQuickReplies(["כן, חברו אותי"]);
      return;
    }
    askStep(1);
  };

  const validatePhone = (v: string) => /^0[2-9]\d{7,8}$/.test(v.replace(/[-\s]/g, ""));
  const validateId = (v: string) => /^\d{5,9}$/.test(v);

  const handleInputSend = () => {
    const value = inputValue.trim();
    if (!value) return;

    if (step === 1) {
      if (value.length < 2) {
        setErrorText("נא להזין שם מלא");
        return;
      }
      addUser(value);
      setData((prev) => ({ ...prev, name: value }));
      setInputValue("");
      askStep(2);
      return;
    }

    if (step === 2) {
      if (!validatePhone(value)) {
        setErrorText("מספר טלפון לא תקין");
        return;
      }
      addUser(value);
      setData((prev) => ({ ...prev, phone: value }));
      setInputValue("");
      askStep(3);
      return;
    }

    if (step === 3) {
      if (!validateId(value)) {
        setErrorText("תעודת זהות לא תקינה");
        return;
      }
      addUser(value);
      setData((prev) => ({ ...prev, tz: value }));
      setInputValue("");
      askStep(4);
    }
  };

  const handleDateContinue = () => {
    if (!dateValue) {
      setErrorText("נא לבחור תאריך הנפקה");
      return;
    }
    addUser(dateValue);
    setData((prev) => ({ ...prev, issueDate: dateValue }));
    askStep(5);
  };

  const toggleInsurance = (item: string) => {
    setSelectedInsurances((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleMultiContinue = () => {
    if (selectedInsurances.length === 0) {
      setErrorText("בחרו לפחות סוג ביטוח אחד");
      return;
    }
    addUser(selectedInsurances.join(" | "));
    setData((prev) => ({ ...prev, insurances: selectedInsurances }));
    askStep(6);
  };

  const submitLead = async () => {
    if (!consentChecked) {
      setErrorText("יש לאשר תקנון לפני שליחה");
      return;
    }

    setIsSubmitting(true);
    setErrorText("");
    try {
      const pageUrl = typeof window !== "undefined" ? window.location.href : "";
      const search = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();

      const makePayload = {
        name: data.name,
        phone: data.phone,
        id: data.tz,
        issue_date: data.issueDate,
        insurances: data.insurances,
        page_url: pageUrl,
        submitted_at: new Date().toISOString(),
        source: "floating_chat_widget",
      };

      const leadImPayload = {
        name: data.name,
        phone: data.phone,
        ssn: data.tz,
        ssn_date: data.issueDate,
        page_url: pageUrl,
        utm_source: search.get("utm_source") ?? "",
        utm_medium: search.get("utm_medium") ?? "",
        utm_campaign: search.get("utm_campaign") ?? "",
        utm_content: search.get("utm_content") ?? "",
        utm_term: search.get("utm_term") ?? "",
      };

      const [makeResult, leadImResult] = await Promise.allSettled([
        fetch(WEBHOOK_URL, {
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

      addUser("אני מאשר/ת ושולח/ת את הפרטים");
      addBot("✅ קיבלתי את כל הפרטים! בדקתי - ככל הנראה ניתן לחסוך לך אלפי שקלים בשנה בבחירת ביטוחים נכונה וניהול מדויק 💰");
      addBot("אני זמין לך עכשיו בווטסאפ להמשך השיחה ולתהליך באופן מיידי 👇");
      resetInputsVisibility();
      setShowManagerCard(true);
      setStep(7);
    } catch {
      setErrorText("אירעה שגיאה בשליחה. נסו שוב.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Left call now button */}
      <div className="fixed left-2 md:left-6 bottom-3 md:bottom-28 z-[90]">
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-[#F34B1A]/25 animate-ping" style={{ animationDuration: "1.6s" }} />
          <a
            href="tel:0776051455"
            aria-label="נציג זמין במיידי התקשר עכשיו"
            className="relative inline-flex items-center justify-start gap-1.5 md:gap-3 w-auto px-2.5 md:px-4 py-2 md:py-3 rounded-full text-white font-bold text-[10px] md:text-sm shadow-2xl hover:scale-105 transition-transform whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg,#F34B1A 0%, #ff6a3f 100%)",
              border: "2px solid rgba(255,255,255,0.7)",
            }}
          >
            <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/20 flex items-center justify-center">📞</span>
            <span>נציג זמין במיידי - התקשר עכשיו</span>
          </a>
        </div>
      </div>

      {/* Floating controls */}
      <div className="fixed right-2 md:right-6 bottom-3 md:bottom-28 z-[90] flex flex-col items-end gap-2 md:gap-3">
        <div className="relative w-20 flex justify-end">
          <a
            href="https://wa.me/972547136655"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="וואטסאפ"
            className="relative w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform bg-[#25D366]"
          >
            <WhatsAppIcon />
            <span
              className="absolute -top-1 -right-1 z-10 w-[22px] h-[22px] rounded-full bg-red-600 text-white text-[12px] font-bold flex items-center justify-center border-2 border-white shadow"
              aria-label="הודעה חדשה"
            >
              1
            </span>
          </a>
        </div>

        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-end">
          <span className="absolute inset-0 rounded-full border-2 border-[#F34B1A]/40 animate-ping" style={{ animationDuration: "2s" }} />
          <span className="absolute inset-[8px] rounded-full border border-[#FF9C7C]/70 animate-ping" style={{ animationDuration: "2.4s", animationDelay: "0.4s" }} />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#ffd2c1]"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-40px)`,
                boxShadow: "0 0 10px #ffb69e",
                opacity: 0.8,
              }}
              aria-hidden="true"
            />
          ))}

          <div
            id="chat-bubble"
            className="absolute right-full mr-1 top-1/2 -translate-y-1/2 md:right-auto md:mr-0 md:-left-2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-full bg-white border border-[#F34B1A]/30 rounded-xl px-2.5 md:px-3 py-1.5 md:py-2 text-[10px] md:text-xs font-semibold text-gray-700 shadow-md whitespace-nowrap z-20"
          >
            🛡️ נציג זמין עכשיו
            <br />
            לחצו לבדיקת ביטוח חינם
          </div>

          <button
            id="chat-fab"
            onClick={openChat}
            aria-label="פתיחת צאט"
            className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-4 border-[#F34B1A] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
          >
            <img src={BRAND_ICON_SRC} alt="הר ביטוח" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          </button>
        </div>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed z-[95] right-4 md:right-6 bottom-48 w-[min(92vw,360px)] bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-[#0072A8] text-white p-3 flex items-center justify-between gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center"
              aria-label="סגירה"
            >
              <X size={16} />
            </button>
            <div className="text-right flex-1">
              <p className="text-sm font-semibold">הר ביטוח - בדיקה חינם</p>
              <p className="text-xs text-blue-100">🟢 נציג זמין עכשיו</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white p-1.5">
              <img src={BRAND_ICON_SRC} alt="logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="px-3 pt-2 pb-1 border-b border-gray-100">
            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
              <span>{progress}%</span>
              <span>השלמת הבדיקה</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#F34B1A] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="h-72 overflow-y-auto px-3 py-3 bg-[#f8fbff]">
            <div className="flex flex-col gap-2">
              {messages.map((m) => (
                <div key={m.id} className={m.sender === "bot" ? "self-end" : "self-start"}>
                  <div
                    className={m.sender === "bot"
                      ? "bg-white border border-gray-200 text-gray-800 rounded-xl rounded-tr-sm px-3 py-2 text-sm max-w-[260px]"
                      : "bg-[#0072A8] text-white rounded-xl rounded-tl-sm px-3 py-2 text-sm max-w-[260px]"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 border-t border-gray-100 bg-white">
            {errorText && <p className="text-xs text-red-600 mb-2">{errorText}</p>}

            {quickReplies.length > 0 && (
              <div className="grid gap-2 mb-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="w-full border border-[#0072A8]/20 rounded-lg py-2 text-sm font-medium text-[#0072A8] hover:bg-[#eef7ff]"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {showDate && (
              <div className="flex gap-2 mb-2">
                <input
                  type="date"
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={dateValue}
                  onChange={(e) => setDateValue(e.target.value)}
                />
                <button
                  onClick={handleDateContinue}
                  className="px-3 py-2 rounded-lg bg-[#F34B1A] text-white text-sm font-semibold"
                >
                  המשך
                </button>
              </div>
            )}

            {showMulti && (
              <div className="mb-2">
                <div className="max-h-28 overflow-y-auto border border-gray-200 rounded-lg p-2 grid gap-1">
                  {insuranceOptions.map((item) => (
                    <label key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={selectedInsurances.includes(item)}
                        onChange={() => toggleInsurance(item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleMultiContinue}
                  className="w-full mt-2 py-2 rounded-lg bg-[#F34B1A] text-white text-sm font-semibold"
                >
                  המשך
                </button>
              </div>
            )}

            {showConsent && (
              <div className="mb-2 border border-gray-200 rounded-lg p-2">
                <label className="flex gap-2 text-[11px] text-gray-600 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    שליחת הפרטים מהווה הסכמה ליצירת קשר ולמדיניות הפרטיות בהתאם ל
                    <a href="/terms" className="text-[#0072A8] underline" target="_blank" rel="noopener noreferrer"> תקנון האתר</a>.
                    גילוי נאות: האתר מופעל על ידי גוף פרטי ואינו האתר הממשלתי "הר הביטוח".
                  </span>
                </label>
                <button
                  onClick={submitLead}
                  disabled={isSubmitting}
                  className="w-full mt-2 py-2 rounded-lg bg-[#0072A8] text-white text-sm font-semibold disabled:opacity-60 inline-flex items-center justify-center gap-1"
                >
                  <ShieldCheck size={14} />
                  {isSubmitting ? "שולח..." : "אני מאשר/ת ושולח/ת את הפרטים"}
                </button>
              </div>
            )}

            {showManagerCard && (
              <div className="mb-2 rounded-2xl p-3 text-white" style={{ backgroundColor: "#22c55e" }}>
                <p className="text-sm font-bold">💬 אסף גרינברג - מנהל תיק אישי</p>
                <p className="text-xs text-green-50 mt-0.5">זמין עכשיו · ייעוץ אישי ומקצועי</p>
                <a
                  href={whatsappDeepLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full bg-white text-[#157a3a] rounded-full py-2 text-sm font-bold inline-flex items-center justify-center"
                >
                  📣 פתח שיחה עכשיו
                </a>
              </div>
            )}

            {showInput && (
              <div className="flex gap-2">
                <button
                  onClick={handleInputSend}
                  className="w-10 h-10 rounded-lg bg-[#0072A8] text-white flex items-center justify-center"
                  aria-label="שלח"
                >
                  <Send size={15} />
                </button>
                <input
                  type={inputType}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleInputSend();
                  }}
                  placeholder={inputPlaceholder}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
