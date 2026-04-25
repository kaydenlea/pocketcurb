"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SiteContainer } from "@gama/ui-web";
import gamaLogo from "../../app/icon.png";

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);

      const shellRect = shellRef.current?.getBoundingClientRect();
      const darkSections = document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']");
      let nextTheme: "light" | "dark" = "light";

      if (shellRect) {
        const navTop = shellRect.top + 8;
        const navBottom = shellRect.bottom - 8;

        for (const section of darkSections) {
          const rect = section.getBoundingClientRect();
          const overlapTop = Math.max(navTop, rect.top);
          const overlapBottom = Math.min(navBottom, rect.bottom);

          if (overlapBottom > overlapTop) {
            nextTheme = "dark";
            break;
          }
        }
      }

      setTheme((current) => (current === nextTheme ? current : nextTheme));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="floating-nav-wrap">
      <SiteContainer>
        <div
          ref={shellRef}
          className={joinClasses(
            "floating-nav-shell",
            theme === "dark" && "floating-nav-shell-dark",
            !isScrolled && "floating-nav-shell-top",
            isScrolled && "floating-nav-shell-scrolled"
          )}
        >
          <Link aria-label="Gama home" className="floating-brand" href="/">
            <Image
              alt="Gama logo"
              className="floating-brand-mark"
              height={40}
              priority
              src={gamaLogo}
              width={40}
            />
            <div className="floating-brand-copy">
              <div className="floating-brand-name">Gama</div>
            </div>
          </Link>
          <Link className="floating-nav-cta floating-nav-cta-inline" href="/#hero-waitlist-cta">
            <span className="floating-nav-cta-label-full">Join early access</span>
            <span className="floating-nav-cta-label-compact">Join</span>
            <span aria-hidden="true" className="floating-nav-cta-arrow">→</span>
          </Link>
        </div>
      </SiteContainer>
    </header>
  );
}
