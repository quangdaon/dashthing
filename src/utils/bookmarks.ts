import YAML from 'yaml';
import fs from 'fs';
import { BookmarkSchema } from '../schemas/bookmark';

export const loadBookmarks = async () => {
	var yaml = await fs.promises.readFile('./src/config/bookmarks.yml', 'utf-8');
  const sites = YAML.parse(yaml);
  
  await BookmarkSchema.parseAsync(sites);

  return sites;
}