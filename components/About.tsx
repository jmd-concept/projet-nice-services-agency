'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
// Importation des icônes depuis react-icons
import { FaPlay, FaRegCheckCircle, FaChevronRight } from "react-icons/fa";
import { IoBarChartSharp, IoRocketSharp, IoShieldCheckmarkSharp } from "react-icons/io5";

export default function About() {
    // Variantes d'animation pour le défilement
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    return (
      <motion.div>
        <div className="w-full bg-gray-50 text-gray-950 antialiased overflow-x-hidden">
          {/* 1. Zone En-tête / Breadcrumb */}
          <div className="relative bg-gradient-to-r from-indigo-950 to-black py-20 text-center">
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Qui sommes-nous ?
                </h3>
              </motion.div>
            </div>
          </div>

          {/* 2. Zone À Propos (Image + Texte) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Bloc Gauche : Image & Bouton Vidéo */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="relative group rounded-2xl overflow-hidden shadow-2xl bg-gray-200 aspect-[4/3]"
              >
                <Image
                  src="equipe/pdg-christian.JPG"
                  alt="Logo N.Services Agence"
                  fill
                  priority
                  className="object-contain transition-transform duration-[1.5s]"
                />

                {/* Bouton Vidéo avec effet d'onde pulsante */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg group"
                  >
                    <span className="absolute inset-0 rounded-full bg-blue-600/40 animate-ping"></span>
                    <FaPlay className="text-lg md:text-2xl translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>

              {/* Bloc Droite : Descriptif de l'entreprise */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="flex flex-col justify-center space-y-6"
              >
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                  N-Services Agency est une agence créative spécialisée dans la
                  production audiovisuelle, la photographie professionnelle, le
                  marketing digital, le design graphique et la communication
                  visuelle.
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  N.Pictures est un espace de création, de collaboration et de
                  développement dédié aux talents du secteur visuel. Il
                  développement dédié aux talents du secteur visuel. Il
                  rassemble photographes, vidéastes, graphistes, designers,
                  créateurs de contenu et autres professionnels de l’image
                  autour d’une vision commune : promouvoir l’excellence créative
                  et l’innovation.
                </p>

                <Link
                  href="/about"
                  className="px-6 py-3 bg-amber-500 text-lg text-white rounded-2xl text-center"
                >
                  Voir plus
                </Link>
              </motion.div>
            </div>
          </div>

          {/* 3. Section Caractéristiques (Mission, Vision, Expérience) */}
          <div className="bg-gray-100 border-t border-b border-gray-200 py-16 md:py-18">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {/* Carte Mission */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <IoBarChartSharp className="text-xl" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    NOTRE VISION
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    Devenir une référence incontournable dans l’industrie
                    créative en Afrique en offrant des solutions visuelles qui
                    inspirent, captivent et génèrent de la valeur.
                  </p>
                </motion.div>

                {/* Carte Vision */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <IoRocketSharp className="text-xl" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    NOS VALEURS
                  </h4>
                  <div className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    <ul className="space-y-2 pt-2 gap-2 grid grid-cols-2">
                      {[
                        "Excellence",
                        "Créativité",
                        "Professionnalisme",
                        "Satisfatction client",
                        "Esprit de collaboratoin",
                        "Innovation",
                        "Intégrité",
                      ].map((text, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-3 leading-relaxed text-gray-700 text-sm"
                        >
                          {" "}
                          <span className="flex-shrink-0 text-amber-500 mt-1">
                            <FaRegCheckCircle className="text-base" />
                          </span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Carte Expérience */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                    <IoShieldCheckmarkSharp className="text-xl" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    NOTRE EXPERIENCE
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    The phrasal sequence of the Lorem Ipsum text is now so
                    widespread and commonplace that many DTP programme
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
}

