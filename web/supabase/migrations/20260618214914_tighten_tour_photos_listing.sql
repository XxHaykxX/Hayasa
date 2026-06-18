-- Public buckets serve objects via their public URL without a SELECT policy.
-- Drop the broad listing policy so clients can't enumerate all files.
drop policy if exists "tour-photos public read" on storage.objects;
