import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <nav className="wrap footer-nav" aria-label="Footer">
        <div className="footer-col">
          <div className="footer-col-head">36 Dunes</div>
          <a href="/services">Services</a>
          <Link href="/#work">Work</Link>
          <a href="/blog">Blog</a>
          <Link href="/#approach">About</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-head">Leads for</div>
          <Link href="/prospect-lists/dock-and-marine">Dock dealers</Link>
          <Link href="/prospect-lists/electronic-components">Component brokers</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-head">Other</div>
          <a href="/resources/ai-readiness-checklist">AI Readiness Checklist</a>
          <a href="/rfp">Request a proposal</a>
          <a href="/portal/login">Client login</a>
        </div>
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
        <div className="footer-social">
          <a
            href="https://www.linkedin.com/company/36-dunes/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="36 Dunes on LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/36dunes/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="36 Dunes on Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5.5" />
              <circle cx="12" cy="12" r="4.5" />
              <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
        <div>© 2026 36 Dunes. AI/ML &amp; software engineering studio.</div>
      </div>
    </footer>
  );
}
