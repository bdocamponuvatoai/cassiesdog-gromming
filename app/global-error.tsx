"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import "./globals.css";

/** Last-resort boundary for errors thrown by the root layout itself. */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <title>{`Something went wrong | ${site.name}`}</title>
        <main id="main" className="section container">
          <h1>A little tangle.</h1>
          <p>
            Something went wrong. Please try again, or call Cassie at{" "}
            <a href={site.telHref}>{site.phone}</a>.
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => retry()}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
