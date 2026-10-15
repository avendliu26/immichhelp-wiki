import type { ReactNode } from 'react';

// Static, server-rendered SVG figures referenced from article MDX with the
// allow-listed standalone marker `<Figure id="..." />`. No client JavaScript,
// no raster/remote assets, and all wording stays within sources the page
// already links (see each entry's sourceHref).
export type FigureId = 'backup-set-map' | 'original-download-split' | 'update-route-map';

export const figureIds: ReadonlySet<FigureId> = new Set<FigureId>([
  'backup-set-map',
  'original-download-split',
  'update-route-map',
]);

type Variant = 'panel' | 'protect' | 'regen' | 'warn';

function Tx({ x, y, size = 13, cls = 'fig-label', anchor, children }: { x: number; y: number; size?: number; cls?: string; anchor?: 'start' | 'middle' | 'end'; children: ReactNode }) {
  return <text className={cls} x={x} y={y} fontSize={size} textAnchor={anchor}>{children}</text>;
}

function Box({ x, y, w, h, variant = 'panel', children }: { x: number; y: number; w: number; h: number; variant?: Variant; children: ReactNode }) {
  // Every rect and text uses the figure's global viewBox coordinates. Keeping
  // groups untransformed prevents nested panels from translating labels twice.
  return <g>
    <rect className={variant === 'panel' ? 'fig-panel' : `fig-panel fig-${variant}`} x={x} y={y} width={w} height={h} rx={10} />
    {variant !== 'panel' && <rect className={`fig-rail fig-rail-${variant}`} x={x + 1.5} y={y + 10} width={4} height={h - 20} rx={2} />}
    {children}
  </g>;
}

function Arrow({ d }: { d: string }) {
  return <path className="fig-arrow" d={d} />;
}

function Head({ x, y }: { x: number; y: number }) {
  return <polygon className="fig-arrow-head" points={`${x - 5},${y - 6} ${x + 5},${y - 6} ${x},${y}`} />;
}

function Fig({ id, alt, desc, height, children }: { id: FigureId; alt: string; desc: string; height: number; children: ReactNode }) {
  return <svg viewBox={`0 0 420 ${height}`} role="img" aria-labelledby={`figure-${id}-title`} aria-describedby={`figure-${id}-desc`}>
    <title id={`figure-${id}-title`}>{alt}</title>
    <desc id={`figure-${id}-desc`}>{desc}</desc>
    {children}
  </svg>;
}

export type FigureSpec = { alt: string; desc: string; caption: string; sourceHref: string; sourceLabel: string; svg: ReactNode };

const backupSetMap: FigureSpec = {
  alt: 'Immich backup set: private configuration, the upload location folders, the separate live database data directory, and external library roots.',
  desc: 'Configuration reconnects records to files. Under the upload location, backups hold a database dump of metadata and paths, upload folders hold originals, and thumbs and encoded-video are regenerable. The live database data directory is not a SQL dump, and external roots live outside the upload location.',
  caption: 'Keep the database dump, original files, external-library roots and private configuration together. Generated thumbnails and encoded video can be recreated from intact originals; library contents depend on storage-template history.',
  sourceHref: 'https://docs.immich.app/administration/backup-and-restore/',
  sourceLabel: 'Official Immich backup guidance',
  svg: <Fig
    id="backup-set-map"
    alt="Immich backup set: private configuration, the upload location folders, the separate live database data directory, and external library roots."
    desc="Configuration reconnects records to files. Under the upload location, backups hold a database dump of metadata and paths, upload folders hold originals, and thumbs and encoded-video are regenerable. The live database data directory is not a SQL dump, and external roots live outside the upload location."
    height={470}
  >
    <Box x={14} y={14} w={392} h={58} variant="protect">
      <Tx x={30} y={38} size={14} cls="fig-strong">Configuration — keep private</Tx>
      <Tx x={30} y={56} size={12.5} cls="fig-note">.env · docker-compose.yml · overrides · mount map</Tx>
    </Box>
    <Box x={14} y={86} w={392} h={200}>
      <Tx x={30} y={110} size={14} cls="fig-strong">UPLOAD_LOCATION</Tx>
      <Tx x={205} y={110} size={12.5} cls="fig-note">host dir → mounted at /data</Tx>
      <Box x={28} y={124} w={364} h={48} variant="protect">
        <Tx x={40} y={145} size={13} cls="fig-strong">backups/ — .sql.gz dump</Tx>
        <Tx x={40} y={164} size={12} cls="fig-note">metadata + file paths, not image/video bytes</Tx>
      </Box>
      <Box x={28} y={178} w={364} h={48} variant="protect">
        <Tx x={40} y={199} size={13} cls="fig-strong">upload/ · library/ · profile/ — originals</Tx>
        <Tx x={40} y={218} size={12} cls="fig-note">actual image/video bytes; must be copied</Tx>
      </Box>
      <Box x={28} y={232} w={364} h={46} variant="regen">
        <Tx x={40} y={252} size={13} cls="fig-strong">thumbs/ · encoded-video/ — generated</Tx>
        <Tx x={40} y={270} size={12} cls="fig-note">regenerable from valid originals</Tx>
      </Box>
    </Box>
    <Box x={14} y={302} w={392} h={56} variant="warn">
      <Tx x={30} y={326} size={13.5} cls="fig-strong">DB_DATA_LOCATION — live PostgreSQL data dir</Tx>
      <Tx x={30} y={345} size={12} cls="fig-note">not a dump — a copied active data dir is not a backup</Tx>
    </Box>
    <Box x={14} y={374} w={392} h={56} variant="protect">
      <Tx x={30} y={398} size={13.5} cls="fig-strong">External library roots + sidecars</Tx>
      <Tx x={30} y={417} size={12} cls="fig-note">host/NAS · outside /data — inventory actual sources</Tx>
    </Box>
    <rect className="fig-rail fig-rail-protect" x={14} y={443} width={16} height={6} rx={2} />
    <Tx x={38} y={452} size={12} cls="fig-note">must protect</Tx>
    <rect className="fig-rail fig-rail-regen" x={150} y={443} width={16} height={6} rx={2} />
    <Tx x={174} y={452} size={12} cls="fig-note">regenerable</Tx>
    <rect className="fig-rail fig-rail-warn" x={268} y={443} width={16} height={6} rx={2} />
    <Tx x={292} y={452} size={12} cls="fig-note">not a dump</Tx>
  </Fig>,
};

