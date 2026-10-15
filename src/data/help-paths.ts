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
    description: 'Check requirements, configure storage, and install with the official Docker Compose files.',
    href: '/setup',
    startHere: [
      { title: 'Docker Compose install', href: '/setup/immich-docker-compose' },
      { title: 'First steps in Immich', href: '/getting-started/how-to-use-immich' },
    ],
  },
  {
    id: 'fix-a-problem',
    title: 'Fix a Problem',
    description: 'Use the symptom and diagnostic evidence to choose a documented next check.',
    href: '/troubleshooting',
    startHere: [
      { title: 'Error loading image', href: '/troubleshooting/immich-error-loading-image' },
    ],
  },
  {
    id: 'back-up-restore',
    title: 'Back Up & Restore',
    description: 'Plan backups of the database, media, and configuration, then test an isolated restore.',
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
    description: 'Check container mounts, import paths, and read permissions before scanning an existing collection.',
    href: '/storage/immich-external-library',
  },
  {
    id: 'updates-migration',
    title: 'Updates & Migration',
    description: 'Check release notes and backups, follow the documented upgrade path, and verify the result.',
    href: '/setup/how-to-update-immich',
  },
];
