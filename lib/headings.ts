export const headingId = (text:string) => text.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-');
export type TocHeading = { id:string; text:string; level:number };
export function articleHeadings(body:string):TocHeading[] {
  return [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map(match => ({id:headingId(match[2]),text:match[2].replace(/[#`]/g,'').trim(),level:match[1].length}));
}
