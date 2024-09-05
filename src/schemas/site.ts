import { z } from 'astro/zod';

export const SiteSchema = z.array(z.object({
  label: z.string(),
  url: z.string(),
  hotkey: z.string().optional()
}))

export type Site = z.infer<typeof SiteSchema>[number];