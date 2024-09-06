import YAML from 'yaml';
import fs from 'fs';
import { BookmarksSchema } from '../schemas/bookmark';

export const loadBookmarks = async () => {
	var yaml = await fs.promises.readFile('./src/config/bookmarks.yml', 'utf-8');
  const sites = YAML.parse(yaml);
  
  await BookmarksSchema.parseAsync(sites);

  return sites;
}