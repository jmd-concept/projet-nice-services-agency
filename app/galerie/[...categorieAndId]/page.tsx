"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiArrowLeft, FiCalendar, FiTag, FiShare2 } from "react-icons/fi";
import { galerieItems } from "@/lib/constante";

export default function GalerieItemDetailPage() {
  const params = useParams();
  const router = useRouter();

  const segments = params.categoryAndId as string[];

  const isDirectId = segments?.length === 1;
  const currentId = isDirectId ? segments[0] : segments?.[1];
  const currentCategory = isDirectId ? "Général" : segments?.[0];

  const item = galerieItems.find((g) => g.id === currentId);

  if (!item) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-light tracking-tight text-neutral-400 mb-4">
          Contenu introuvable
        </h2>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm"
        >
          <FiArrowLeft /> Retour à la galerie
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white relative overflow-hidden flex items-center justify-center py-20 px-4 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-neutral-400 hover:text-white mb-12 transition-colors duration-300 font-mono text-sm tracking-widest uppercase"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Retour
        </motion.button>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Section Visuelle avec Next.js Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 relative group"
          >
            <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-white/20" />
            <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-white/20" />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-3">
              {/* Le conteneur définit le ratio fluide de l'image */}
              <div className="relative overflow-hidden rounded-xl h-[450px] md:h-[600px] w-full">
                <Image
                  src={item.img}
                  alt={`Réalisation JMD - ${currentCategory}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                  priority
                />
                <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Section Métadonnées */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono tracking-widest uppercase">
                {currentCategory}
              </span>
              <span className="text-neutral-600 font-mono text-xs">
                #0{item.id}
              </span>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-4">
                Projet{" "}
                <span className="italic font-serif text-neutral-400">
                  Premium
                </span>
              </h1>
              <p className="text-neutral-400 font-light leading-relaxed">
                Une réalisation exclusive signée JMD Group, mettant en valeur
                l'excellence de nos services et l'accompagnement sur-mesure de
                nos partenaires.
              </p>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-6 font-light text-sm">
              <div className="flex items-center gap-3 text-neutral-400">
                <FiTag className="text-amber-500 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-500 font-mono uppercase">
                    Secteur
                  </p>
                  <p className="text-white capitalize">{currentCategory}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <FiCalendar className="text-amber-500 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-500 font-mono uppercase">
                    Année
                  </p>
                  <p className="text-white">2026</p>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg"
              >
                Lancer un projet similaire
              </a>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 text-white transition-all duration-300 flex items-center justify-center group"
                title="Copier le lien"
              >
                <FiShare2 className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
