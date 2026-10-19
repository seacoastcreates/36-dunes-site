<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Client dashboard architecture

Keep the client dashboard at `/portal` in this application and deployment for now.
The user wants advice when it becomes useful to move to a dashboard subdomain or
separate deployment. When expanding the portal or changing hosting, flag concrete
needs for independent releases, infrastructure/dependencies, credentials, or team
ownership, or recurring interference with marketing-site changes. A subdomain
does not require a separate deployment or repository. See the README's “When to
split hosting” section for migration considerations.

## Production deployment

Use Netlify's combined build-and-deploy flow: `netlify deploy --prod --context production`.
The Next.js adapter prepares the public assets and server/edge functions together.
Do not run a separate `netlify build` followed by a default `netlify deploy --no-build`:
the adapter restores `.next` after the standalone build, and that deployment can
publish the wrong asset layout. Verify the actual JavaScript asset URLs as well
as HTML responses and session endpoints after publishing.
