"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSearchIndex, searchIndex } from "../../lib/search";

export default function SearchResults() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const index = useMemo(() => getSearchIndex(), []);
  const results = useMemo(() => searchIndex(index, query), [index, query]);
  const trimmed = query.trim();

  return (
    <>
      <form className="search-page-form" onSubmit={(event) => event.preventDefault()}>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search blog posts, services, work..."
          aria-label="Search"
          autoFocus
        />
      </form>

      {trimmed === "" ? (
        <p className="search-empty">Start typing to search the site.</p>
      ) : results.length === 0 ? (
        <p className="search-empty">No results for &quot;{trimmed}&quot;.</p>
      ) : (
        <>
          <p className="count">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          <div className="post-list">
            {results.map((result) => (
              <Link key={result.url} className="post-item" href={result.url}>
                <span className="post-date">{result.type}</span>
                <div>
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
