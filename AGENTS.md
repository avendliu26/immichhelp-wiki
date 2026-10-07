{\rtf1\ansi\ansicpg936\cocoartf2870
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # ImmichHelp Project Rules\
\
## Scope\
\
Work only inside this repository.\
\
Do not perform a new site-wide SEO audit unless explicitly requested.\
\
Do not research competitors unless explicitly requested.\
\
Do not redesign the site or refactor unrelated architecture.\
\
Do not expand a narrowly scoped task into general SEO cleanup.\
\
Prefer small, targeted changes tied directly to the requested URLs, files, or acceptance criteria.\
\
Do not modify unrelated pages merely for SEO completeness.\
\
Preserve existing routes, components, visual design, and site architecture unless the task explicitly requires a change.\
\
Reuse existing pages, data, and components whenever possible.\
\
## SEO execution\
\
Prioritize:\
1. pages already receiving Google impressions or clicks\
2. verified internal-link problems\
3. clearly defined content opportunities\
4. factual updates supported by reliable sources\
\
Do not:\
- mechanically rewrite existing winner pages\
- create low-demand pages just to increase page count\
- spend time on low-priority SEO completeness checks\
- repeatedly audit items that have already been verified\
\
Never invent:\
- factual claims\
- dates\
- compatibility or feature claims\
- statistics\
- image licenses or image sources\
\
## Development\
\
For straightforward changes, implement them directly.\
\
Do not introduce unnecessary dependencies or architectural changes.\
\
When changing internal links, verify that the destination route actually exists.\
\
When modifying metadata, preserve search intent and avoid keyword stuffing.\
\
## Verification\
\
Before finishing:\
\
1. inspect the final diff\
2. verify all changed internal links\
3. run the relevant build, typecheck, or lint command when available\
4. fix regressions caused by the current task\
5. do not turn pre-existing unrelated warnings into a new cleanup project\
\
## Final report\
\
Report only:\
\
- files changed\
- changes completed\
- validation/build result\
- unresolved blocking issues\
\
Do not propose unrelated follow-up refactors or audits unless they are required to complete the requested task.}