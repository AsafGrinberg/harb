"use client";
import Link from "next/link";
import { useState } from "react";

const duplicateInsuranceLinks = [
  { label: "כפל ביטוחי בריאות", href: "/כפל-ביטוחי-בריאות" },
  { label: "כפל ביטוח חיים", href: "/כפל-ביטוח-חיים" },
  { label: "כפל ביטוח סיעודי", href: "/כפל-ביטוח-סיעודי" },
  { label: "כפל ביטוח אובדן כושר עבודה", href: "/כפל-ביטוח-אובדן-כושר-עבודה" },
  { label: "כפל ביטוח תאונות אישיות", href: "/כפל-ביטוח-תאונות-אישיות" },
  { label: "כפל ביטוח משכנתא", href: "/כפל-ביטוח-משכנתא" },
  { label: "כפל ביטוח דירה ותכולה", href: "/כפל-ביטוח-דירה-ותכולה" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDupOpen, setMobileDupOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow-sm"
      style={{ borderBottom: "2px solid #F34B1A" }}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" aria-label="עמוד הבית">
          <img
            src="/logo.png"
            alt="הר הביטוחים שלי"
            className="object-contain"
            style={{ height: "65px" }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="תפריט ראשי">
          <Link
            href="/"
            className="text-gray-800 hover:text-[#0072A8] font-semibold text-sm transition-colors"
          >
            הר ביטוח
          </Link>

          <div className="relative group">
            <button
              type="button"
              className="text-gray-800 hover:text-[#0072A8] font-semibold text-sm transition-colors"
              aria-haspopup="menu"
            >
              כפל ביטוחים
            </button>

            <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50">
              <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                {duplicateInsuranceLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={encodeURI(item.href)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0072A8]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/ביטוח-סיעודי-פרטי-או-קופת-חולים"
            className="text-gray-800 hover:text-[#0072A8] font-semibold text-sm transition-colors"
          >
            בלוג
          </Link>
        </nav>

        {/* CTA button (desktop) */}
        <a
          href="#form"
          className="hidden md:inline-block px-8 py-3 rounded-full font-semibold text-sm text-white transition-all hover:bg-transparent hover:text-[#0072A8]"
          style={{
            backgroundColor: "#0072A8",
            border: "1px solid #F34B1A",
          }}
        >
          בדיקה מיידית
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-700 text-2xl p-1"
          aria-label="פתח תפריט"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3">
          <Link
            href="/"
            className="text-gray-700 font-semibold text-sm py-1"
            onClick={() => setMenuOpen(false)}
          >
            הר ביטוח
          </Link>

          <div className="border border-gray-200 rounded-lg p-2">
            <button
              type="button"
              className="w-full flex items-center justify-between text-gray-700 font-semibold text-sm"
              onClick={() => setMobileDupOpen((v) => !v)}
              aria-expanded={mobileDupOpen}
            >
              <span>כפל ביטוחים</span>
              <span>{mobileDupOpen ? "−" : "+"}</span>
            </button>

            {mobileDupOpen && (
              <div className="pt-2 mt-2 border-t border-gray-100 flex flex-col gap-2">
                {duplicateInsuranceLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={encodeURI(item.href)}
                    className="text-gray-600 text-sm py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/ביטוח-סיעודי-פרטי-או-קופת-חולים"
            className="text-gray-700 font-semibold text-sm py-1"
            onClick={() => setMenuOpen(false)}
          >
            בלוג
          </Link>

          <a
            href="#form"
            className="text-center px-6 py-2.5 rounded-full text-white font-semibold text-sm"
            style={{ backgroundColor: "#0072A8" }}
            onClick={() => setMenuOpen(false)}
          >
            בדיקה מיידית
          </a>
        </div>
      )}
    </header>
  );
}

