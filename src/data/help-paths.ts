export type HelpPathLink = {
  title: string;
  href: string;
};

export type HelpPath = {
  id: string;
  title: string;
  description: string;
  href: string;
  startHere?: HelpPathLink[];
};

/**
 * Task-based entry points for the homepage.
 * Every href resolves to a route that already exists in the site.
 * Ordered as a reader's likely journey: set up, fix, protect, place, store, maintain.
 */
export const helpPaths: HelpPath[] = [
  {
    id: 'install-setup',
    title: 'Install & Setup',
    description: 'Start from a clean machine and reach a running server with the official Docker Compose files.',
    href: '/setup',
    startHere: [
      { title: 'Docker Compose install', href: '/setup/immich-docker-compose' },
      { title: 'First steps in Immich', href: '/getting-started/how-to-use-immich' },
    ],
  },
  {
    id: 'fix-a-problem',
    title: 'Fix a Problem',
    description: 'Begin with the symptom, check the evidence, then apply the safest documented correction.',
    href: '/troubleshooting',
    startHere: [
      { title: 'Error loading image', href: '/troubleshooting/immich-error-loading-image' },
    ],
  },
  {
    id: 'back-up-restore',
    title: 'Back Up & Restore',
    description: 'Keep the database and the media consistent, and rehearse the restore before you need it.',
    href: '/backup',
    startHere: [
      { title: 'Backup and restore', href: '/backup/immich-backup' },
    ],
  },
  {
    id: 'nas-platforms',
    title: 'NAS & Platforms',
    description: 'Plan storage, permissions, and the update path for Proxmox, Synology, and TrueNAS.',
    href: '/platforms',
    startHere: [
      { title: 'Proxmox', href: '/platforms/immich-proxmox' },
      { title: 'Synology', href: '/platforms/immich-for-synology' },
    ],
  },
  {
    id: 'storage-libraries',
    title: 'Storage & Libraries',
    description: 'Mount and scan photos you already have while keeping ownership and paths predictable.',
    href: '/storage/immich-external-library',
  },
  {
    id: 'updates-migration',
    title: 'Updates & Migration',
    description: 'Read the release notes, back up first, and move between versions without breaking the library.',
    href: '/setup/how-to-update-immich',
  },
];
