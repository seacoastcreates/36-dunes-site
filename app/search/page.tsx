import type { Metadata } from "next";
import { Suspense } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SearchResults from "./SearchResults";

export const metadata: Metadata = {
  title: "Search — 36 Dunes",
  // Search results are thin, query-dependent pages — real content lives at
  // the pages they link to, so this isn't worth indexing on its own.
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

export default function SearchPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="plain page-intro">
          <div className="wrap">
            <div className="eyebrow">SEARCH</div>
            <h1>Search 36 Dunes</h1>
          </div>
        </section>

        <section className="plain" id="content">
          <div className="wrap">
            <Suspense fallback={null}>
              <SearchResults />
            </Suspense>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
