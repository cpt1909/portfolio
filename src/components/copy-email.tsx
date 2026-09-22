"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

export function CopyEmail({ url, label }: { url: string; label: string }) {
  const address = url.slice(7).split("?")[0];
  let email = address;
  try {
    email = decodeURIComponent(address);
  } catch {
    /* A literal % is valid in an email local part. */
  }
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      if (!mounted.current) return;
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 3000);
    } catch {
      if (mounted.current) setStatus("failed");
    }
  }

  return (
    <div className="copy-email">
      <button
        className="social-link email-copy"
        type="button"
        onClick={copy}
        aria-label={`Copy email address: ${email}`}
        data-copied={status === "copied"}
      >
        <Mail size={19} />
        <span>
          <strong>{status === "copied" ? "Address copied." : label}</strong>
          <small>{email}</small>
        </span>
        <span className="copy-hint" aria-hidden="true">
          {status === "copied" ? "COPIED!" : "CLICK TO COPY"}
        </span>
        {status === "copied" ? <Check size={20} /> : <Copy size={18} />}
      </button>
      <span className="sr-only" role="status">
        {status === "copied"
          ? "Email address copied to clipboard."
          : status === "failed"
            ? "Copy unavailable. Select and copy the email address below."
            : ""}
      </span>
      {status === "failed" && (
        <div className="copy-fallback">
          <label htmlFor={`email-${email}`}>Select and copy the address:</label>
          <input
            id={`email-${email}`}
            readOnly
            value={email}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      )}
    </div>
  );
}
