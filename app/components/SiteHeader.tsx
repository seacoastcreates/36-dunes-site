export default function SiteHeader() {
  return (
    <header>
      <div className="wrap header-row">
        <a className="brand" href="/">
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
          36&nbsp;DUNES
        </a>
        <nav className="primary">
          <a href="/#services">Capabilities</a>
          <a href="/#work">Work</a>
          <a href="/#approach">Approach</a>
          <a href="/#about">About</a>
        </nav>
        <div className="header-ctas">
          <a className="btn btn-ghost" href="/rfp">
            Request a proposal
          </a>
          <a className="btn btn-primary" href="/#contact">
            Start a project
          </a>
        </div>
        <label className="nav-toggle-btn" htmlFor="nav-toggle">
          Menu
        </label>
      </div>
      <input type="checkbox" id="nav-toggle" />
      <div className="wrap mobile-menu">
        <a href="/#services">Capabilities</a>
        <a href="/#work">Work</a>
        <a href="/#approach">Approach</a>
        <a href="/#about">About</a>
        <a href="/rfp">Request a proposal</a>
        <a href="/#contact">Start a project</a>
      </div>
    </header>
  );
}
