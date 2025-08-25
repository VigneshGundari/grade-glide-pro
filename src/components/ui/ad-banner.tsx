import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  className?: string;
}

export function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export function TopBanner() {
  return (
    <AdBanner 
      slot="YOUR-TOP-BANNER-SLOT-ID"
      format="horizontal"
      className="w-full max-w-4xl mx-auto my-8"
    />
  );
}

export function SidebarAd() {
  return (
    <AdBanner 
      slot="YOUR-SIDEBAR-SLOT-ID"
      format="vertical"
      className="w-full max-w-xs"
    />
  );
}

export function InContentAd() {
  return (
    <AdBanner 
      slot="YOUR-RECTANGLE-SLOT-ID"
      format="rectangle"
      className="w-full max-w-sm mx-auto my-6"
    />
  );
}