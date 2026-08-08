"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface HeroProps {
  setIsHovered?: (value: boolean) => void;
}

export default function Hero({ setIsHovered }: HeroProps) {
  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const textSpringX = useSpring(mouseX, { stiffness: 30, damping: 25 });
  const textSpringY = useSpring(mouseY, { stiffness: 30, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 35;
      const y = (e.clientY - innerHeight / 2) / 35;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-background text-foreground overflow-hidden font-mono pt-4 pb-12 select-none border-b border-foreground/10">

      {/* DENSE MONOSPACE BACKGROUND COLUMNS (Matching reference image body text layer) */}
      <motion.div
        style={{ x: textSpringX, y: textSpringY }}
        className="absolute inset-0 px-4 md:px-8 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-35 dark:opacity-40 text-[10px] sm:text-[11px] leading-[1.3] text-justify font-mono pointer-events-none select-none tracking-tighter"
      >
        {/* Column 1 */}
        <div className="space-y-3 overflow-hidden h-full">
          <p>
            iuc acs ns onnduurrkdiitti annd gn operate instatationa design heativ imsion uurrdiittiioon feedback. Computationl d peulatysttatcod orndiittioon and wdback. Computaio it. igitaCompua cedwoondi nd works from within it. proess, ut acnetcon s from within i modele, aat, ns c etticizze t acknowledges th esthetticizee technology or revive historical to aes Thhe aim iss to enggy or revive hists it is The aim is ormaking. Tithmic, dyto enngage the present as itis structured today, algorithmic, dynamic, contingent and incomplete. Complexity is neither avoided nor simplified away. It is examined, formalized and exposed. The work seeks to reveal both coherence and failure in the systems it engages.
          </p>
          <p className="hidden sm:block">
            Con sign precedencies, asystems over artifacts. It prmputaionaldesi, teesullt iss not transformations rather than srducesinaldors reg pr ss. a finishedations r but a staties ehaioThein ineedd by shed object, but sttic ubhai.Tgi fftaa.. onn ddi g T utoms no deunneencchehheisisci m Thitomsog deuni eeeep, es tcip isi dei iti no dpii coooooonpt pprtripli It nki aes ti no pii loheeeeehhnnt pprtreline um. Ithifr s sf in dki ohennnnnnehant pparealne or medium.. th n
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-3 overflow-hidden h-full hidden md:block">
          <p>
            ecepamdeaoo ootas.ood a e lflondr df gnctz mmtttm . elaasishow adacinbl. owe C rorheeeennuuuuu mneg day oodde essiiiggocnge a Procsses nfol f uc s pprrotifins atin. Eah sttate Proceses ufold h opiinngg ion ieraton. Ech statte emergs frompre thou erraat nditenes wha follows.. eneres from reviouough y annflueces wha follows.. Chage is not a efus condeppendeenand inrd,but an inhrent Chanerty of the efect appptionsaffterwad, herent property of the system.
          </p>
          <p>
            The results of a process are provisional. Any output represents a temporary configuration shaped by input, parameters, and time. No single outcome is treated as definitive. uttional proe treatt aher than on Cotentio is plced oes a ved racion, ad A trnsform notteani berre serrinuh et. and t compa ugh ahav oobbss, roti co oug rute.Tina isiiviioobbrrtt a apr, troonou Ale otin mbd ncs s ossiiiiooo d ercton. Thepole, they are asois ttonl etntst leeiooosse o su insth ess d re omy s ieteinios e asssssst ta. sses hark Ititi s euano ssam tsssaa sugcge dritiratiertiqn in avtost eoodeaos ttssea mbnrtis s aacer
          </p>
        </div>

        {/* Column 3 */}
        <div className="space-y-3 overflow-hidden h-full hidden lg:block">
          <p>
            e lflondr df gnctz mmtttm . elaasishow adacinbl. owe o dcalt r drounz mttttiaak l atrcton,1. wd Boo ctert xlo tmn tttiiiooe s perbl iteacios,1. ow Byy ma mliee helg oittss nss, stems oppose in emaios,le w liimicler r it i toitess thbatllogic experwis remin n, . F linmits,rlyes reusedonciess that would otherwise regain , F impliic, anddeinin cenci Dynamic interaction, code as medium, and system architecture.
          </p>
          <p>
            Rules are not expressive by themselves. Their role is to establish a consistent framework within which behavior can emerge. Ambiguity appears through execution, not through vague on. iy appe aague onpputtatio reasoned structur rbioow ffy na on s in behavior ae rath A omar d s oces or state. expther t nstiibiillint m rdei es cet o ecter t co sitraapriinite iasin isoceto uccture. Te cter tth Al ic peerrmrmnt, itin eisnct uctips lebey cter tthhoon d res o rdiilluu lvv, firle car curs legio ll ttee tthhaa Render
          </p>
        </div>

        {/* Column 4 */}
        <div className="space-y-3 overflow-hidden h-full hidden lg:block">
          <p>
            unaoppe as an i rnal coditionsto inte euttaal loogicc. It mediaes how he word is trnslatduces com uurvvaablle behhavior. on tiiv funn proccesses anddetermihin omputational sstems. nging a ondditiions. c aata is not treated as abstract or neural. It originates in measurement, observation, and selecion, each shaped by technica Computational design draus input from existing conditions, including physical environments, social systems, human activity, and machine processes. These inputs situate the work within real systems rather than isolated representations. withii
          </p>
          <p>
            n which input is captured matters. Resolution, The form in w representati captured ma what the system can Thhmpling, and representation influenc. sampless and what remains inaccessib express tween extes tanslatedd is a ex ates as an interface bthe worl in tur uces operates as an diates howputat ationa systeems. nput operagic. It mmediahow co com tey n
          </p>
        </div>
      </motion.div>


      {/* GIANT DISPLAY OVERLAY WORDS (Exact positioning & typography overlap from image) */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative z-10 w-full px-4 md:px-8 pt-6 pb-16 flex flex-col justify-around min-h-[78vh] font-display font-extrabold uppercase tracking-tighter leading-[0.82] select-none text-foreground mix-blend-difference"
      >
        {/* Row 1: Code- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-start text-[clamp(4.5rem,14.5vw,13.5rem)]"
        >
          <span className="hover:text-[#ccff00] transition-colors cursor-pointer">Code-</span>
        </motion.div>

        {/* Row 2: Driven */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center md:justify-start md:pl-[22vw] text-[clamp(4.5rem,15vw,14rem)]"
        >
          <span className="hover:text-[#ccff00] transition-colors cursor-pointer">Driven</span>
        </motion.div>

        {/* Row 3: Design */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-end text-[clamp(4.5rem,14.5vw,13.5rem)] md:pr-[4vw]"
        >
          <span className="hover:text-[#ccff00] transition-colors cursor-pointer">Design</span>
        </motion.div>

        {/* Row 4: Studio  Between */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center text-[clamp(4rem,13vw,12rem)]"
        >
          <span className="hover:text-[#ccff00] transition-colors cursor-pointer">Studio</span>
          <span className="md:pr-[18vw] hover:text-[#ccff00] transition-colors cursor-pointer text-[clamp(3.8rem,11.5vw,10.5rem)]">
            Between
          </span>
        </motion.div>

        {/* Row 5: Jakarta  &  Worldwide (or Amsterdam & Athens) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end text-[clamp(3.5rem,11.5vw,11rem)] pt-2"
        >
          <span className="hover:text-[#ccff00] transition-colors cursor-pointer">Jakarta</span>
          <span className="font-mono text-base md:text-xl font-normal lowercase tracking-normal text-foreground/70 hidden lg:inline pb-4">
            (Full-Stack &amp; Creative Engineering)
          </span>
          <span className="hover:text-[#ccff00] transition-colors cursor-pointer">&amp; Worldwide</span>
        </motion.div>
      </motion.div>

      {/* BOTTOM TICKER & METADATA (Matching bottom left labels in picture) */}
      <div className="relative z-20 px-4 md:px-8 pt-4 border-t border-foreground/15 flex flex-wrap justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-wider text-foreground/70">
        <div className="flex items-center gap-6">
          <span className="font-bold text-foreground">ON COMPUTATION AS A WAY OF THINKING</span>
          <span className="hidden sm:inline opacity-40">|</span>
          <span className="hidden sm:inline">KEVIN DWI WIJAYA PORTFOLIO</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
          <span>SCROLL TO EXPLORE WORK</span>
        </div>
      </div>
    </section>
  );
}
