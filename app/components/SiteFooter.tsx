import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <nav className="wrap footer-nav">
        <a href="/services">Services</a>
        <a href="/work/photonester">Work</a>
        <a href="/blog">Blog</a>
        <Link href="/#approach">Approach</Link>
        <a href="/resources/ai-readiness-checklist">AI Readiness Checklist</a>
        <a href="/rfp">Request a proposal</a>
      </nav>
      <div className="wrap footer-row">
        <div className="footer-brand">
          <svg
            width="30"
            height="20"
            viewBox="0 0 64 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 20 C 10 8, 18 8, 24 15 C 27 18.5, 22 21, 19 18 C 26 10, 36 9, 44 17 C 48 21, 56 22, 62 15"
              stroke="var(--accent)"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.55"
            />
            <path
              d="M2 27 C 12 15, 22 15, 30 23 C 33 26.5, 27 28.5, 24 25.5 C 32 17, 42 16, 50 24 C 54 28, 58 28.5, 62 23"
              stroke="var(--accent)"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.78"
            />
            <path
              d="M2 34 C 14 24, 24 24, 33 31 C 40 36.5, 52 36.5, 62 29"
              stroke="var(--accent)"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          36 DUNES
        </div>
        <div className="footer-contact">
          <a href="mailto:kirby@36dunes.com">kirby@36dunes.com</a>
          <span aria-hidden="true">·</span>
          <a href="tel:+18572094404">(857) 209-4404</a>
        </div>
        <div>© 2026 36 Dunes. AI/ML &amp; software engineering studio.</div>
      </div>
    </footer>
  );
}
