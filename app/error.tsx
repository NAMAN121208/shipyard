"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Storefront error caught:", error);
  }, [error]);

  return (
    <main className="container">
      <div className="notfound">
        <h1 className="notfound-title">Something went wrong</h1>
        <p className="notfound-sub">
          We encountered an unexpected error while loading this page.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          <button
            type="button"
            onClick={() => reset()}
            className="btn-review-toggle"
          >
            Try again
          </button>
          <Link href="/" className="back-link" style={{ margin: 0, alignSelf: "center" }}>
            ← Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
