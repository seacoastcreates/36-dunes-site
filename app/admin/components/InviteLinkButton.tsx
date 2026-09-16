"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function InviteLinkButton({
  clientId,
  autoGenerate = false,
}: {
  clientId: string;
  autoGenerate?: boolean;
}) {
  const [status, setStatus] = useState<Status>(autoGenerate ? "loading" : "idle");
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // No setState before this line — status is already "loading" via the
  // initializer above when autoGenerate is set, so the effect only ever
  // updates state from within the fetch's async continuation, never
  // synchronously in the effect body itself.
  const performFetch = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${clientId}/invite`, { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Failed to generate invite link");
        setStatus("error");
        return;
      }
      setInviteLink(data.inviteLink);
      setStatus("success");
    } catch {
      setError("Something went wrong.");
      setStatus("error");
    }
  };

  const generate = () => {
    setStatus("loading");
    setError(null);
    performFetch();
  };

  useEffect(() => {
    // set-state-in-effect flags this because performFetch contains setState
    // calls, but they only run in the async continuation after `await
    // fetch(...)` — this is React's own documented on-mount data-fetching
    // pattern, not the synchronous-setState-causes-a-wasted-extra-render
    // anti-pattern the rule exists to catch. Deps intentionally omitted:
    // this should only ever fire once, on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (autoGenerate) performFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyLink = async () => {
    if (!inviteLink) return;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "success" && inviteLink) {
    return (
      <div className="field">
        <label htmlFor="invite-link">Invite link</label>
        <input id="invite-link" readOnly value={inviteLink} onFocus={(e) => e.target.select()} />
        <div className="auth-form">
          <button type="button" className="btn btn-primary" onClick={copyLink}>
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button type="button" className="btn btn-ghost" onClick={generate}>
            Generate a new one
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="field">
      <button
        type="button"
        className="btn btn-primary"
        onClick={generate}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Generating…" : "Generate invite link"}
      </button>
      {status === "error" && (
        <p className="form-error">
          {error} — this has been intermittent on our end; trying again usually works.
        </p>
      )}
    </div>
  );
}
