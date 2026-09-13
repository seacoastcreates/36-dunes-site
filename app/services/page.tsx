import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { services } from "../../lib/services";

export const metadata: Metadata = {
  title: "Services — 36 Dunes",
  description:
    "Machine learning consulting, custom AI development, AI automation, and MLOps consulting — from a founder-led studio that builds the software underneath the model too.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="plain page-intro">
          <div className="wrap">
            <div className="eyebrow">SERVICES</div>
            <h1>Four ways to work with us.</h1>
            <p className="lede">
              Strategy, a custom build, automation, or keeping a model alive
              after launch — pick the one that matches where you are, or
              start with a proposal and we&apos;ll help you figure it out.
            </p>
          </div>
        </section>

        <section className="plain" id="services-list">
          <div className="wrap">
            <div className="service-grid">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  className="service-card"
                  href={`/services/${service.slug}`}
                >
                  <div className="eyebrow">{service.eyebrow}</div>
                  <h3>{service.name}</h3>
                  <p>{service.shortDescription}</p>
                  <span className="service-link">Learn more →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">NOT SURE WHICH ONE?</div>
            <h2>Tell us what you&apos;re building instead.</h2>
            <p className="lede">
              A request for proposal gets you a real answer — including
              &quot;none of these, here&apos;s what you actually need.&quot;
            </p>
            <div className="contact-actions">
              <Link className="btn btn-primary" href="/rfp">
                Request a proposal
              </Link>
              <a className="btn btn-ghost" href="mailto:hello@36dunes.com">
                hello@36dunes.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
