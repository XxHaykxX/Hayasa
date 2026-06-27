// Minimal, dependency-free RFC4180 CSV parse/serialize. Handles quoted fields
// containing commas, newlines and "" escaped quotes; tolerates CRLF or LF.

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  // Strip a leading UTF-8 BOM if present.
  const s = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i++; // skip the escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (c === '\r') {
      // swallow; the following \n (if any) closes the row
    } else {
      field += c;
    }
  }
  // Flush the final field/row unless the input ended with a clean newline.
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  // Drop a trailing fully-empty row (e.g. file ended with a blank line).
  if (rows.length > 0 && rows[rows.length - 1].every((f) => f === '')) rows.pop();
  return rows;
}

export function toCsv(rows: string[][]): string {
  const esc = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return rows.map((r) => r.map((f) => esc(f ?? '')).join(',')).join('\r\n');
}
