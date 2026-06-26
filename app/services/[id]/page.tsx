"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Photographie from "@/components/service/photographie";

// 1. Définition de l'interface pour les paramètres de la route dynamique
interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ServicePageId({ params }: ServicePageProps) {
  const { id } = React.use(params);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-0 m-0 w-full min-h-screen bg-black text-white"
    >
      {id === "photo-video" ? (
        <div className="py-6">
          <HeaderId titre="Photographie & Vidéographie" contenu="" />
          <Photographie />
        </div>
      ) : id === "marketing-digital" ? (
        <div className="py-6">
          <HeaderId titre="Marketing Digital" contenu="" />

          {/* Contenu spécifique ici */}
        </div>
      ) : id === "infographie-branding" ? (
        <div className="py-6">
          <HeaderId titre="Infographie & Identité Visuelle" contenu="" />

          {/* Contenu spécifique ici */}
        </div>
      ) : id === "web-apps" ? (
        <div className="py-6">
          <HeaderId titre=" Création de Sites Web & Apps" contenu="" />

          {/* Contenu spécifique ici */}
        </div>
      ) : id === "accompagnement" ? (
        <div className="py-6">
          <HeaderId titre="Accompagnement & Formation" contenu="" />

          {/* Contenu spécifique ici */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-8 max-w-md">
            <span className="text-4xl mb-4 block">⚠️</span>
            <h2 className="text-center text-xl font-black text-orange-500 uppercase mb-2">
              Service non reconnu
            </h2>
            <p className="text-gray-400 text-sm">
              L'identifiant{" "}
              <code className="text-white font-mono bg-gray-900 px-1.5 py-0.5 rounded">
                "{id}"
              </code>{" "}
              ne correspond à aucun pôle de Nice Services Agency.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface headerItem {
  titre: string;
  contenu: string;
}

export function HeaderId({ titre, contenu }: headerItem) {
  const bgImage = "/bg-imgae-2.jpeg";

  return (
    <div className="relative py-16 text-center bg-black overflow-hidden">
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
          <h1 className="text-center text-3xl font-black text-orange-500 uppercase">
            {titre}
          </h1>
          <p className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase pt-2">
            {contenu}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
