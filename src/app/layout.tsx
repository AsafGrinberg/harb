import type { Metadata } from "next";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import Script from "next/script";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  display: "swap",
  preload: true,
  variable: "--font-heebo",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "הר ביטוח - בדיקת ביטוחים חינם",
  description: "בדקו עכשיו אם אתם משלמים ביטוח כפול וחסכו אלפי שקלים בשנה! בדיקה ללא עלות וללא התחייבות.",
  keywords: "הר ביטוח, כפל ביטוחים, בדיקת ביטוחים, חיסכון בביטוח, ביטוח חיים, ביטוח בריאות",
  icons: {
    icon: "/הר-הביטוח-Photoroom-1-e1779253374131-150x140.png",
    shortcut: "/הר-הביטוח-Photoroom-1-e1779253374131-150x140.png",
    apple: "/הר-הביטוח-Photoroom-1-e1779253374131-150x140.png",
  },
  openGraph: {
    title: "הר ביטוח - בדיקת ביטוחים חינם",
    description: "בדקו אם אתם משלמים ביטוח כפול וחסכו אלפי שקלים בשנה",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingChatWidget />
        <Script
          src="https://cdn.userway.org/widget.js"
          strategy="afterInteractive"
          data-account="RzEqo8kNS2"
          data-size="small"
          data-position="left"
        />
        <Script
          id="userway-position-fix"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var tries = 0;
                function moveUserWay() {
                  var selectors = [
                    '#userwayAccessibilityIcon',
                    '.uwy',
                    '[id*="userway"]',
                    '[class*="userway"]'
                  ];

                  selectors.forEach(function(sel) {
                    var nodes = document.querySelectorAll(sel);
                    nodes.forEach(function(node) {
                      if (!(node instanceof HTMLElement)) return;
                      var tag = node.tagName.toLowerCase();
                      if (tag === 'script' || tag === 'style') return;

                      node.style.position = 'fixed';
                      node.style.left = '10px';
                      node.style.right = 'auto';
                      node.style.top = '50%';
                      node.style.bottom = 'auto';
                      node.style.transform = 'translateY(-50%)';
                      node.style.zIndex = '120';
                    });
                  });
                }

                var interval = setInterval(function() {
                  tries += 1;
                  moveUserWay();
                  if (tries > 30) clearInterval(interval);
                }, 700);

                window.addEventListener('load', moveUserWay);
                document.addEventListener('visibilitychange', function() {
                  if (document.visibilityState === 'visible') moveUserWay();
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
