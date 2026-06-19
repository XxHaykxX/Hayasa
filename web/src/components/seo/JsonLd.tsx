// Renders a JSON-LD <script> block. Server component — the structured data is
// in the initial HTML so crawlers (and AI engines) read it without JS.
// Object passed in is trusted (built server-side from our own data), but we
// still escape "<" so a stray "</script>" inside any string field can't break
// out of the script element (XSS-safe serialization).

export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
