import { siteCopy } from "../content/site-copy";
import { MockupPreviewPhone, ProductHeroVisual } from "./ProductVisuals";
import { Reveal } from "./Reveal";
import { ScrollFeatureShowcase } from "./ScrollFeatureShowcase";
import { TrustFeatureCarousel } from "./TrustFeatureCarousel";

function joinClasses(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type HomeSignatureFeatureCard = (typeof siteCopy.home.signatureFeatures.cards)[number];

function InstitutionLogo({ name }: { name: string }) {
  if (name === "Verdant") {
    return (
      <svg aria-hidden="true" className="hero-home-bank-logo" viewBox="0 0 20 20">
        <path d="M10 15.5V7.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
        <path
          d="M10 9.2C8.2 9.2 6.9 7.8 6.9 5.9C8.7 5.9 10 7.3 10 9.2Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
        <path
          d="M10 9.2C11.8 9.2 13.1 7.8 13.1 5.9C11.3 5.9 10 7.3 10 9.2Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (name === "Aerolith") {
    return (
      <svg aria-hidden="true" className="hero-home-bank-logo" viewBox="0 0 20 20">
        <path d="M3.5 14.6L10.1 4.2L12.6 8.3L9.2 10.3H16.5L9.5 14.6H3.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (name === "Helix Forge") {
    return (
      <svg aria-hidden="true" className="hero-home-bank-logo" viewBox="0 0 20 20">
        <path d="M5 5.2L15 14.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M15 5.2L5 14.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M7.2 3.9C8.6 5.1 9.4 6.3 10 7.9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M12.8 16.1C11.4 14.9 10.6 13.7 10 12.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "Lith") {
    return (
      <svg aria-hidden="true" className="hero-home-bank-logo" viewBox="0 0 20 20">
        <path d="M5.4 4.4V15.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M5.4 15.6H14.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M9.3 4.4V15.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeOpacity="0.55" strokeWidth="1.1" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="hero-home-bank-logo" viewBox="0 0 20 20">
      <path d="M10 3.8L15.1 6.8V13.1L10 16.2L4.9 13.1V6.8L10 3.8Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.1 8.1L10 6.5L12.9 8.1L10 9.8L7.1 8.1Z" fill="currentColor" />
      <path d="M7.1 11.2L10 9.6L12.9 11.2L10 12.9L7.1 11.2Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function SignatureCardIcon({ icon }: { icon: HomeSignatureFeatureCard["icon"] }) {
  if (icon === "timeline") {
    return (
      <svg aria-hidden="true" className="home-signature-card-icon-svg" viewBox="0 0 20 20">
        <path d="M4.4 5.1H15.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
        <path d="M4.4 10H11.1" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
        <path d="M4.4 14.9H13.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
        <circle cx="13.9" cy="10" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "map") {
    return (
      <svg aria-hidden="true" className="home-signature-card-icon-svg" viewBox="0 0 20 20">
        <path
          d="M10 17C12.7 13.8 14.5 11.5 14.5 8.9C14.5 6.4 12.5 4.4 10 4.4C7.5 4.4 5.5 6.4 5.5 8.9C5.5 11.5 7.3 13.8 10 17Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.55"
        />
        <circle cx="10" cy="8.8" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "receipt") {
    return (
      <svg aria-hidden="true" className="home-signature-card-icon-svg" viewBox="0 0 20 20">
        <path
          d="M6 3.9H14V16.1L12.6 15.2L11.1 16.1L9.7 15.2L8.3 16.1L6.9 15.2L5.5 16.1V4.5C5.5 4.2 5.7 3.9 6 3.9Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path d="M7.7 7.5H12.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
        <path d="M7.7 10.1H12.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="home-signature-card-icon-svg" viewBox="0 0 20 20">
      <path d="M5.2 5.4H14.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      <path d="M5.2 10H12.2" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      <path d="M5.2 14.6H10.8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.55" />
      <path d="M13 13.5L14.7 15.2L16.8 12.7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.55" />
    </svg>
  );
}

async function SignatureFeatureCard({ card }: { card: HomeSignatureFeatureCard }) {
  return (
    <article
      className={joinClasses(
        "home-signature-card",
        `home-signature-card-${card.id}`
      )}
    >
      <div className="home-signature-card-device-window">
        <MockupPreviewPhone
          className={joinClasses("home-signature-card-phone", `home-signature-card-phone-${card.id}`)}
          preview={card.previewSlug}
        />
      </div>

      <div className="home-signature-card-copy">
        <span className="home-signature-card-icon" aria-hidden="true">
          <SignatureCardIcon icon={card.icon} />
        </span>
        <div className="home-signature-card-text">
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </div>
      </div>
    </article>
  );
}

export async function LandingPage() {
  const marqueeInstitutionSets = Array.from({ length: 3 }, (_, index) => ({
    id: `set-${index}`,
    institutions: siteCopy.home.connectMarquee.institutions
  }));

  return (
    <main id="main-content" className="landing-page flex flex-col gap-10 pb-12 md:gap-16 md:pb-18">
      <Reveal>
        <section className="hero-freeform hero-home">
          <div className="hero-freeform-inner">
            <div className="hero-home-copy">
              <span className="site-kicker">{siteCopy.home.hero.eyebrow}</span>
              <h1 className="hero-home-title">{siteCopy.home.hero.title}</h1>
              <p className="hero-home-body">{siteCopy.home.hero.body}</p>

            <div className="hero-home-cta">
                <div className="hero-email-panel">
                  <form action="/waitlist#early-access" className="hero-waitlist-form" method="GET">
                    <label className="sr-only" htmlFor="hero-email">
                      Email address
                    </label>
                    <div className="hero-email-shell">
                      <input
                        className="hero-email-input"
                        id="hero-email"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                      />
                      <button className="hero-email-submit" type="submit">
                        {siteCopy.home.hero.primaryCta.label}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="hero-home-visual">
              <ProductHeroVisual />
            </div>
          </div>

          <div className="hero-home-marquee-shell">
            <div className="site-shell hero-home-marquee-inner">
              <p className="hero-home-marquee-label">{siteCopy.home.connectMarquee.label}</p>
              <div className="hero-home-marquee" aria-label="Supported account connections">
                <div className="hero-home-marquee-track">
                  {marqueeInstitutionSets.map((set, setIndex) => (
                    <div
                      key={set.id}
                      className="hero-home-marquee-set"
                      aria-hidden={setIndex > 0}
                    >
                      {set.institutions.map((institution) => (
                        <div
                          key={`${set.id}-${institution.name}`}
                          className="hero-home-marquee-item"
                          aria-label={`${institution.name} ${institution.descriptor}`}
                        >
                          <InstitutionLogo name={institution.name} />
                          <strong>{institution.name}</strong>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <section className="home-signature-band" aria-labelledby="home-signature-title" data-nav-theme="dark">
        <div className="site-shell home-signature-shell">
          <div className="home-signature-heading">
            <span className="home-dark-kicker">{siteCopy.home.signatureFeatures.eyebrow}</span>
            <h2 className="home-section-title home-section-title-dark" id="home-signature-title">
              {siteCopy.home.signatureFeatures.title}
            </h2>
            <p className="home-section-body home-section-body-dark">{siteCopy.home.signatureFeatures.body}</p>
          </div>

          <div className="home-signature-grid">
            {siteCopy.home.signatureFeatures.cards.map((card) => (
              <SignatureFeatureCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>

      <ScrollFeatureShowcase
        steps={siteCopy.home.walkthrough.steps}
      />

      <section className="home-trust-band" aria-labelledby="home-trust-title" data-nav-theme="dark">
        <div className="site-shell home-trust-shell">
          <div className="home-trust-copy">
            <span className="home-dark-kicker">{siteCopy.home.trustBridge.eyebrow}</span>
            <h2 className="home-section-title home-section-title-dark" id="home-trust-title">
              {siteCopy.home.trustBridge.title}
            </h2>
            {siteCopy.home.trustBridge.body ? (
              <p className="home-section-body home-section-body-dark">{siteCopy.home.trustBridge.body}</p>
            ) : null}
          </div>

          <div className="home-trust-stage">
            <TrustFeatureCarousel slides={siteCopy.home.trustBridge.slides} />
          </div>
        </div>
      </section>
    </main>
  );
}
