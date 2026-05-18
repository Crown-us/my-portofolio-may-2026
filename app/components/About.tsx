"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

import { resumeData as resume } from "@/lib/resume";

export default function About() {
  const { basics, skills, education } = resume;

  return (
    <section id="about" className="px-6 py-24 border-t-2 border-foreground bg-background text-foreground overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-7">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              className="font-body text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 block opacity-50"
            >
              Who is Kevin?
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-[0.9] mb-8 md:mb-12 uppercase hover-weight cursor-default"
            >
              {basics.summary}
            </motion.h2>
            <div className="space-y-6 font-body text-base md:text-xl leading-relaxed max-w-2xl opacity-70">
              <p>
                Berbasis di {basics.location.city}, {basics.location.countryCode}, saya fokus pada pembuatan aplikasi mobile dan web yang tidak hanya berfungsi dengan baik, tapi juga memiliki karakter yang kuat.
              </p>
              <p>
                Lulusan {education[0].institution} dengan spesialisasi {education[0].area}. Saya membantu brand dan individu membangun kehadiran digital yang unik dan berkesan.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col justify-center lg:justify-end mt-8 lg:mt-0">
            <Magnetic>
              <div className="border-2 border-foreground p-0 bg-background brutalist-shadow relative overflow-hidden group cursor-none">
                {/* Card Header/ID Ribbon */}
                <div className="bg-foreground text-background py-2 px-4 flex justify-between items-center">
                  <span className="font-display text-[10px] font-bold tracking-widest">ID CARD // REV.2026</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-background/20" />
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row gap-6 mb-8">
                    {/* Photo inside ID Card */}
                    <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-foreground bg-foreground relative overflow-hidden flex-shrink-0 mx-auto sm:mx-0">
                      <img 
                        src="/images/kevin-profile.png" 
                        alt={basics.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                      />
                    </div>
                    <div className="flex flex-col justify-center text-center sm:text-left">
                      <h3 className="font-display text-2xl md:text-3xl font-black leading-none mb-2">{basics.name.split(' ')[0]}</h3>
                      <p className="font-body text-[10px] font-bold opacity-50 tracking-tighter uppercase mb-4">{basics.label}</p>
                      <div className="inline-block self-center sm:self-start bg-accent text-black text-[8px] font-black px-2 py-1 rotate-3 uppercase">
                        {basics.location.city} // ID
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-foreground pt-6">
                    <h4 className="font-display text-xs font-bold mb-4 uppercase tracking-tighter opacity-40">Core Expertise</h4>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 font-body text-[10px] font-bold uppercase tracking-wider">
                      {skills.slice(0, 4).map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rotate-45" /> {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative Stamp */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-accent/30 rounded-full flex items-center justify-center rotate-12 pointer-events-none group-hover:rotate-45 transition-transform duration-700">
                  <span className="text-accent/30 font-display text-[8px] font-black text-center uppercase tracking-tighter">Original <br /> Character</span>
                </div>
              </div>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
