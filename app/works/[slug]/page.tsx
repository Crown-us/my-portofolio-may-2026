import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import s from "../../portfolio.module.css";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  return <main className={s.page}><header className={s.header}><Link href="/" className={s.brand}><Image src="/kevin-mark.svg" alt="" width={44} height={44} className={s.brandMark} priority/><span>kevin<span className={s.brandLight}> / portfolio</span></span></Link><Link href="/about#contact" className={s.button}>Get in touch <ArrowUpRight size={16}/></Link></header><div className={s.detail}><Link href="/projects" className={s.back}><ArrowLeft size={17}/> Back to projects</Link><div className={s.detailHead}><div><h1>{project.title}</h1><p>{project.category} · {project.year}</p></div><div className={s.detailActions}><a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={s.button}>Live demo <ArrowUpRight size={16}/></a><a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={s.button}>GitHub <ArrowUpRight size={16}/></a></div></div><Image className={s.detailImage} src={project.image} alt={`${project.title} website`} width={1440} height={900} sizes="(max-width:700px) 90vw, 900px" priority/><div className={s.detailGrid}><section><h2>About this project</h2><p>{project.description}</p><h2 style={{marginTop:30}}>My contribution</h2><ul>{project.services.map(service=><li key={service}>{service}</li>)}</ul></section><section><h2>Built with</h2><div className={s.tags}>{project.tech.map(tech=><span key={tech}>{tech}</span>)}</div><h2>More to explore</h2>{projects.filter(p=>p.slug!==slug).map(p=><p key={p.id}><Link href={`/works/${p.slug}`} className={s.textLink}>{p.title} <ArrowUpRight size={14}/></Link></p>)}</section></div></div></main>;
}