const originalDownloadSplit: FigureSpec = {
  alt: 'Decision diagram: if the server original downloads, check the thumbnail and preview; if it fails, inspect the request, then the file path, mount and permissions.',
  desc: 'A failed original download splits into two checks. HTTP status codes and network evidence select the next check but do not name the cause, and regenerating thumbnails cannot recover a missing original.',
  caption: 'The original-download split. HTTP status and network evidence narrow the next check; they never name the cause. A missing original is not repaired by regenerating derived files.',
  sourceHref: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status',
  sourceLabel: 'MDN HTTP status reference',
  svg: <Fig
    id="original-download-split"
    alt="Decision diagram: if the server original downloads, check the thumbnail and preview; if it fails, inspect the request, then the file path, mount and permissions."
    desc="A failed original download splits into two checks. HTTP status codes and network evidence select the next check but do not name the cause, and regenerating thumbnails cannot recover a missing original."
    height={400}
  >
    <Box x={30} y={14} w={360} h={56}>
      <Tx x={210} y={38} size={14.5} cls="fig-strong" anchor="middle">Try the server original download</Tx>
      <Tx x={210} y={57} size={12} cls="fig-note" anchor="middle">verify another device; a phone copy may be local</Tx>
    </Box>
    <Arrow d="M210 70 V88 H112 V98" />
    <Head x={112} y={104} />
    <Arrow d="M210 88 H328 V98" />
    <Head x={328} y={104} />
    <Box x={14} y={104} w={192} h={100}>
      <Tx x={26} y={130} size={14} cls="fig-strong">Yes — it downloads</Tx>
      <Tx x={26} y={152} size={12.5} cls="fig-label">tile/preview fails?</Tx>
      <Tx x={26} y={173} size={12.5} cls="fig-note">→ check thumbnail jobs</Tx>
      <Tx x={26} y={191} size={12.5} cls="fig-note">and the generated path</Tx>
    </Box>
    <Box x={214} y={104} w={192} h={100}>
      <Tx x={226} y={130} size={14} cls="fig-strong">No — it fails</Tx>
      <Tx x={226} y={152} size={12.5} cls="fig-label">inspect the request</Tx>
      <Tx x={226} y={173} size={12.5} cls="fig-note">→ file path, mount</Tx>
      <Tx x={226} y={191} size={12.5} cls="fig-note">and permissions</Tx>
    </Box>
    <Box x={14} y={220} w={392} h={98}>
      <Tx x={26} y={246} size={13.5} cls="fig-strong">HTTP status routes the next check, not the cause</Tx>
      <Tx x={26} y={268} size={12.5} cls="fig-label">401 sign-in · 403 access · 404 route · 429 pause</Tx>
      <Tx x={26} y={286} size={12.5} cls="fig-label">5xx service logs · no reply → connection</Tx>
      <Tx x={26} y={306} size={12} cls="fig-note">A 2xx response can still hold an unexpected body.</Tx>
    </Box>
    <Box x={14} y={334} w={392} h={62} variant="warn">
      <Tx x={26} y={358} size={13.5} cls="fig-warn-text">Regeneration cannot recover a missing original</Tx>
      <Tx x={26} y={378} size={12.5} cls="fig-note">→ check the backup set before retrying</Tx>
    </Box>
  </Fig>,
};

