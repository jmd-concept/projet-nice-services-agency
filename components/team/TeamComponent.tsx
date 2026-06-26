"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { teamData, TeamMember } from "@/lib/constante";
import { motion, Variants, AnimatePresence } from "framer-motion";

interface TeamCardProps {
  member: TeamMember;
}

interface TeamCardOpenProps {
  member: TeamMember;
  onClose: () => void;
}

// Parent container animation logic (Stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 },
  },
};

export default function TeamComponent() {
  return (
    <section className="py-24 bg-zinc-50/50 dark:bg-zinc-950/40 px-4 sm:px-6 lg:px-8 intersection-observer-context">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">
            Esprits Créatifs
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight sm:text-4xl">
            Rencontrez Notre Équipe
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-base sm:text-lg">
            Des experts passionnés dévoués à la transformation et à la
            valorisation de votre image de marque.
          </p>
        </div>

        {/* Grille animée */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {teamData.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export const TeamCard = ({ member }: TeamCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { image, nom, domaine, reseaux } = member;

  return (
    <>
      <motion.div
        variants={cardFadeUp}
        whileHover={{ y: -6 }}
        className="w-full flex"
      >
        <div className="w-full bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-center group dashboard-glass">
          <div className="w-full text-center">
            {/* Conteneur Image avec cercle d'accentuation */}
            <div className="relative w-44 h-44 mx-auto overflow-hidden rounded-full p-1 bg-gradient-to-tr from-amber-500/20 to-transparent group-hover:from-amber-500 transition-colors duration-500">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full h-full relative rounded-full overflow-hidden block focus:outline-none bg-zinc-100 dark:bg-zinc-800"
              >
                <Image
                  src={image}
                  alt={nom}
                  fill
                  sizes="176px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            </div>

            {/* Infos du membre */}
            <div className="mt-5 space-y-1">
              <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                <button
                  onClick={() => setIsOpen(true)}
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors focus:outline-none"
                >
                  {nom}
                </button>
              </h4>
              <p className="text-zinc-400 dark:text-zinc-500 text-sm font-medium">
                {domaine}
              </p>
            </div>
          </div>

          {/* Liens réseaux sociaux (Icônes SVG natives et épurées) */}
          <ul className="flex justify-center space-x-4 text-zinc-400 dark:text-zinc-500 mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 w-full">
            <li>
              <Link
                href={reseaux[0] || "#"}
                aria-label="Facebook"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block p-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href={reseaux[1] || "#"}
                aria-label="LinkedIn"
                className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors block p-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Rendu géré par AnimatePresence pour une fermeture animée propre */}
      <AnimatePresence>
        {isOpen && (
          <TeamCardOpen member={member} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export const TeamCardOpen = ({ member, onClose }: TeamCardOpenProps) => {
  const { image, nom, domaine, reseaux } = member;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 z-[1001] flex items-center justify-center p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 relative shadow-2xl border border-zinc-100 dark:border-zinc-800"
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Profil Modale */}
        <div className="relative w-48 h-48 mx-auto overflow-hidden rounded-full border-4 border-amber-500/10 mt-4">
          <Image
            src={image}
            alt={nom}
            fill
            sizes="192px"
            className="object-cover"
          />
        </div>

        <div className="text-center mt-6">
          <h5 className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {nom}
          </h5>
          <p className="text-amber-500 dark:text-amber-400 font-semibold text-sm mt-1">
            {domaine}
          </p>

          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-4 leading-relaxed max-w-xs mx-auto">
            Expert dédié à l'accompagnement stratégique et technique des projets
            de l'agence pour garantir des livrables d'une qualité optimale.
          </p>

          <ul className="flex justify-center space-x-5 text-zinc-400 dark:text-zinc-500 border-t pt-5 border-zinc-100 dark:border-zinc-800/80 mt-6 w-full">
            <li>
              <Link
                href={reseaux[0] || "#"}
                aria-label="Facebook"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors block p-1 text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href={reseaux[1] || "#"}
                aria-label="LinkedIn"
                className="hover:text-sky-700 dark:hover:text-sky-400 transition-colors block p-1 text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};
