"use client";
import { useEffect } from "react";
export default function Analytics() {
  useEffect(() => {
    const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
      src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
    if (
      process.env.NODE_ENV !== "production" ||
      !id ||
      !src ||
      !["kvndwi.com", "www.kvndwi.com"].includes(location.hostname)
    )
      return;
    try {
      if (new URL(src).protocol !== "https:") return;
    } catch {
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    Object.assign(script.dataset, {
      websiteId: id,
      domains: "kvndwi.com,www.kvndwi.com",
      excludeSearch: "true",
      excludeHash: "true",
      doNotTrack: "true",
      performance: "false",
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
  return null;
}
