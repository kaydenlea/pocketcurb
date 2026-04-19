"use client";

import { useEffect, useState } from "react";
import type { MockupPreviewSlug } from "../content/mockup-previews";

type TrustSlide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: "privacy" | "share" | "review";
  previewSlug: MockupPreviewSlug;
};

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function TrustIcon({ icon }: { icon: TrustSlide["icon"] }) {
  if (icon === "privacy") {
    return (
      <svg aria-hidden="true" className="home-trust-slide-icon-svg" viewBox="0 0 20 20">
        <path
          d="M10 2.9L15.2 5V9.9C15.2 13.3 13.1 16.3 10 17.6C6.9 16.3 4.8 13.3 4.8 9.9V5L10 2.9Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.55"
        />
        <path d="M8.2 9.6L9.5 10.9L12.3 8.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      </svg>
    );
  }

  if (icon === "share") {
    return (
      <svg aria-hidden="true" className="home-trust-slide-icon-svg" viewBox="0 0 20 20">
        <path d="M6.2 10.1H13.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
        <path d="M10.8 6.2L14.7 10.1L10.8 14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
        <path d="M5.3 14.9C4.6 14.9 4 14.3 4 13.6V6.4C4 5.7 4.6 5.1 5.3 5.1H8.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      </svg>
    );
  }

  if (icon === "review") {
    return (
      <svg aria-hidden="true" className="home-trust-slide-icon-svg" viewBox="0 0 20 20">
        <path d="M5.2 5.4H14.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
        <path d="M5.2 9.4H11.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
        <path d="M5.2 13.4H10.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
        <path d="M12.8 13.1L14.4 14.7L17 11.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="home-trust-slide-icon-svg" viewBox="0 0 20 20">
      <path d="M10 4.2V10.1L13.5 12.3" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      <path
        d="M10 17C13.9 17 17 13.9 17 10C17 6.1 13.9 3 10 3C6.1 3 3 6.1 3 10C3 13.9 6.1 17 10 17Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.55"
      />
    </svg>
  );
}

export function TrustFeatureCarousel({ slides }: { slides: readonly TrustSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="home-trust-carousel" aria-label="Trust highlights">
      <div className="home-trust-carousel-tabs" aria-label="Trust features">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            aria-label={`Show ${slide.eyebrow}`}
            aria-pressed={index === activeIndex}
            className={joinClasses("home-trust-carousel-tab", index === activeIndex && "home-trust-carousel-tab-active")}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <span className="home-trust-carousel-tab-icon">
              <TrustIcon icon={slide.icon} />
            </span>
            <span>{slide.eyebrow}</span>
          </button>
        ))}
      </div>

      <div className="home-trust-carousel-stage">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden={index !== activeIndex}
            className={joinClasses("home-trust-slide", index === activeIndex && "home-trust-slide-active")}
          >
            <div className="home-trust-slide-copy">
              <div className="home-trust-slide-eyebrow-row">
                <span className="home-trust-slide-icon">
                  <TrustIcon icon={slide.icon} />
                </span>
                <span className="home-trust-slide-kicker">{slide.eyebrow}</span>
              </div>
              <h3>{slide.title}</h3>
              <p>{slide.body}</p>
            </div>

            <div className="home-trust-slide-device-wrap" aria-hidden="true">
              <div className="home-trust-slide-device-panel">
                <div className="home-trust-slide-device-shell">
                  <iframe
                    className="home-trust-slide-frame"
                    loading={index === activeIndex ? "eager" : "lazy"}
                    sandbox=""
                    scrolling="no"
                    src={`/preview/${slide.previewSlug}`}
                    tabIndex={-1}
                    title={`Gama ${slide.previewSlug} trust preview`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
