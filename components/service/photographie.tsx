"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

interface PackItem {
  id: string;
  title: string;
  subtitle: string;
  features: string[];
  meta: string[];
  price: string;
  cta?: string;
  popular?: boolean;
}

export default function Photographie() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const packs: PackItem[] = [
    {
      id: "mariage-civil",
      title: "Mariage Civil - Pack Essentiel",
      subtitle: "Capture des moments clés de votre union avec élégance.",
      features: ["Mairie + séance photo", "30 photos retouchées"],
      meta: ["Livraison sous 3 jours", "Contactez-nous"],
      price: "150$",
    },
    {
      id: "mariage-complet",
      title: "Mariage Complet - Vidéo + Drone",
      subtitle: "Une couverture totale avec une qualité cinématographique.",
      features: [
        "Préparatifs + cérémonie + soirée",
        "Photos + vidéo HD + drone",
        "Album numérique offert",
      ],
      meta: ["Livraison sous 7 jours", "Devis personnalisé"],
      price: "1500$",
      popular: true,
    },
    {
      id: "dot-coutumier",
      title: "Dot & Coutumier",
      subtitle:
        "Immortalisez vos traditions avec un rendu authentique et professionnel.",
      features: [
        "Couverture complète",
        "Photos + vidéo",
        "Moments culturels valorisés",
      ],
      meta: ["Livraison sous 5 jours", "Réservez à l’avance"],
      price: "500$",
    },
    {
      id: "conference",
      title: "Conférence",
      subtitle:
        "Donnez vie à vos événements avec une vidéo dynamique et des photos professionnelles.",
      features: [
        "Captation vidéo HD",
        "Montage professionnel",
        "Musique + effets",
      ],
      meta: ["Livraison sous 5 jours", "Contactez-nous"],
      price: "500$",
    },
    {
      id: "festival-etranger",
      title: "Festival & International",
      subtitle: "Photos et Vidéo Événementielles en dehors de la RDC.",
      features: [
        "Captation vidéo HD",
        "Montage professionnel",
        "Photos professionnelles",
      ],
      meta: [
        "Invitation requise",
        "Billets AR pour 3 personnes à charge",
        "Livraison sous 5 jours",
        "Contactez-nous",
      ],
      price: "2500$",
    },
    {
      id: "shooting-portrait",
      title: "Shooting Portrait - Classique",
      subtitle: "Sublimez votre image avec un rendu professionnel et naturel.",
      features: [
        "1 heure de séance (studio ou extérieur)",
        "10 photos retouchées HD",
        "Aide à la pose et conseils style",
      ],
      meta: ["Livraison sous 48h (numérique)", "Réservation obligatoire"],
      price: "30$",
    },
    {
      id: "bac-5",
      title: "BAC +5 (Soutenance)",
      subtitle: "Couverture photo professionnelle – Défense de mémoire.",
      features: ["Photos HD", "Retouches incluses", "Livraison rapide"],
      meta: ["Félicitations du jury assurées"],
      price: "100$",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pack-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      id="gallerie"
      className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* En-tête Corporate */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">
            Nos Tarifs & Prestations
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            Des formules adaptées à{" "}
            <span className="text-orange-500">vos exigences</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Grille de cartes */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`pack-card flex flex-col justify-between rounded-2xl p-6 md:p-8 transition-all duration-300 relative border ${
                pack.popular
                  ? "bg-gradient-to-b from-neutral-900 to-black border-orange-500 shadow-xl shadow-orange-500/5"
                  : "bg-neutral-950 border-neutral-900 hover:border-neutral-800"
              }`}
            >
              {pack.popular && (
                <span className="absolute -top-3 right-6 bg-orange-500 text-black font-black text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                  Meilleure Vente
                </span>
              )}

              <div>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2">
                  {pack.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {pack.subtitle}
                </p>

                <hr className="border-neutral-900 mb-6" />

                <ul className="space-y-3 mb-6">
                  {pack.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-gray-200"
                    >
                      <span className="text-orange-500 font-bold flex-shrink-0">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <ul className="space-y-2 mb-8 bg-neutral-900/40 p-4 rounded-xl border border-neutral-900">
                  {pack.meta.map((metaItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-gray-400 font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                      <span>{metaItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <div className="flex flex-col mb-5">
                  {/* N'affiche "À partir de" que pour les gros packs ou montants variables */}
                  {[
                    "mariage-complet",
                    "dot-coutumier",
                    "conference",
                    "festival-etranger",
                    "bac-5",
                  ].includes(pack.id) && (
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                      À partir de
                    </span>
                  )}
                  <span className="text-3xl md:text-4xl font-black text-orange-500 font-mono">
                    {pack.price}
                  </span>
                </div>

                <button
                  onClick={() => router.push(`/contact?pack=${pack.id}`)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300 ${
                    pack.popular
                      ? "bg-orange-500 hover:bg-white text-white hover:text-black shadow-lg shadow-orange-500/10"
                      : "bg-neutral-900 hover:bg-orange-500 text-gray-300 hover:text-white border border-neutral-800 hover:border-transparent"
                  }`}
                >
                  Réserver / Demander un devis
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
