'use client';
import { Moon, Sun } from './icons';
import { useEffect, useState } from 'react';
export function ThemeToggle() { const [dark,setDark] = useState(false); useEffect(() => { const saved=localStorage.getItem('theme'); const isDark=saved==='dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches); setDark(isDark); document.documentElement.dataset.theme=isDark?'dark':'light'; },[]); function toggle(){ const next=!dark; setDark(next); document.documentElement.dataset.theme=next?'dark':'light'; localStorage.setItem('theme',next?'dark':'light'); } return <button className="header-action theme-toggle" onClick={toggle} aria-label="Toggle theme">{dark?<Sun size={17}/>:<Moon size={17}/>}</button>; }
