export type NavItem = { title: string; href: string; description?: string };
export type NavGroup = { title: string; items: NavItem[] };
export const navigation: NavGroup[] = [
  { title: 'Getting Started', items: [{ title: 'How to use Immich', href: '/getting-started/how-to-use-immich' }, { title: 'Immich setup', href: '/setup/immich-setup' }] },
  { title: 'Install & Setup', items: [{ title: 'Docker Compose', href: '/setup/immich-docker-compose' }] },
  { title: 'Platforms', items: [{ title: 'Proxmox', href: '/platforms/immich-proxmox' }, { title: 'Synology', href: '/platforms/immich-for-synology' }, { title: 'Unraid', href: '/platforms/immich-unraid' }] },
  { title: 'Backup & Storage', items: [{ title: 'Backup and restore', href: '/backup/immich-backup' }, { title: 'External library', href: '/storage/immich-external-library' }] },
  { title: 'Troubleshooting', items: [{ title: 'Error loading image', href: '/troubleshooting/immich-error-loading-image' }] },
  { title: 'Compare', items: [{ title: 'Immich vs PhotoPrism', href: '/compare/immich-vs-photoprism' }, { title: 'Immich vs Synology Photos', href: '/compare/immich-vs-synology-photos' }] },
  { title: 'Reference', items: [{ title: 'About Immich Help', href: '/about' }] },
];
