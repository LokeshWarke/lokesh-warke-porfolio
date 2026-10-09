import { getPortfolioContent } from '@/lib/content';
import ResumeDownloadButton from './ResumeDownloadButton';
export const dynamic='force-dynamic';
export const metadata={title:'Resume — Lokesh Warke',description:'Current resume generated from Lokesh Warke portfolio content.'};
export default async function ResumePage(){
  const {profile,skills,projects,learning}=await getPortfolioContent();
  const social=[profile.email,profile.github,profile.linkedin].filter(Boolean);
  return <main className="min-h-screen bg-[#111] px-4 py-10 text-white sm:px-8">
    <div className="resume-actions mx-auto mb-6 max-w-4xl"><ResumeDownloadButton/></div>
    <article className="resume-sheet mx-auto max-w-4xl bg-white p-7 text-[#171717] shadow-2xl sm:p-12">
      <header className="border-b-2 border-[#222] pb-5">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
        <p className="mt-2 text-lg font-semibold">{profile.role}</p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#444]">{profile.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#333]">{social.map((item:string)=><span key={item}>{item}</span>)}<span>{profile.location}</span></div>
      </header>
      <section className="mt-6"><h2 className="resume-heading">PROFILE</h2><p className="mt-2 text-sm leading-6">{profile.philosophy}</p></section>
      <section className="mt-6"><h2 className="resume-heading">TECHNICAL SKILLS</h2><div className="mt-3 space-y-2">{Object.entries(skills).map(([group,items])=><p key={group} className="text-sm leading-5"><strong>{group}:</strong> {(items as string[]).join(', ')}</p>)}</div></section>
      <section className="mt-6"><h2 className="resume-heading">SELECTED PROJECTS</h2><div className="mt-3 space-y-5">{projects.map((project:any)=><div key={project.slug} className="resume-project"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="text-base font-bold">{project.name}</h3><span className="text-[10px] font-semibold uppercase tracking-wider text-[#555]">{project.status}</span></div><p className="mt-1 text-xs font-semibold text-[#444]">{project.type} · {(project.stack||[]).join(' / ')}</p><p className="mt-2 text-sm leading-5">{project.description}</p>{project.features?.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-5">{project.features.slice(0,4).map((feature:string)=><li key={feature}>{feature}</li>)}</ul>:null}{project.repositoryUrl ? <p className="mt-1 break-all text-xs">Repository: {project.repositoryUrl}</p>:null}{project.liveUrl ? <p className="mt-1 break-all text-xs">Live demo: {project.liveUrl}</p>:null}</div>)}</div></section>
      <section className="mt-6"><h2 className="resume-heading">CURRENT LEARNING</h2><h3 className="mt-3 text-base font-bold">{learning.title} — {learning.status}</h3><p className="mt-2 text-sm leading-5">{learning.description}</p><p className="mt-2 text-sm leading-5"><strong>Topics:</strong> {learning.topics.join(', ')}</p></section>
      <footer className="mt-8 border-t border-[#ddd] pt-3 text-[10px] text-[#666]">Generated from the latest saved portfolio content. Update the portfolio editor and revisit this page to refresh the resume.</footer>
    </article>
    <style>{`.resume-heading{font-size:12px;font-weight:800;letter-spacing:.12em;border-bottom:1px solid #bbb;padding-bottom:6px}.resume-sheet{min-height:1000px}@media print{@page{size:A4;margin:12mm}html,body{background:#fff!important}body{color:#171717!important}.resume-actions{display:none!important}.resume-sheet{max-width:none!important;min-height:0!important;margin:0!important;padding:0!important;box-shadow:none!important}.resume-project{break-inside:avoid}section{break-inside:avoid}main{background:#fff!important;padding:0!important}}`}</style>
  </main>
}
