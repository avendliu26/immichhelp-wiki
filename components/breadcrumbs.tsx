import Link from 'next/link';
const categoryRoutes:Record<string,string>={'Getting Started':'/guides','Install & Setup':'/setup','Platforms':'/platforms','Backup & Storage':'/backup','Troubleshooting':'/troubleshooting','Compare':'/compare','Reference':'/about'};
export function Breadcrumbs({title,category}:{title:string;category:string}){return <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href={categoryRoutes[category] || '/guides'}>{category}</Link><span>/</span><strong>{title}</strong></div>}
