import fs from 'node:fs';
import path from 'node:path';

export type DocumentStatus = 'draft' | 'review' | 'published';
export type DocumentSummary = { title:string; description:string; slug:string; category:string; keywords:string[]; headings:string[]; status:DocumentStatus; lastReviewed?:string; verifiedVersion?:string; updated?:string };
export type Document = DocumentSummary & { body:string };
const contentRoot = path.join(process.cwd(), 'content');

function parseFrontmatter(raw:string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {} as Record<string,string>, body: raw };
  const data:Record<string,string> = {};
  match[1].split('\n').forEach((line) => { const index = line.indexOf(':'); if (index > -1) data[line.slice(0,index).trim()] = line.slice(index + 1).trim().replace(/^['"]|['"]$/g,''); });
  return { data, body: match[2] };
}
function files(dir = contentRoot):string[] { return fs.existsSync(dir) ? fs.readdirSync(dir,{withFileTypes:true}).flatMap((entry) => entry.isDirectory() ? files(path.join(dir,entry.name)) : entry.name.endsWith('.mdx') ? [path.join(dir,entry.name)] : []) : []; }
function fromFile(file:string):Document { const raw = fs.readFileSync(file,'utf8'); const {data,body} = parseFrontmatter(raw); const slug = path.relative(contentRoot,file).replace(/\.mdx$/,'').replace(/\\/g,'/').replace(/\/index$/,''); const headings = [...body.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => match[1].replace(/[#`]/g,'').trim()); return { title:data.title || slug, description:data.description || '', slug, category:data.category || 'Reference', keywords:(data.keywords || '').split(',').map((item) => item.trim()).filter(Boolean), headings, status:(data.status || 'draft') as DocumentStatus, lastReviewed:data.lastReviewed, verifiedVersion:data.verifiedVersion, updated:data.updated, body }; }
export function getDocuments():Document[] { return files().map(fromFile); }
export function getPublishedDocuments():DocumentSummary[] { return getDocuments().filter((doc) => doc.status === 'published').map(({body:_,...summary}) => summary); }
export function getDocument(slug:string):Document | undefined { return getDocuments().find((doc) => doc.slug === slug && doc.status === 'published'); }
export function searchDocuments(query:string):DocumentSummary[] { const term = query.trim().toLowerCase(); if (!term) return getPublishedDocuments(); return getPublishedDocuments().filter((doc) => [doc.title,doc.description,doc.category,...doc.keywords,...doc.headings].join(' ').toLowerCase().includes(term)); }
