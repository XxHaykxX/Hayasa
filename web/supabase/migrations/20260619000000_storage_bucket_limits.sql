-- Restrict the tour-photos bucket to images up to 5 MB.
update storage.buckets
set file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif']
where id = 'tour-photos';
