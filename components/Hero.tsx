"use client";

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
      className="relative h-screen min-h-[700px] w-full flex items-center justify-start px-8 md:px-18 lg:px-24 bg-black text-white overflow-hidden group"
    >
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Arrière-plan agence"
          fill
          priority
          className="object-cover object-center pointer-events-none transition-transform duration-[1.5s] ease-out group-hover:scale-105"
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
          Propulsez votre <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
            Image de Marque
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl font-light leading-relaxed"
        >
          Studio créatif spécialisé dans la production visuelle de pointe, le
          marketing digital stratégique et le développement sur-mesure.
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
      </motion.div>

      {/* ROTATING BADGE (Framer Motion replacement) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 right-12 md:right-20 w-40 h-40 md:w-48 md:h-48 z-10 hidden sm:flex items-center justify-center cursor-pointer"
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
