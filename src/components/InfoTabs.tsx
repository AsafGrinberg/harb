"use client";
import { useState } from "react";

const tabs = [
  {
    title: 'מה זה הר הביטוח?',
    content: (
      <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
        <p>
          &quot;הר הביטוח&quot; הוא אתר ממשלתי רשמי שהוקם על ידי רשות שוק ההון, ביטוח וחיסכון במשרד האוצר.
          מטרתו לאפשר לכל אזרח לאתר בקלות ביטוחים שרכש לאורך השנים ואולי שכח עליהם.
        </p>
        <p>
          באמצעות האתר ניתן לקבל דו&quot;ח מקיף של כל הביטוחים שברשותכם – כולל ביטוח חיים, בריאות, סיעוד,
          אובדן כושר עבודה, מחלות קשות ועוד.
        </p>
        <ul className="list-disc list-inside space-y-2 pr-2">
          <li>איתור ביטוחי חיים ובריאות שנרכשו ונשכחו</li>
          <li>זיהוי ביטוחים כפולים שגורמים לתשלום יתר</li>
          <li>חיסכון ממוצע של 3,500–5,400 ₪ בשנה למשפחה</li>
          <li>בדיקה חינמית, ללא התחייבות</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'למה להשתמש בהר הביטוח?',
    content: (
      <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
        <p>
          מחקרים מראים כי 85% מהמשפחות בישראל משלמות על ביטוח כפול מבלי לדעת על כך.
          ביטוח כפול מתרחש כאשר יש לכם כיסוי ביטוחי זהה אצל יותר מחברת ביטוח אחת.
        </p>
        <p>
          הדוח של הר הביטוח חושף ביטוחים כפולים ומאפשר לכם לבטל את הכפילויות ולחסוך
          אלפי שקלים מדי שנה – בלי לפגוע בכיסוי הביטוחי שלכם.
        </p>
        <ul className="list-disc list-inside space-y-2 pr-2">
          <li>ביטוח בריאות כפול (קופת חולים + פרטי)</li>
          <li>ביטוח סיעודי כפול</li>
          <li>ביטוח אובדן כושר עבודה כפול</li>
          <li>ביטוח משכנתא כפול</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'איך התהליך עובד?',
    content: (
      <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
        <ol className="space-y-4">
          {[
            { n: "1", t: "מילוי הטופס", d: "ממלאים שם, טלפון, תעודת זהות ותאריך הנפקה – לוקח פחות מ-30 שניות." },
            { n: "2", t: "נציג מתקשר", d: "נציג מומחה מתקשר אליכם ומסביר את התהליך." },
            { n: "3", t: "משיכת הדוח", d: "אנו מושכים עבורכם דוח מלא מהמערכת הממשלתית." },
            { n: "4", t: "ניתוח מקצועי", d: "הנציג מנתח את הביטוחים שברשותכם ומאתר כפילויות." },
            { n: "5", t: "חיסכון מיידי", d: "מסייעים לכם לבטל ביטוחים כפולים ולחסוך." },
          ].map((s) => (
            <li key={s.n} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#F34B1A" }}
              >
                {s.n}
              </span>
              <div>
                <p className="font-semibold text-[#1a1a1a]">{s.t}</p>
                <p className="text-gray-500">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-xs text-gray-400 pt-2">
          השירות מסופק על ידי דניאל אברמנטו, סוכן ביטוח מורשה (רישיון מס׳ L-0138100).
        </p>
      </div>
    ),
  },
  {
    title: 'למה דרכנו?',
    content: (
      <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
        <p>
          אנו סוכנות ביטוח מורשית בעלת ניסיון רב בזיהוי כפילויות ביטוחיות.
          דניאל אברמנטו, בעל רישיון סוכן ביטוח מס׳ L-0138100, מלווה אישית כל לקוח
          בתהליך מקצועי, שקוף וללא עלות.
        </p>
        <ul className="list-disc list-inside space-y-2 pr-2">
          <li>בדיקה חינמית וללא התחייבות</li>
          <li>ליווי אישי לאורך כל התהליך</li>
          <li>ניסיון של שנים בזיהוי ביטוחים כפולים</li>
          <li>מאות לקוחות מרוצים שחסכו אלפי שקלים</li>
          <li>שירות מהיר – מענה תוך שעות ספורות</li>
        </ul>
      </div>
    ),
  },
];

export default function InfoTabs() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-14 px-4 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0072A8] text-center mb-8">
          הר הביטוח – כל המידע שצריך להכיר
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="px-5 py-2 text-sm font-medium border transition-all"
              style={{
                borderRadius: "100px",
                backgroundColor: active === i ? "#0072A8" : "#fff",
                color: active === i ? "#fff" : "#374151",
                borderColor: active === i ? "#0072A8" : "#d4d4d4",
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          role="tabpanel"
          className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
        >
          {tabs[active].content}
        </div>

        <div className="text-center mt-8">
          <a
            href="#form"
            className="inline-block px-10 py-3 rounded-full text-white font-semibold text-sm hover:opacity-90 transition"
            style={{ backgroundColor: "#F34B1A" }}
          >
            לבדיקה חינמית ←
          </a>
        </div>
      </div>
    </section>
  );
}
