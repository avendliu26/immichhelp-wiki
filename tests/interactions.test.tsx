import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MobileNav } from '@/components/mobile-nav';
import { SearchDialog } from '@/components/search-dialog';
import { CodeBlock } from '@/components/code-block';
vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
Object.defineProperty(HTMLDialogElement.prototype,'showModal',{configurable:true,value:function(){this.setAttribute('open','');}});
Object.defineProperty(HTMLDialogElement.prototype,'close',{configurable:true,value:function(){this.removeAttribute('open');}});
vi.stubGlobal('matchMedia',()=>({matches:false,addEventListener(){},removeEventListener(){}}));
const documents = [{ title:'Update guide', description:'Update safely', slug:'setup/how-to-update-immich', category:'Setup', keywords:['update'], headings:[], status:'published' as const }];
describe('documentation interactions', () => {
  it('closes navigation with Escape, restores the trigger and releases scrolling', async () => {
    vi.stubGlobal('matchMedia',()=>({matches:false,addEventListener(){},removeEventListener(){}}));
    render(<MobileNav />);
    const trigger=screen.getByRole('button', {name:'Toggle navigation'});
    trigger.focus(); fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded','true');
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(document, {key:'Escape'});
    await waitFor(() => expect(screen.queryByRole('navigation',{name:'Mobile navigation'})).not.toBeInTheDocument());
    expect(trigger).toHaveFocus(); expect(document.body.style.overflow).not.toBe('hidden');
  });
  it('closes search from a result with Escape and returns focus to the opener', async () => {
    render(<SearchDialog documents={documents}/>);
    const trigger=screen.getByRole('button',{name:'Open search'});trigger.focus();fireEvent.click(trigger);
    screen.getByRole('link',{name:/Update guide/}).focus();
    fireEvent.keyDown(document,{key:'Escape'});
    await waitFor(()=>expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
  it('wraps Shift+Tab from the search input to the last result', () => {
    render(<SearchDialog documents={documents}/>);
    fireEvent.click(screen.getByRole('button',{name:'Open search'}));
    screen.getByRole('textbox',{name:'Search guides'}).focus();
    fireEvent.keyDown(document,{key:'Tab',shiftKey:true});
    expect(screen.getByRole('link',{name:/Update guide/})).toHaveFocus();
  });
  it('filters results and moves keyboard focus between compact result rows and the input', () => {
    render(<SearchDialog documents={[...documents, { ...documents[0], title:'Backup guide', description:'Save before an update', slug:'backup/immich-backup' }]}/>);
    fireEvent.click(screen.getByRole('button',{name:'Open search'}));
    const input = screen.getByRole('textbox',{name:'Search guides'});
    fireEvent.change(input,{target:{value:'update'}});
    const results = screen.getAllByRole('link');
    expect(results).toHaveLength(2);
    input.focus();
    fireEvent.keyDown(input,{key:'ArrowDown'});
    expect(results[0]).toHaveFocus();
    fireEvent.keyDown(results[0],{key:'ArrowDown'});
    expect(results[1]).toHaveFocus();
    fireEvent.keyDown(results[1],{key:'ArrowUp'});
    expect(results[0]).toHaveFocus();
    fireEvent.keyDown(results[0],{key:'ArrowUp'});
    expect(input).toHaveFocus();
    fireEvent.change(input,{target:{value:'no such guide'}});
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent('0 matching guides');
  });
  it('does not claim a copy succeeded when clipboard access is unavailable', async () => {
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:undefined});
    render(<CodeBlock code="docker compose up -d" language="bash"/>);
    fireEvent.click(screen.getByRole('button',{name:/Copy/}));
    await waitFor(()=>expect(screen.getByRole('status')).toHaveTextContent(/select.*copy/i));
    expect(screen.queryByText('Copied')).not.toBeInTheDocument();
  });
});
