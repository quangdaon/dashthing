import YAML from 'yaml';
import fs from 'fs';
import { SiteSchema } from '../schemas/site';

export const loadSites = async () => {
	var yaml = await fs.promises.readFile('./src/data/sites.yml', 'utf-8');
  const sites = YAML.parse(yaml);
  
  await SiteSchema.parseAsync(sites);

  return sites;
}