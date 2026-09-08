export type NavItem = { title: string; href: string; description?: string };
export type NavGroup = { title: string; items: NavItem[] };
export const navigation: NavGroup[] = [
  { title: 'Guides', items: [{ title: 'How to use Immich', href: '/getting-started/how-to-use-immich' }] },
  { title: 'Install & Setup', items: [{ title: 'Docker Compose', href: '/setup/immich-docker-compose' }, { title: 'How to update Immich', href: '/setup/how-to-update-immich' }] },
  { title: 'Platforms', items: [{ title: 'Proxmox', href: '/platforms/immich-proxmox' }, { title: 'Synology', href: '/platforms/immich-for-synology' }] },
  { title: 'Backup & Storage', items: [{ title: 'Backup and restore', href: '/backup/immich-backup' }, { title: 'External library', href: '/storage/immich-external-library' }] },
  { title: 'Troubleshooting', items: [{ title: 'Error loading image', href: '/troubleshooting/immich-error-loading-image' }] },
];
