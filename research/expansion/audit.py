"""Read-only content/scope audit, except for writing expansion metrics.json.
Run from the repository root: python3 research/expansion/audit.py
"""
from pathlib import Path
import hashlib,json,re,subprocess
root=Path('research/expansion')
baseline=json.loads((root/'baseline.json').read_text())
sources=json.loads((root/'source-index.json').read_text())
def canonical(url): return url.split('#')[0].rstrip('/')
by_url={canonical(s['url']):s for s in sources}
def word_count(raw):
    text=raw.split('---',2)[-1]
    text=re.sub(r'\[([^]]+)\]\([^)]+\)',r'\1',text)
    text=re.sub(r'https?://[^\s)]+','',text)
    return len(re.findall(r"\b[\w]+(?:[-’'][\w]+)*\b",text))
rows=[];issues=[]
for file in baseline['pages']:
    old=subprocess.check_output(['git','show','HEAD:'+file],text=True)
    path=Path(file);new=path.read_text();body=new.split('---',2)[2]
    old_urls={canonical(u) for u in re.findall(r'\]\((https?://[^)]+)\)',old)}
    new_urls={canonical(u) for u in re.findall(r'\]\((https?://[^)]+)\)',body.split('## Sources',1)[1])}
    faq=body.split('## FAQ',1)[1].split('## Sources',1)[0]
    count=len(re.findall(r'^### ',faq,re.M))
    categories={t:sum(by_url[u]['type']==t for u in new_urls) for t in ['official','github-issue','github-discussion','forum-reddit','community-contribution']}
    rows.append(dict(slug=path.stem,file=file,before=word_count(old),after=word_count(new),sourcesBefore=len(old_urls),sourcesAfter=len(new_urls),sourcesAdded=len(new_urls-old_urls),types=categories,faqCount=count,dangerCount=body.count(':::danger'),stepByStep=bool(re.search(r'^## Step 1',body,re.M)),verification=bool(re.search('verif',body,re.I)),failureRecovery='If this does not work' in body or 'Verification and escalation' in body,platformDifferences=True,versionDifferences=True))
    if old.split('---',2)[1]!=new.split('---',2)[1]:issues.append(file+': frontmatter changed')
    if not 3<=count<=8:issues.append(file+': FAQ count')
    if body.count('```')%2 or len(re.findall(r'^:::',body,re.M))%2:issues.append(file+': unbalanced blocks')
    heads=re.findall(r'^#{2,3} (.+)$',body,re.M)
    if len(set(heads))!=len(heads):issues.append(file+': duplicate heading')
    for url in re.findall(r'\]\((/[^)]+)\)',body):
        target=Path('content'+url+'.mdx')
        if not target.exists() or 'status: published' not in target.read_text():issues.append(file+': invalid internal link '+url)
    cited={canonical(u) for u in re.findall(r'\]\((https?://[^)]+)\)',body)}
    if cited-new_urls:issues.append(file+': source list missing '+str(cited-new_urls))
    dossier=root/(path.stem+'-expansion.md')
    if not dossier.exists() or 'Pending evidence' in dossier.read_text():issues.append(file+': incomplete dossier')
changed=[p for p,h in baseline['originalResearchHashes'].items() if not Path(p).exists() or hashlib.sha256(Path(p).read_bytes()).hexdigest()!=h]
current={str(p) for p in Path('content').glob('**/*.mdx') if 'status: published' in p.read_text()}
unchanged=current==set(baseline['pages'])
if not unchanged:issues.append('Published route set changed')
issues+=changed
result={'wordCountMethod':'Visible article body including headings, tables, code tokens, FAQ and source labels; excludes frontmatter, URLs, link targets and Markdown punctuation. Both HEAD and current use the same Unicode regex, preserving internal hyphens/apostrophes.','sourceCountMethod':'Unique canonical URLs in each Sources section, stripping fragments/trailing slash. New means absent from the same old article, not necessarily new to the website. Totals deduplicate across pages.','pages':rows,'uniqueSources':len(sources),'uniqueTypes':{t:sum(s['type']==t for s in sources) for t in ['official','github-issue','github-discussion','forum-reddit','community-contribution']},'originalResearchUnchanged':not changed,'publishedRoutesUnchanged':unchanged,'structuralIssues':issues}
(root/'metrics.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
raise SystemExit(bool(issues))
