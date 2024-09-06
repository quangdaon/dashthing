import { z } from 'astro/zod';

export const BookmarkSchema = z.array(z.object({
  label: z.string(),
  url: z.string(),
  hotkey: z.string().optional()
}))

export type Bookmark = z.infer<typeof BookmarkSchema>[number];