const logos = [
  { src: "/logos/ayalon.png",       alt: "איילון" },
  { src: "/logos/clal.png",         alt: "כלל" },
  { src: "/logos/phoenix.png",      alt: "הפניקס" },
  { src: "/logos/migdal.png",       alt: "מגדל" },
  { src: "/logos/hachshara.png",    alt: "הכשרה" },
  { src: "/logos/menora.png",       alt: "מנורה" },
  { src: "/logos/meitav.png",       alt: "מיטב" },
  { src: "/logos/harel.png",        alt: "הראל" },
  { src: "/logos/altshuler.png",    alt: "אלטשולר שחם" },
  { src: "/logos/analyst.png",      alt: "אנליסט" },
  { src: "/logos/excellence.png",   alt: "אקסלנס" },
  { src: "/logos/helman-aldubi.png",alt: "הלמן אלדובי" },
  { src: "/logos/infinity.png",     alt: "אינפיניטי" },
  { src: "/logos/more.png",         alt: "מור" },
  { src: "/logos/psagot.png",       alt: "פסגות" },
  { src: "/logos/yelin-lapidot.png",alt: "ילין לפידות" },
];

export default function ProcessSection() {
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm font-semibold text-[#F34B1A] mb-2 uppercase tracking-wide">
          חברות ביטוח
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0072A8] mb-8">
          בדיקות והשוואות עם כל חברות הביטוח
        </h2>
      </div>

      {/* Infinite logo carousel */}
      <div className="marquee-track">
        <div className="marquee-inner">
          {/* First copy */}
          {logos.map((logo) => (
            <div
              key={logo.alt + "-a"}
              className="flex-shrink-0 flex items-center justify-center mx-8"
              style={{ width: "120px", height: "60px" }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                style={{ maxHeight: "52px", maxWidth: "110px", objectFit: "contain", filter: "grayscale(0.1)" }}
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((logo) => (
            <div
              key={logo.alt + "-b"}
              className="flex-shrink-0 flex items-center justify-center mx-8"
              style={{ width: "120px", height: "60px" }}
              aria-hidden="true"
            >
              <img
                src={logo.src}
                alt=""
                style={{ maxHeight: "52px", maxWidth: "110px", objectFit: "contain", filter: "grayscale(0.1)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

