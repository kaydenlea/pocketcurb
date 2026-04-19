"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteContainer } from "@gama/ui-web";
import gamaLogo from "../../app/icon.png";
import { siteCopy } from "../content/site-copy";

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);

      const navProbeTop = 72;
      const navProbeBottom = 136;
      const darkSections = document.querySelectorAll<HTMLElement>("[data-nav-theme='dark']");
      let nextTheme: "light" | "dark" = "light";

      for (const section of darkSections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= navProbeBottom && rect.bottom >= navProbeTop) {
          nextTheme = "dark";
          break;
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

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1100px)");

    const handleChange = () => {
      if (desktopQuery.matches) {
        setMenuOpen(false);
      }
    };

    handleChange();
    desktopQuery.addEventListener("change", handleChange);

    return () => {
      desktopQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <header className="floating-nav-wrap">
      <SiteContainer>
        <div className="floating-nav-stack">
          <div
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

            <nav aria-label="Primary" className="floating-nav-links">
              {siteCopy.navigation.map((link) => (
                <Link key={link.href} className="floating-nav-link" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link className={joinClasses("floating-nav-cta", !isScrolled && "floating-nav-cta-top")} href="/waitlist">
              {siteCopy.shared.primaryCta.label}
            </Link>

            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className="floating-nav-menu"
              onClick={() => setMenuOpen((current) => !current)}
              type="button"
            >
              <svg aria-hidden="true" className="floating-nav-menu-icon" viewBox="0 0 20 20">
                <path d="M4 6.5H16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                <path d="M4 10H16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                <path d="M4 13.5H16" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
              </svg>
            </button>
          </div>

          <div
            className={joinClasses(
              "floating-nav-drawer",
              theme === "dark" && "floating-nav-drawer-dark",
              menuOpen && "floating-nav-drawer-open"
            )}
          >
            <nav aria-label="Mobile primary" className="floating-nav-drawer-links">
              {siteCopy.navigation.map((link) => (
                <Link
                  key={link.href}
                  className="floating-nav-drawer-link"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              className="floating-nav-drawer-cta"
              href="/waitlist"
              onClick={() => setMenuOpen(false)}
            >
              {siteCopy.shared.primaryCta.label}
            </Link>
          </div>
        </div>
      </SiteContainer>
    </header>
  );
}
