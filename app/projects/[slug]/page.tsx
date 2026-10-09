import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Globe, Layers3 } from 'lucide-react';
import { getPortfolioContent } from '@/lib/content';

export const dynamic = 'force-dynamic';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { projects } = await getPortfolioContent();
  const p = projects.find((x: any) => x.slug === params.slug) as any;
  if (!p) return notFound();

  const repoUrl = p.repositoryUrl || '';
  const liveUrl = p.liveUrl || '';
  const features: string[] = Array.isArray(p.features) ? p.features : [];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <Link href="/#work" className="inline-flex items-center gap-2 mono text-xs text-neutral-500 hover:text-white"><ArrowLeft size={14} /> back to work</Link>
        <div className="mt-20">
          {p.imageUrl ? <img src={p.imageUrl} alt={`${p.name} preview`} className="mb-10 max-h-[28rem] w-full border border-line object-cover" /> : null}
          <div className="mono text-xs tracking-[.25em] text-neutral-600">{p.type}</div>
          <div className="mt-4 flex flex-wrap items-center gap-3"><h1 className="text-5xl font-semibold tracking-tight md:text-8xl">{p.name}</h1><span className="border border-line px-3 py-2 mono text-[10px] tracking-widest text-neutral-500">{p.status}</span></div>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-neutral-400">{p.description}</p>
          {p.overview ? <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-500">{p.overview}</p> : null}
          <div className="mt-8 flex flex-wrap gap-2">{p.stack.map((s: string) => <span className="border border-line px-3 py-2 text-xs text-neutral-400" key={s}>{s}</span>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {repoUrl ? <a href={repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-neutral-700 px-5 py-3 text-xs uppercase tracking-widest hover:border-white"><Github size={14} /> GitHub <ExternalLink size={14} /></a> : <span className="inline-flex items-center gap-2 border border-line px-5 py-3 mono text-[10px] tracking-widest text-neutral-600"><Github size={14} /> REPOSITORY LINK COMING SOON</span>}
            {liveUrl ? <a href={liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-neutral-700 px-5 py-3 text-xs uppercase tracking-widest hover:border-white"><Globe size={14} /> Live demo <ExternalLink size={14} /></a> : <span className="inline-flex items-center gap-2 border border-line px-5 py-3 mono text-[10px] tracking-widest text-neutral-600"><Globe size={14} /> LIVE DEMO PLANNED</span>}
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <section className="border border-line p-7"><div className="mono text-xs text-neutral-600">01 / THE PROBLEM</div><h2 className="mt-5 text-2xl">Why this project?</h2><p className="mt-4 text-base leading-7 text-neutral-400">{p.problem || 'Project problem statement will be added as the project evolves.'}</p></section>
          <section className="border border-line p-7"><div className="mono text-xs text-neutral-600">02 / THE APPROACH</div><h2 className="mt-5 text-2xl">How it works</h2><p className="mt-4 text-base leading-7 text-neutral-400">{p.solution || 'Implementation details will be updated as the project evolves.'}</p></section>
          {features.length > 0 ? <section className="border border-line p-7 md:col-span-2"><div className="mono text-xs text-neutral-600">03 / KEY CAPABILITIES</div><h2 className="mt-5 flex items-center gap-3 text-2xl"><Layers3 size={20} /> Planned features</h2><ul className="mt-6 grid gap-3 sm:grid-cols-2">{features.map((feature, i) => <li key={feature} className="border border-line bg-[#080808] p-4 text-sm leading-6 text-neutral-400"><span className="mr-3 accent">{String(i + 1).padStart(2, '0')}</span>{feature}</li>)}</ul></section> : null}
          <section className="border border-line p-7 md:col-span-2"><div className="mono text-xs text-neutral-600">04 / ARCHITECTURE</div><h2 className="mt-5 text-2xl">System overview</h2><p className="mt-4 text-base leading-7 text-neutral-400">{p.architecture || 'Architecture details will be added as implementation is finalized.'}</p></section>
          <section className="border border-line p-7 md:col-span-2"><div className="mono text-xs text-neutral-600">05 / DEPLOYMENT ROADMAP</div><h2 className="mt-5 text-2xl">Designed for a future live demo</h2><p className="mt-4 text-base leading-7 text-neutral-400">{p.deploymentPlan || 'Deployment steps will be documented as the project approaches release.'}</p><p className="mt-5 mono text-[10px] leading-6 tracking-widest text-neutral-600">STATUS: NOT PUBLICLY DEPLOYED YET — LINKS WILL BE ADDED WHEN READY</p></section>
        </div>
      </div>
    </main>
  );
}
