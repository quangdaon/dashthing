import { z } from 'astro/zod';

const BaseBookmarkSchema = z.object({
  label: z.string(),
  hotkey: z.string().optional(),
});

const SiteSchema = BaseBookmarkSchema.extend({
  type: z.literal('site'),
  url: z.string(),
});

const SearchSchema = BaseBookmarkSchema.extend({
  type: z.literal('search'),
  url: z.string(),
  fallback: z.string().optional(),
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
const BookmarkSchema = z.discriminatedUnion('type', [
  SiteSchema,
  SearchSchema,
  FolderSchema,
]);

export const BookmarksSchema = BookmarkSchema.array();

export type Site = z.infer<typeof SiteSchema>;
export type SearchSite = z.infer<typeof SearchSchema>;
export type Bookmark = Site | SearchSite | Folder;
