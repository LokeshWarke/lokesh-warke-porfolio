'use client';
import { useEffect, useState } from 'react';

type Content = any;

export default function AdminPage(){
  const [password,setPassword]=useState('');
  const [content,setContent]=useState<Content|null>(null);
  const [json,setJson]=useState('');
  const [status,setStatus]=useState('');
  const [loggedIn,setLoggedIn]=useState(false);

  async function load(){
    setStatus('Loading...');
    const r=await fetch('/api/admin',{headers:{'x-admin-password':password},cache:'no-store'});
    if(!r.ok){setStatus('Invalid password or admin is not configured.');return;}
    const data=await r.json(); setContent(data); setJson(JSON.stringify(data,null,2)); setLoggedIn(true); setStatus('Loaded.');
  }
  async function save(){
    try{
      const parsed=JSON.parse(json);
      const r=await fetch('/api/admin',{method:'POST',headers:{'Content-Type':'application/json','x-admin-password':password},body:JSON.stringify(parsed)});
      if(!r.ok){setStatus('Save failed.');return;}
      setContent(parsed); setStatus('Saved. Refresh the public site to see changes.');
    }catch{setStatus('Invalid JSON. Check your edits.');}
  }
  useEffect(()=>{if(content)setJson(JSON.stringify(content,null,2));},[content]);

  return <main className="min-h-screen bg-[#050505] px-5 py-12 text-white">
    <div className="mx-auto max-w-5xl">
      <div className="mb-10"><div className="mono text-xs tracking-[.3em] text-neutral-500">LOKESH.SYS / ADMIN</div><h1 className="mt-3 text-5xl tracking-tight">Content Control</h1><p className="mt-3 max-w-2xl text-neutral-500">Edit portfolio text, training details, social links, project information, profile photo and project preview images after deployment. The /resume page reads the same saved content, so export a fresh PDF after changes. For pictures, paste a publicly accessible image URL into profile.photoUrl, learning.imageUrl, or a project imageUrl, then save. Changes are stored in Supabase, so content updates do not require redeployment.</p></div>
      {!loggedIn ? <div className="max-w-xl border border-line bg-[#090909] p-6"><label className="mono text-xs uppercase tracking-widest text-neutral-500">Admin password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load()} className="mt-3 w-full border border-line bg-black p-3 outline-none focus:border-neutral-500" placeholder="Enter ADMIN_PASSWORD"/><button onClick={load} className="mt-4 border border-neutral-600 px-5 py-3 text-xs uppercase tracking-widest hover:border-white">Unlock</button><p className="mt-4 text-xs text-neutral-600">Keep this page private and use a strong password.</p></div> : <div><div className="mb-4 flex flex-wrap gap-3"><button onClick={save} className="border border-white px-5 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-black">Save changes</button><button onClick={()=>setJson(JSON.stringify(content,null,2))} className="border border-line px-5 py-3 text-xs uppercase tracking-widest">Reset editor</button><button onClick={()=>window.open('/','_blank')} className="border border-line px-5 py-3 text-xs uppercase tracking-widest">Open portfolio</button></div><div className="mb-4 border border-line bg-[#090909] p-4 text-sm leading-6 text-neutral-400"><strong className="text-neutral-200">Picture fields:</strong> <code>profile.photoUrl</code> = profile photo · <code>learning.imageUrl</code> = AWS re/Start section image · <code>projects[n].imageUrl</code> = each project card image. Use a direct, publicly accessible image URL (for example, an image hosted in your own public storage). Leave the value as an empty string to hide that image.</div><textarea value={json} onChange={e=>setJson(e.target.value)} spellCheck={false} className="min-h-[70vh] w-full border border-line bg-[#080808] p-5 font-mono text-sm leading-6 text-neutral-300 outline-none focus:border-neutral-500"/><p className="mt-4 text-sm text-neutral-500">{status}</p></div>}
    </div>
  </main>
}
