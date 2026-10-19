"use client";

export default function DashboardError({ reset }: { reset: () => void }) {
  return <div className="dashboard-card dashboard-empty" role="alert">
    <h1>We couldn’t load this page.</h1>
    <p>Please try again in a moment. If you just made a payment, its confirmation may still be arriving.</p>
    <button className="btn btn-ghost" onClick={reset}>Try again</button>
    <p>Still having trouble? <a href="mailto:kirby@36dunes.com">Contact 36 Dunes</a>.</p>
  </div>;
}
