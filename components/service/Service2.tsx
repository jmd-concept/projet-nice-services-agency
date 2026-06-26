"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FiArrowUpRight, 
  FiShield, 
  FiZap, 
  FiTarget, 
  FiBarChart2, 
  FiChevronLeft, 
  FiChevronRight 
} from "react-icons/fi";

// Définition de la structure des données de vos services
interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  route: string;
  icon: React.ElementType;
  tag: string;
  stats: string;
  statsLabel: string;
}

const servicesData: Service[] = [
  {
    id: "01",
    title: "Stratégie & Conseil Digital",
    shortDescription:
      "Accélérez votre croissance grâce à une feuille de route technologique sur-mesure.",
    fullDescription:
      "Nous analysons votre écosystème pour concevoir des stratégies digitales orientées ROI. Optimisez vos processus, identifiez de nouveaux leviers de croissance et devancez la concurrence grâce à notre expertise sectorielle.",
    route: "/services/strategie-conseil",
    icon: FiTarget,
    tag: "Business",
    stats: "+45%",
    statsLabel: "Croissance moyenne",
  },
  {
    id: "02",
    title: "Développement Web & Mobile",
    shortDescription:
      "Des architectures robustes, scalables et centrées sur l'expérience utilisateur.",
    fullDescription:
      "Du MVP à l'application d'entreprise à grande échelle. Nous maîtrisons les technologies les plus modernes (Next.js, Node, Cloud) pour livrer des interfaces d'une fluidité absolue et hautement sécurisées.",
    route: "/services/developpement",
    icon: FiZap,
    tag: "Engineering",
    stats: "< 1s",
    statsLabel: "Temps de chargement",
  },
  {
    id: "03",
    title: "Data Analytics & IA",
    shortDescription:
      "Transformez vos données brutes en décisions stratégiques automatisées.",
    fullDescription:
      "Exploitez la puissance de l'Intelligence Artificielle et du Machine Learning. Nous mettons en place des tableaux de bord prédictifs et des algorithmes d'automatisation pour maximiser votre efficacité opérationnelle.",
    route: "/services/data-ia",
    icon: FiBarChart2,
    tag: "Intelligence",
    stats: "10x",
    statsLabel: "Plus de valeur extraite",
  },
  {
    id: "04",
    title: "Cybersécurité & Cloud",
    shortDescription:
      "Sécurisez vos actifs numériques et migrez vers une infrastructure résiliente.",
    fullDescription:
      "Protégez vos données sensibles contre les menaces modernes. Nos experts conçoivent des architectures Cloud (AWS/GCP) hautement disponibles, conformes aux normes de sécurité les plus strictes.",
    route: "/services/cybersecurite",
    icon: FiShield,
    tag: "Sécurité",
    stats: "99.99%",
    statsLabel: "Disponibilité Cloud",
  },
];

export default function Services1() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = servicesData[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % servicesData.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + servicesData.length) % servicesData.length,
    );
  };

  return (
    <section className="w-full min-h-screen bg-slate-950 text-slate-100 py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center font-sans">
      <div className="max-w-7xl mx-auto w-full">
        {/* En-tête */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm block mb-3">
            Notre Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Des services conçus pour propulser votre entreprise.
          </h2>
        </div>

        {/* Grille Principale */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* PANNEAU GAUCHE : Preview du service sélectionné (5 colonnes) */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-2xl transition-all duration-500 ease-in-out group">
            {/* Effet lumineux en arrière-plan */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700" />

            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="text-xs font-medium uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {activeService.tag}
                </span>
                <span className="text-5xl font-extrabold text-slate-800 select-none">
                  {activeService.id}
                </span>
              </div>

              {/* Contenu textuel animé via clé d'état */}
              <div
                key={activeService.id}
                className="animate-[fadeIn_0.4s_ease-out]"
              >
                <activeService.icon className="text-5xl text-emerald-400 mb-6" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                  {activeService.fullDescription}
                </p>
              </div>
            </div>

            {/* Zone de bas de carte : Statistique + Bouton d'action */}
            <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div
                key={`stats-${activeService.id}`}
                className="animate-[fadeIn_0.5s_ease-out]"
              >
                <div className="text-3xl font-bold text-white tracking-tight">
                  {activeService.stats}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  {activeService.statsLabel}
                </div>
              </div>

              <Link
                href={activeService.route}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95 group/btn self-start sm:self-auto"
              >
                Découvrir l'offre
                <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* PANNEAU DROIT : Liste des autres services (7 colonnes) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Wrapper de la liste de cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {servicesData.map((service, index) => {
                const IsActive = index === activeIndex;
                const IconComponent = service.icon;

                return (
                  <div
                    key={service.id}
                    onClick={() => setActiveIndex(index)}
                    className={`cursor-pointer text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                      IsActive
                        ? "bg-gradient-to-r from-slate-900 to-slate-800/50 border-emerald-500/40 shadow-md shadow-emerald-950/20"
                        : "bg-slate-900/30 hover:bg-slate-900/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-5 mr-4">
                      <div
                        className={`p-3 rounded-xl transition-colors duration-300 shrink-0 ${
                          IsActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        <IconComponent className="text-2xl" />
                      </div>
                      <div>
                        <h4
                          className={`font-semibold transition-colors duration-200 ${
                            IsActive
                              ? "text-emerald-400"
                              : "text-white group-hover:text-emerald-300"
                          }`}
                        >
                          {service.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 max-w-md">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Lien direct de la route en icône discrète */}
                    <Link
                      href={service.route}
                      onClick={(e) => e.stopPropagation()} // Évite de trigger le setActiveIndex du parent
                      className={`p-2 rounded-lg border transition-all duration-300 ${
                        IsActive
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950"
                          : "bg-slate-800/50 text-slate-500 border-transparent hover:border-slate-600 hover:text-slate-300"
                      }`}
                      title={`Voir la page ${service.title}`}
                    >
                      <FiArrowUpRight className="text-base" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Boutons de Navigation de Contrôle */}
            <div className="flex items-center justify-end gap-3 mt-4 lg:mt-0">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all active:scale-95"
                aria-label="Service précédent"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all active:scale-95"
                aria-label="Service suivant"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
