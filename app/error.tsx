"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export default function ErrorPage({
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
    <section className="section container">
      <h1>A little tangle.</h1>
      <p>
        Something went wrong. Please try again, or call Cassie at{" "}
        <a href={site.telHref}>{site.phone}</a>.
      </p>
      <Button type="button" onClick={() => retry()}>
        Try again
      </Button>
    </section>
  );
}
