import 'server-only';
import sharp from 'sharp';

// Uniform photo pipeline for every admin upload. Crops to a fixed 16:10 frame
// (so all tour/stop/gallery photos share the same proportions) and re-encodes
// to WebP for size. `fit: cover` + `position: attention` keeps the most
// salient region when cropping. `rotate()` first respects EXIF orientation.
export const TARGET_WIDTH = 1600;
export const TARGET_HEIGHT = 1000; // 16:10
export const WEBP_QUALITY = 80;

export type ProcessedImage = { buffer: Buffer; contentType: string; ext: string };

/**
 * Resize+crop an uploaded image to the standard frame and encode as WebP.
 * Falls back to the original bytes if processing fails (never blocks an upload).
 */
export async function processImage(file: File): Promise<ProcessedImage> {
  const input = Buffer.from(await file.arrayBuffer());
  try {
    const buffer = await sharp(input)
      .rotate()
      .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover', position: 'attention' })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
    return { buffer, contentType: 'image/webp', ext: 'webp' };
  } catch (e) {
    console.warn('[image-process] sharp failed, using original:', (e as Error).message);
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    return { buffer: input, contentType: file.type || 'image/jpeg', ext };
  }
}
