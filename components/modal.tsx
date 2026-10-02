'use client';
import { useEffect, useRef, type ReactNode } from 'react';

// Native modal dialogs keep background controls inert and contain keyboard focus.
export function Modal({ open, onClose, label, id, className, children }: {
  open:boolean; onClose:()=>void; label:string; id?:string; className:string; children:ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const opener = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    element.showModal();
    const escape = (event:KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key === 'Tab') {
        const controls = Array.from(element.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])'));
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('keydown', escape);
      element.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
      if (opener?.isConnected) opener.focus({preventScroll:true});
    };
  }, [open, onClose]);
  return <dialog ref={dialog} id={id} aria-label={label} className={className}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    {open ? children : null}
  </dialog>;
}