const updateRouteMap: FigureSpec = {
  alt: 'Update route map: record versions and back up first, then take either the routine v3 path or the v1/v2-to-v3 preflight path, then verify.',
  desc: 'A vertical route. Record versions and read release notes, back up the database and media, then choose a route: routine v3 update, v1/v2 to v3 preflight including the pgvecto.rs to VectorChord transition, or an intermediate version for very old v1. Every route ends in the routine update and verification.',
  caption: 'Update route map. The backup gate comes before any pull; a v1/v2 server passes the v3 preflight (VectorChord, CPU, ML configuration) first, and very old v1 servers start on an intermediate version. Version numbers are examples — recheck the target release notes.',
  sourceHref: 'https://docs.immich.app/install/upgrading/',
  sourceLabel: 'Official Immich upgrading guide',
  svg: <Fig
    id="update-route-map"
    alt="Update route map: record versions and back up first, then take either the routine v3 path or the v1/v2-to-v3 preflight path, then verify."
    desc="A vertical route. Record versions and read release notes, back up the database and media, then choose a route: routine v3 update, v1/v2 to v3 preflight including the pgvecto.rs to VectorChord transition, or an intermediate version for very old v1. Every route ends in the routine update and verification."
    height={570}
  >
    <Box x={14} y={14} w={392} h={52}>
      <Tx x={28} y={38} size={13.5} cls="fig-strong">0 · Record versions + read target release notes</Tx>
      <Tx x={28} y={56} size={12} cls="fig-note">server, mobile, database tag and PostgreSQL major</Tx>
    </Box>
    <Arrow d="M210 66 V77" />
    <Head x={210} y={82} />
    <Box x={14} y={82} w={392} h={56} variant="protect">
      <Tx x={28} y={106} size={13.5} cls="fig-strong">1 · Back up database + matching media</Tx>
      <Tx x={28} y={125} size={12} cls="fig-note">before any pull — full backup set, verified</Tx>
    </Box>
    <Arrow d="M210 138 V150" />
    <Head x={210} y={160} />
    <Box x={14} y={160} w={392} h={252}>
      <Tx x={28} y={184} size={13.5} cls="fig-strong">Choose your route — every route ends below</Tx>
      <Box x={24} y={196} w={372} h={62} variant="protect">
        <Tx x={36} y={216} size={13} cls="fig-strong">A · Already on v3 — routine update</Tx>
        <Tx x={36} y={234} size={12} cls="fig-label">{'Set IMMICH_VERSION · docker compose config --quiet'}</Tx>
        <Tx x={36} y={250} size={12} cls="fig-label">{'→ docker compose pull && docker compose up -d'}</Tx>
      </Box>
      <Box x={24} y={262} w={372} h={78} variant="warn">
        <Tx x={36} y={282} size={13} cls="fig-strong">B · v1/v2 → v3 preflight, then A</Tx>
        <Tx x={36} y={300} size={12} cls="fig-label">pgvecto.rs → VectorChord transition before v3</Tx>
        <Tx x={36} y={316} size={12} cls="fig-label">CPU x86-64-v2+ (including VM-exposed features)</Tx>
        <Tx x={36} y={332} size={12} cls="fig-label">Replace removed machine-learning env variables</Tx>
      </Box>
      <Box x={24} y={346} w={372} h={58} variant="warn">
        <Tx x={36} y={366} size={13} cls="fig-strong">C · Very old v1 — then B → A</Tx>
        <Tx x={36} y={384} size={12} cls="fig-label">Start once on 1.132.0–1.136.0 (1.132.3 recommended)</Tx>
      </Box>
    </Box>
    <Arrow d="M210 412 V418" />
    <Head x={210} y={424} />
    <Box x={14} y={424} w={392} h={54}>
      <Tx x={28} y={448} size={13.5} cls="fig-strong">Verify: older original · new upload · thumbnail</Tx>
      <Tx x={28} y={467} size={12} cls="fig-note">Then review integrity findings and job queues.</Tx>
    </Box>
    <Arrow d="M210 478 V488" />
    <Head x={210} y={494} />
    <Box x={14} y={494} w={392} h={58} variant="warn">
      <Tx x={28} y={518} size={13} cls="fig-warn-text">If it fails: restore the pre-update DB + media</Tx>
      <Tx x={28} y={537} size={12} cls="fig-note">an image-tag revert alone is not a supported downgrade</Tx>
    </Box>
  </Fig>,
};

export const figures: Record<FigureId, FigureSpec> = {
  'backup-set-map': backupSetMap,
  'original-download-split': originalDownloadSplit,
  'update-route-map': updateRouteMap,
};
