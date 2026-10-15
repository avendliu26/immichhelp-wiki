import type { ReactNode } from 'react';
import { Info, Lightbulb, ShieldAlert, TriangleAlert } from 'lucide-react';

const icons = { note: Info, tip: Lightbulb, info: Info, warning: TriangleAlert, danger: ShieldAlert };
export function Callout({ type = 'info', title, children }: { type?: keyof typeof icons; title?: string; children: ReactNode }) {
  const Icon = icons[type];
  return <aside className={`callout ${type}`}><div className="callout-title"><Icon size={19} aria-hidden="true"/>{title || type[0].toUpperCase() + type.slice(1)}</div><div>{children}</div></aside>;
}
