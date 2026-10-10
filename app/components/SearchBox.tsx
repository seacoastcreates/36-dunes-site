"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

function MagnifyingGlass() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12.3 12.3L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Header search: a magnifying-glass button that reveals a text input.
 * `:hover`/`:focus-within` drive the slide-out on pointer devices for free;
 * `alwaysOpen` skips that and renders a plain, already-expanded input for
 * contexts with no hover at all (the mobile menu). */
export default function SearchBox({ alwaysOpen = false }: { alwaysOpen?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Shared by both the form's submit (Enter in the field) and a click on
  // the magnifying-glass button: a filled field navigates to results, an
  // empty one just focuses/expands the input instead of doing nothing.
  const submitSearch = () => {
    const q = query.trim();
    if (!q) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
  };

  return (
    <form
      className={`search-box${alwaysOpen ? " always-open" : ""}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <input
        ref={inputRef}
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search the site"
        aria-label="Search the site"
        className="search-input"
      />
      <button type="button" className="search-toggle" aria-label="Search" onClick={submitSearch}>
        <MagnifyingGlass />
      </button>
    </form>
  );
}
