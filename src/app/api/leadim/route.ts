import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const LEADIM_ENDPOINT = "https://api.lead.im/v2/submit";
const LM_FORM = "118999";
const LM_KEY = "a1e5681300";

type LeadImPayload = {
  name?: string;
  phone?: string;
  ssn?: string;
  ssn_date?: string;
  page_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

function safe(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function extractUtms(sourceUrl: string) {
  try {
    if (!sourceUrl) {
      return {
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
        utm_term: "",
      };
    }
    const u = new URL(sourceUrl);
    return {
      utm_source: u.searchParams.get("utm_source") ?? "",
      utm_medium: u.searchParams.get("utm_medium") ?? "",
      utm_campaign: u.searchParams.get("utm_campaign") ?? "",
      utm_content: u.searchParams.get("utm_content") ?? "",
      utm_term: u.searchParams.get("utm_term") ?? "",
    };
  } catch {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadImPayload;

    const name = safe(body.name);
    const phone = safe(body.phone);
    const ssn = safe(body.ssn);
    const ssnDate = safe(body.ssn_date);
    const pageUrl = safe(body.page_url);
    const submittedAt = new Date().toISOString();

    if (!name || !phone) {
      return NextResponse.json({ error: "Missing required fields: name, phone" }, { status: 400 });
    }

    // Initialize Supabase for dual-save backup
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

    const saveToSupabase = async () => {
      if (!supabase) return { ok: false, reason: "Supabase not configured" };
      try {
        const { error } = await supabase.from("leads").insert({
          name,
          phone,
          ssn: ssn || null,
          ssn_date: ssnDate || null,
          page_url: pageUrl,
          utm_source: safe(body.utm_source),
          utm_medium: safe(body.utm_medium),
          utm_campaign: safe(body.utm_campaign),
          utm_content: safe(body.utm_content),
          utm_term: safe(body.utm_term),
          submitted_at: submittedAt,
          created_at: submittedAt,
        });
        if (error) return { ok: false, reason: error.message };
        return { ok: true };
      } catch (err) {
        console.error("Supabase save error:", err);
        return { ok: false, reason: String(err) };
      }
    };

    const parsedUtm = extractUtms(pageUrl);
    const utm_source = safe(body.utm_source) || parsedUtm.utm_source;
    const utm_medium = safe(body.utm_medium) || parsedUtm.utm_medium;
    const utm_campaign = safe(body.utm_campaign) || parsedUtm.utm_campaign;
    const utm_content = safe(body.utm_content) || parsedUtm.utm_content;
    const utm_term = safe(body.utm_term) || parsedUtm.utm_term;

    const formData = new URLSearchParams();
    formData.set("lm_form", LM_FORM);
    formData.set("lm_key", LM_KEY);
    formData.set("lm_redirect", "no");
    formData.set("lm_format", "json");
    formData.set("name", name);
    formData.set("phone", phone);

    if (pageUrl) formData.set("lm_source", pageUrl);
    if (ssn) formData.set("ssn", ssn);
    if (ssnDate) formData.set("ssn_date", ssnDate);
    if (utm_source) formData.set("utm_source", utm_source);
    if (utm_medium) formData.set("utm_medium", utm_medium);
    if (utm_campaign) formData.set("utm_campaign", utm_campaign);
    if (utm_content) formData.set("utm_content", utm_content);
    if (utm_term) formData.set("utm_term", utm_term);

    const response = await fetch(LEADIM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body: formData.toString(),
      cache: "no-store",
    });

    const text = await response.text();
    let parsed: unknown = text;
    try {
      parsed = JSON.parse(text);
    } catch {
      // keep plain text payload
    }

    // Save to Supabase independently - failure here doesn't block Lead.im response
    const supabaseResult = await saveToSupabase();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Lead.im request failed", details: parsed, supabase: supabaseResult },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, leadim: parsed, supabase: supabaseResult });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
