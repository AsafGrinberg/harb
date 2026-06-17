import type { Metadata } from "next";
import InsurancePageLayout from "@/components/InsurancePageLayout";

type PageData = {
  title: string;
  subtitle: string;
  description: string;
};

const pages: Record<string, PageData> = {
  "כפל-ביטוחי-בריאות": {
    title: "כפל ביטוחי בריאות",
    subtitle: "בדקו אם אתם משלמים על ביטוח בריאות כפול וחסכו אלפי שקלים בשנה!",
    description: "בדקו אם אתם משלמים על ביטוח בריאות כפול וחסכו אלפי שקלים בשנה. בדיקה חינמית ללא התחייבות.",
  },
  "כפל-ביטוח-חיים": {
    title: "כפל ביטוח חיים",
    subtitle: "גלו אם יש לכם כפל ביטוח חיים וחסכו אלפי שקלים בשנה!",
    description: "גלו אם יש לכם כפל ביטוח חיים וחסכו בפרמיות. בדיקה חינמית ללא התחייבות.",
  },
  "כפל-ביטוח-סיעודי": {
    title: "כפל ביטוח סיעודי",
    subtitle: "בדקו אם אתם משלמים כפל על ביטוח סיעודי וחסכו אלפי שקלים בשנה!",
    description: "בדקו אם אתם משלמים כפל על ביטוח סיעודי וחסכו אלפי שקלים. בדיקה חינמית ללא התחייבות.",
  },
  "כפל-ביטוח-אובדן-כושר-עבודה": {
    title: "כפל ביטוח אובדן כושר עבודה",
    subtitle: "בדקו אם יש לכם כפל ביטוח אובדן כושר עבודה וחסכו בפרמיות!",
    description: "בדקו אם יש לכם כפל ביטוח אובדן כושר עבודה. בדיקה חינמית ללא התחייבות.",
  },
  "כפל-ביטוח-תאונות-אישיות": {
    title: "כפל ביטוח תאונות אישיות",
    subtitle: "בדקו אם אתם משלמים כפל על ביטוח תאונות אישיות וחסכו אלפי שקלים!",
    description: "בדקו אם אתם משלמים כפל על ביטוח תאונות אישיות. בדיקה חינמית ללא התחייבות.",
  },
  "כפל-ביטוח-משכנתא": {
    title: "כפל ביטוח משכנתא",
    subtitle: "בדקו אם יש לכם כפל ביטוח משכנתא וחסכו בתשלומים החודשיים!",
    description: "בדקו אם יש לכם כפל ביטוח משכנתא וחסכו בתשלומים החודשיים. בדיקה חינמית.",
  },
  "כפל-ביטוח-דירה-ותכולה": {
    title: "כפל ביטוח דירה ותכולה",
    subtitle: "בדקו אם אתם משלמים כפל על ביטוח דירה ותכולה וחסכו אלפי שקלים!",
    description: "בדקו אם אתם משלמים כפל על ביטוח דירה ותכולה. בדיקה חינמית ללא התחייבות.",
  },
  "ביטוח-סיעודי-פרטי-או-קופת-חולים": {
    title: "ביטוח סיעודי פרטי או קופת חולים",
    subtitle: "כל מה שצריך לדעת לפני שבוחרים – בדיקה חינמית ללא התחייבות",
    description: "כל מה שצריך לדעת לפני שבוחרים בין ביטוח סיעודי פרטי לביטוח דרך קופת החולים.",
  },
};

function normalizeSlug(rawSlug: string): string {
  const clean = rawSlug.trim().replace(/^\/+|\/+$/g, "");
  const decoded = clean.includes("%") ? decodeURIComponent(clean) : clean;
  return decoded.normalize("NFC");
}

function resolvePage(rawSlug: string): PageData | undefined {
  const normalized = normalizeSlug(rawSlug);
  if (pages[normalized]) return pages[normalized];

  // Fallback to a known page to avoid false 404s in dev when slug encoding differs.
  return pages["כפל-ביטוחי-בריאות"];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = resolvePage(slug);

  if (!page) {
    return {
      title: "הדף לא נמצא | הר ביטוח",
      description: "העמוד שחיפשתם לא נמצא.",
    };
  }

  return {
    title: `${page.title} | הר ביטוח`,
    description: page.description,
  };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = resolvePage(slug);

  return <InsurancePageLayout title={page!.title} subtitle={page!.subtitle} />;
}
