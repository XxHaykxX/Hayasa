// Client-safe types/constants for the admin media library (gallery).
export type MediaAsset = {
  id: string;
  url: string;
  path: string | null;
  name: string | null;
  folder_id: string | null;
  created_at: string;
};

export type MediaFolder = { id: string; name: string; created_at: string };

export const MEDIA_PAGE_SIZE = 60;
