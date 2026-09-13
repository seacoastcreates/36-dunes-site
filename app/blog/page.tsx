import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { blogPosts } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Blog — 36 Dunes",
  description:
    "Engineering deep-dives and decision guides from 36 Dunes — real trade-offs and specific stack choices, not AI hype.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="plain page-intro">
          <div className="wrap">
            <div className="eyebrow">FIELD NOTES</div>
            <h1>Engineering, written the way we&apos;d say it out loud.</h1>
            <p className="lede">
              Real trade-offs, specific stack choices, and honest takes on
              when AI is — and isn&apos;t — the right tool. No listicles.
            </p>
          </div>
        </section>

        <section className="plain" id="posts">
          <div className="wrap">
            <div className="post-list">
              {blogPosts.map((post) => (
                <Link key={post.slug} className="post-item" href={`/blog/${post.slug}`}>
                  <span className="post-date">{post.dateDisplay}</span>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="post-tags">
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="contact">
          <div className="wrap contact-inner">
            <div className="eyebrow">START A PROJECT</div>
            <h2>Have a problem that isn&apos;t in a post yet?</h2>
            <p className="lede">Tell us what you&apos;re building — we&apos;ll tell you honestly what we think.</p>
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
