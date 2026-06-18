// Admin stops: shared zod schema + row types (client-safe).
import { z } from 'zod';

export type StopPhotoRow = {
  id: string;
  stop_id: string;
  photo_url: string;
  order_index: number;
};

export type StopRow = {
  id: string;
  tour_id: string;
  order_index: number;
  name_hy: string | null;
  name_ru: string | null;
  name_en: string | null;
  description_hy: string | null;
  description_ru: string | null;
  description_en: string | null;
  latitude: number | null;
  longitude: number | null;
  stop_photos: StopPhotoRow[];
};

export const stopSchema = z.object({
  name_ru: z.string().trim().min(1, 'Название (RU) обязательно'),
  name_hy: z.string().trim().optional().default(''),
  name_en: z.string().trim().optional().default(''),
  description_ru: z.string().trim().optional().default(''),
  description_hy: z.string().trim().optional().default(''),
  description_en: z.string().trim().optional().default(''),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  order_index: z.coerce.number().int().min(0).default(0),
});

export type StopInput = z.infer<typeof stopSchema>;
