'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Check, Copy } from './icons';

export function CodeBlock({code,language='text'}:{code:string;language?:string}) {
  const [status,setStatus] = useState<'idle'|'copied'|'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = useId();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(code);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'),2000);
    } catch { setStatus('error'); }
  }
  return <div className="code-block">
    <div className="code-head"><span>{language}</span><button onClick={copy} aria-label={status==='copied'?'Copied code':'Copy code'} aria-describedby={id}>{status==='copied'?<Check size={14}/>:<Copy size={14}/>} {status==='copied'?'Copied':'Copy'}</button></div>
    <pre tabIndex={0} aria-label={`${language} code`}><code>{code}</code></pre>
    <div id={id} role="status" className={status==='error'?'code-copy-message':'sr-only'}>{status==='copied'?'Code copied to clipboard.':status==='error'?'Copy unavailable. Select the code and copy it manually.':''}</div>
  </div>;
}
