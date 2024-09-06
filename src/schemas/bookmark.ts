import { z } from 'astro/zod';

const BaseBookmarkSchema = z.object({
  label: z.string(),
  hotkey: z.string().optional(),
});

const SiteSchema = BaseBookmarkSchema.extend({
  type: z.literal('site'),
  url: z.string(),
});

export type Folder = z.infer<typeof BaseBookmarkSchema> & {
  type: 'folder';
  children: Bookmark[];
};

// @ts-ignore
const FolderSchema: z.ZodType<Folder> = BaseBookmarkSchema.extend({
  type: z.literal('folder'),
  children: z.lazy(() => BookmarkSchema.array()),
});

// @ts-ignore
const BookmarkSchema = z.discriminatedUnion('type', [SiteSchema, FolderSchema]);

export const BookmarksSchema = BookmarkSchema.array();

export type Site = z.infer<typeof SiteSchema>;
export type Bookmark = Site | Folder;
