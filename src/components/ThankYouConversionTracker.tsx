"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_KEY = "thank-you-google-ads-conversion-fired";
let conversionFireStarted = false;

export default function ThankYouConversionTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(CONVERSION_KEY) === "1") return;

    if (conversionFireStarted) return;
    conversionFireStarted = true;

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;

      if (typeof window.gtag === "function") {
        window.sessionStorage.setItem(CONVERSION_KEY, "1");
        window.gtag("event", "conversion", {
          send_to: "AW-18238735775/CONVERSION_LABEL_PLACEHOLDER",
        });
        window.clearInterval(timer);
        return;
      }

      if (attempts >= 20) {
        window.clearInterval(timer);
      }
    }, 250);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return null;
}
