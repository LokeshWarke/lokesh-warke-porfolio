'use client';
import { FileDown, Printer } from 'lucide-react';
export default function ResumeDownloadButton(){
  return <div className="resume-actions flex flex-wrap gap-3"><button onClick={()=>window.print()} className="inline-flex items-center gap-2 bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black"><FileDown size={16}/> Download / Save as PDF</button><a href="/" className="inline-flex items-center gap-2 border border-line px-5 py-3 text-sm text-neutral-300"><Printer size={16}/> Back to portfolio</a><p className="w-full text-xs leading-5 text-neutral-500">In the print dialog, choose “Save as PDF” as the destination. This resume is generated from the latest portfolio content.</p></div>
}
