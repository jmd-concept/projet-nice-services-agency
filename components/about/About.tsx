"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { statsData, polesData, valeursData } from "@/lib/constanteAbout";
import { FaPlay } from "react-icons/fa";
import { IoBarChartSharp, IoRocketSharp } from "react-icons/io5";

export default function About() {
  const bgImage = "/bg-imgae-2.jpeg";

  // Variantes d'animations fluides et professionnelles
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="w-full bg-gray-100 text-black antialiased overflow-x-hidden">
      {/* 1. Zone En-tête / Hero avec Image corporative */}
      <div className="relative pt-32 pb-16 text-center bg-black overflow-hidden">
        {/* Image de fond entreprise optimisée */}
        <Image
          src={bgImage}
          alt="Nice Services Agency Corporate Background"
          fill
          priority
          className="object-cover opacity-35 object-center"
        />
        {/* Overlay de dégradé pour fusionner le noir profond et l'image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 py-8"
          >
            <span className="text-orange-500 font-bold tracking-widest uppercase text-xs md:text-sm bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">
              Qui sommes-nous ?
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase pt-2">
              À PROPOS DE NICE SERVICES AGENCY
            </h1>
          </motion.div>
        </div>
      </div>

      {/* 2. Zone Présentation Institutionnelle (Image + Texte) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bloc Gauche : Image & Bouton Vidéo */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="relative group rounded-2xl overflow-hidden shadow-2xl bg-gray-200 aspect-[4/3] border border-gray-200"
          >
            <Image
              src="/equipe/pdg-christian.JPG"
              alt="Nice Services Agency Présentation"
              fill
              priority
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
              <Link
                href="https://www.facebook.com/share/1BNgro2iai/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-orange-500 text-white rounded-full hover:bg-black hover:text-orange-500 transition-colors duration-300 shadow-xl"
              >
                <span className="absolute inset-0 rounded-full bg-orange-500/40 animate-ping group-hover:bg-black/40"></span>
                <FaPlay className="text-lg md:text-2xl translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Bloc Droite : Descriptif Institutionnel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex flex-col justify-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black leading-tight uppercase">
              Nice Services <span className="text-orange-500">Agency</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium">
              Nice Services Agency est une agence créative et digitale
              spécialisée dans la photographie, la vidéographie, le marketing
              digital, la création de sites web et la formation professionnelle.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Notre mission est d’aider les marques, les entreprises et les
              entrepreneurs à construire une image forte, développer leur
              présence numérique et atteindre leurs objectifs grâce à des
              solutions créatives, percutantes et innovantes adaptées aux
              réalités du marché.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-orange-500 hover:bg-black font-bold text-white hover:text-orange-500 rounded-xl text-center shadow-lg shadow-orange-500/10 hover:shadow-black/20 transition-all duration-300 border border-transparent hover:border-orange-500"
              >
                Discutons de votre projet
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Zone Chiffres Clés (Fond Blanc, Gris clair et Orange) */}
      <div className="bg-white border-y border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
          >
            {statsData.map((stat) => (
              <motion.div
                key={stat.id}
                variants={fadeInUp}
                className="flex flex-col items-center justify-center space-y-2 group"
              >
                <div className="text-orange-500 text-2xl bg-gray-100 group-hover:bg-black group-hover:text-orange-500 p-3 rounded-xl mb-1 flex items-center justify-center w-12 h-12 transition-colors duration-300">
                  {stat.icon}
                </div>

                <span className="block text-3xl md:text-4xl font-black text-black tracking-tight">
                  {stat.value}
                </span>

                <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
                  {stat.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 4. Section Objectifs Structurés (Mission & Vision) */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Carte Mission */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300 shadow-inner">
                <IoRocketSharp className="text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-black mb-4 tracking-wide uppercase">
                NOTRE MISSION
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Accompagner les entreprises, les organisations et les
                particuliers dans leur développement grâce à des solutions
                innovantes en photographie, vidéographie, marketing digital,
                création de sites web et formation professionnelle, afin de
                renforcer leur image, leur visibilité et leur performance.
              </p>
            </motion.div>

            {/* Carte Vision */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-200 hover:border-orange-500/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-black text-orange-500 group-hover:bg-orange-500 group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300 shadow-inner">
                <IoBarChartSharp className="text-2xl" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-black mb-4 tracking-wide uppercase">
                NOTRE VISION
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Devenir l’agence de référence en Afrique dans les domaines de la
                communication visuelle, du digital et de la formation, en
                transformant les idées en opportunités et les projets en succès
                durables.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 5. Les Quatre Pôles de l'Agence */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-18 py-20 bg-gray-200/60 border-t border-gray-200">
        <div className="text-center mb-14 space-y-2">
          <span className="text-orange-500 font-bold tracking-wider uppercase text-xs bg-white px-3 py-1 rounded-md border border-gray-200">
            Écosystème
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight">
            Les quatre pôles de l’agence
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {polesData.map((pole, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white p-6 rounded-2xl shadow-md border border-transparent hover:border-orange-500 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gray-100 text-black group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  {pole.icon}
                </div>
                <h4 className="text-lg font-black text-black mb-4 tracking-tight group-hover:text-orange-500 transition-colors uppercase">
                  {pole.title}
                </h4>
                <ul className="space-y-2.5">
                  {pole.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-2 text-gray-700 text-sm leading-snug"
                    >
                      <span className="text-orange-500 font-extrabold mt-0.5 flex-shrink-0">
                        •
                      </span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 6. Section Valeurs (Thème sombre - Noir, Gris et Orange) */}
      <div className="bg-black text-white py-20 md:py-28 border-t border-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm bg-gray-900 px-3 py-1 rounded-md border border-gray-800">
              ADN
            </span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Nos Valeurs Fondamentales
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {valeursData.map((valeur, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-gray-950/60 p-6 rounded-xl border border-gray-950/80 hover:border-orange-500/40 transition-all duration-300 space-y-3 shadow-lg group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-black px-2 py-0.5 rounded text-orange-500 font-black transition-colors duration-300">
                    0{idx + 1}
                  </span>
                  <h4 className="font-black text-white tracking-wide uppercase text-sm group-hover:text-orange-500 transition-colors">
                    {valeur.name}
                  </h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-8 group-hover:text-gray-300 transition-colors">
                  {valeur.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
