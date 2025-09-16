"use client";

import Error from "next/error";

import Document from "@/app/document";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
  return (
    <Document locale="en">
      <Error statusCode={404} />;
    </Document>
  );
}
