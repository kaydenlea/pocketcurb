import Image from "next/image";
import { SiteContainer } from "@gama/ui-web";
import gamaLogo from "../../app/icon.png";
import { siteCopy } from "../content/site-copy";

export function SiteFooter() {
  return (
    <footer className="site-footer-shell py-8 md:py-10">
      <SiteContainer className="site-footer-grid">
        <div className="site-footer-main">
          <div className="site-footer-brand">
            <div className="site-footer-brand-row">
              <Image
                alt="Gama logo"
                className="site-footer-brand-mark"
                height={52}
                src={gamaLogo}
                width={52}
              />
              <div className="site-footer-brand-copy">
                <p className="site-footer-brand-name">Gama</p>
                <p className="site-footer-brand-note">{siteCopy.footer.note}</p>
              </div>
            </div>
            <p className="site-footer-caption">
              Built for short-term clarity, explicit trust, and less admin work around everyday money.
            </p>
          </div>

          <div className="site-footer-meta">
            <div className="site-footer-meta-group">
              <span className="site-footer-label">Contact</span>
              <a className="site-footer-link" href={siteCopy.footer.contactHref}>
                {siteCopy.footer.contactLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-meta-note">Decision-first clarity for the next money move.</p>
        </div>
      </SiteContainer>
    </footer>
  );
}
