const features = [
  {
    icon: "\uD83D\uDC64",
    title: "\u05d3\u05d5\"\u05d7 \u05de\u05e7\u05d9\u05e3 \u05e9\u05dc \u05db\u05dc \u05d4\u05d1\u05d9\u05d8\u05d5\u05d7\u05d9\u05dd",
    desc: "\u05e8\u05d5\u05d0\u05d9\u05dd \u05d1\u05de\u05d1\u05d8 \u05d0\u05d7\u05d3 \u05d0\u05ea \u05db\u05dc \u05d4\u05d1\u05d9\u05d8\u05d5\u05d7\u05d9\u05dd \u05e9\u05dc\u05db\u05dd",
  },
  {
    icon: "\uD83D\uDD0D",
    title: "\u05d6\u05d9\u05d4\u05d5\u05d9 \u05d1\u05d9\u05d8\u05d5\u05d7\u05d9\u05dd \u05db\u05e4\u05d5\u05dc\u05d9\u05dd \u05dc\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05de\u05d9\u05d8\u05d1\u05d9",
    desc: "\u05de\u05d5\u05e6\u05d0\u05d9\u05dd \u05db\u05e4\u05d9\u05dc\u05d5\u05d9\u05d5\u05ea \u05d5\u05de\u05ea\u05d0\u05d9\u05de\u05d9\u05dd \u05e2\u05d1\u05d5\u05e8\u05db\u05dd \u05ea\u05db\u05e0\u05d9\u05ea \u05e0\u05db\u05d5\u05e0\u05d4",
  },
  {
    icon: "\uD83C\uDFE0",
    title: "\u05d7\u05d9\u05e1\u05db\u05d5\u05df 5,400 \u05e9\"\u05d7 \u05d1\u05e9\u05e0\u05d4",
    desc: "\u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05de\u05d5\u05d9\u05e6\u05e2 \u05dc\u05de\u05e9\u05e4\u05d7\u05d5\u05ea \u05d9\u05e9\u05e8\u05d0\u05dc\u05d9\u05d5\u05ea \u05d1\u05de\u05e2\u05e8\u05db\u05ea \u05d4\u05d1\u05d9\u05d8\u05d5\u05d7",
  },
];

export default function TrustSection() {
  return (
    <section className="py-8 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          {features.map((f) => (
            <div key={f.title} className="flex items-start sm:items-center gap-3 max-w-xs text-center sm:text-right">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: "#e6f1fb" }}
                aria-hidden="true"
              >
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1a1a1a]">{f.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

