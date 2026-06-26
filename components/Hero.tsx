"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion"; // 1. Imported Variants type
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const heroImage = "/bg-imge-1.jpeg";

  // 2. Strongly typed the variants using the Variants type
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // 3. Strongly typed itemVariants so "spring" is correctly inferred
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen min-h-[700px] w-full flex items-center justify-start lg:gap-6 px-8 md:px-18 lg:px-24 bg-black text-white overflow-hidden group"
    >
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Arrière-plan agence"
          fill
          priority
          className="object-cover object-center pointer-events-none transition-transform duration-[1.5s] ease-out group-hover:scale-119"
        />
        {/* Overlay dégradé pour garantir la lisibilité du texte à gauche */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent md:via-black/50" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* HERO CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl flex flex-col gap-6 items-start mt-12"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Nice Services <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
            Agency
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl font-light leading-relaxed"
        >
          « Nous créons votre image, nous développons votre visibilité. »
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 items-center pt-2"
        ></motion.div>

        <div className="flex items-center justify-center gap-x-6">
          <a
            href="#contact"
            className="rounded-md bg-zinc-500 px-8 py-4 text-md font-semibold text-white shadow-xs hover:bg-gray-50 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
          >
            Discuter de votre projet
          </a>
        </div>

        {/*  <div className="flex justify-center lg:justify-start gap-6 pt-4">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              10k+
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Utilisateurs
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              98%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Satisfaction
            </div>
          </div>
        </div> */}
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="absolute right-25 top-1/5 z-10"
      >
        {/** News & file d'actualité */}
        {/*<NouveauFile />*/}

      </motion.div>

      {/* ROTATING BADGE (Framer Motion replacement) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 right-12 md:right-20 w-40 h-40 md:w-42 md:h-42 z-10 hidden sm:flex items-center justify-center cursor-pointer"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="w-full h-full border border-white/10 rounded-full p-2 bg-black/20 backdrop-blur-md hover:border-amber-500/50 transition-colors duration-500"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
            />
            <text className="fill-zinc-300 text-[8.5px] uppercase tracking-[0.18em] font-mono font-medium hover:text-amber-500 transition-colors duration-300">
              <textPath href="#circlePath">
                • Création & Design • Marketing Digital • Developpement
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Point central statique pour ancrer le design */}
        <div className="absolute w-2 h-2 bg-amber-500 rounded-full opacity-60" />
      </motion.div>

      {/* SUBTLE BACKGROUND GRAIN / LINES EFFECT */}
      <div className="absolute inset-y-0 right-1/4 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}

type NewsItem = {
  id: number;
  title: string;
  date: string;
  summary: string;
  link: string;
};

const defaultNews: NewsItem[] = [
  {
    id: 1,
    title: "Lancement de notre nouvelle version 3.0",
    date: "15 juin 2026",
    summary:
      "Découvrez les fonctionnalités innovantes qui vont transformer votre expérience.",
    link: "/blog-actualite",
  },
  {
    id: 2,
    title: "Partnership avec TechCorp",
    date: "10 juin 2026",
    summary:
      "Un partenariat stratégique pour accélérer l'innovation dans le cloud.",
    link: "/blog-actualite",
  },
  {
    id: 3,
    title: "Webinaire : Les tendances 2026",
    date: "5 juin 2026",
    summary: "Inscrivez-vous gratuitement à notre prochain événement en ligne.",
    link: "/blog-actualite",
  },
  {
    id: 4,
    title: "Certification ISO 27001 obtenue",
    date: "28 mai 2026",
    summary: "Nous sommes désormais certifiés pour la sécurité de vos données.",
    link: "/blog-actualite",
  },
];

export function NouveauFile({ news = defaultNews }: { news?: NewsItem[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    /* Conteneur Principal : Effet Glassmorphism */
    <div className="max-w-md bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl rounded-2xl shadow-xl p-5 border border-white/40 dark:border-white/[0.08] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.08] pb-3 mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50"></span>
          Dernières actualités
        </h3>
        <Link
          href="/blog-actualite"
          className="text-sm text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium transition-colors"
        >
          Voir tout →
        </Link>
      </div>

      {/* Liste des actualités */}
      <div className="space-y-3">
        {news.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="block group"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Items : Effet de surbrillance type "Glass" au survol */}
            <div
              className={`p-3 rounded-xl transition-all duration-300 border border-transparent ${
                hoveredId === item.id
                  ? "bg-white/60 dark:bg-white/[0.06] border-white/60 dark:border-white/[0.1] shadow-lg shadow-black/[0.03] -translate-y-0.5"
                  : "bg-transparent"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200">
                  {item.title}
                </h4>
                <span className="text-xs text-gray-400 dark:text-slate-500 whitespace-nowrap mt-1">
                  {item.date}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
