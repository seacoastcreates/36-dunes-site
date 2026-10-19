"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type HeroProject = {
  id: string;
  title: string;
  href: string;
  external?: boolean;
  rows: { k: string; v: string }[];
};

const PROJECTS: HeroProject[] = [
  {
    id: "call-list",
    title: "Call List: when a pipeline dries up, the problem is usually the list.",
    href: "/work/call-list",
    rows: [
      { k: "Scope", v: "Regional, one industry" },
      { k: "Method", v: "Researched, not scraped" },
      { k: "Verification", v: "Checked against the business’s own site" },
      { k: "Timeline", v: "Days, not weeks" },
    ],
  },
  {
    id: "photonester",
    title: "PhotoNester: sorting a million photos without a single upload.",
    href: "/work/photonester",
    rows: [
      { k: "Platform", v: "iOS · Swift + SwiftUI" },
      { k: "Model", v: "OpenAI CLIP → Core ML" },
      { k: "Privacy", v: "100% on-device, no server" },
      { k: "Result", v: "Full library sorted in minutes" },
    ],
  },
  {
    id: "groundwork",
    title: "Groundwork: a housing forecast is only useful if you can check its track record.",
    href: "https://groundwork.36dunes.com/model",
    external: true,
    rows: [
      { k: "Coverage", v: "894 metros · 26,268 ZIP codes" },
      { k: "Model", v: "LightGBM · metro + ZIP-relative" },
      { k: "Forecast", v: "12 months ahead, 80% ranges" },
      { k: "Validation", v: "Walk-forward backtests · 2017–2025" },
    ],
  },
];

const ROTATE_MS = 6000;

export default function HeroWorkCard() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % PROJECTS.length);
    }, ROTATE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function pick(i: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    setIndex(i);
  }

  const project = PROJECTS[index];

  return (
    <div className="hero-card">
      <div className="hero-card-head">
        <div className="eyebrow">
          Recent work · {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </div>
        <div className="hero-card-dots">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={i === index ? "is-active" : ""}
              aria-label={`Show ${p.title.split(":")[0]}`}
              onClick={() => pick(i)}
            />
          ))}
        </div>
      </div>
      <div className="hero-card-body" key={project.id}>
        <h3>{project.title}</h3>
        <dl className="spec-list">
          {project.rows.map((row) => (
            <div className="spec-row" key={row.k}>
              <dt>{row.k}</dt>
              <dd>{row.v}</dd>
            </div>
          ))}
        </dl>
        {project.external ? (
          <a
            className="back-link case-read-more hero-card-link"
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the case study →
          </a>
        ) : (
          <Link className="back-link case-read-more hero-card-link" href={project.href}>
            Read the case study →
          </Link>
        )}
      </div>
    </div>
  );
}
