import { notFound } from 'next/navigation';

// Any unmatched path under a locale falls through to the localized not-found.
export default function CatchAll() {
  notFound();
}
