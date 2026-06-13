"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { FiLayout, FiSmartphone, FiGlobe, FiBox } from "react-icons/fi";

const services = [
  {
    icon: FiLayout,
    titre: "Photographie & Vidéographie",
    description:
      "Crafting intuitive interfaces that guide users effortlessly through digital journeys.",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    icon: FiSmartphone,
    titre: "Marketing Digital",
    description:
      "Responsive experiences that feel native on every device and screen size.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    icon: FiGlobe,
    titre: "Infographie & Identité Visuelle",
    description: "Logos, affiches, Flyers, Chartes graphiques, Branding",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    icon: CgWebsite,
    titre: "Création de Sites Web, application & Base de données",
    description: "Solutions digital pour numériser vos secteur d'activité",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400",
  },
  {
    icon: FiBox,
    titre: "Accompagnement des entreprises et entrepreneurs",
    description:
      "Immersive interactions that add depth and character to your brand.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=400",
  },
];

export const Services = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-25 px-6 bg-neutral-950 relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none opacity-50 dashed-border"
        style={{ borderStyle: "dashed" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none opacity-30"
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-28 grid md:grid-cols-2 gap-16 items-end">
          <div>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-mono uppercase tracking-[0.3em] text-neutral-400">
                  Professionalisme
                </span>
              </div>
              <div className="h-px w-32 bg-gradient-to-r from-white/30 to-transparent" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="ml-6 text-4xl md:text-7xl font-medium tracking-tighter leading-none"
            >
              Nos{" "}
              <span className="italic font-serif text-neutral-500">
                Services
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:pl-12 border-l border-white/10 relative"
          >
            <div className="absolute top-0 left-[-1px] h-12 w-[1px] bg-gradient-to-b from-white to-transparent" />
            <p className="text-xl md:text-2xl font-light text-neutral-300 leading-relaxed">
              Solutions pour tout vos projets digital, marketing...
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-24 group/list">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`
                  relative 
                  ${index % 2 === 1 ? "lg:mt-20" : ""} 
                  transition-all duration-500 ease-out
                  hover:!opacity-100 group-hover/list:opacity-20
                `}
            >
              {/* Editorial Decorative Corners */}
              <div className="absolute -top-5 -left-5 w-3 h-3 border-t border-l border-white/20 transition-all duration-500 group-hover:w-[calc(100%+3rem)] group-hover:h-[calc(100%+3rem)] group-hover:border-white/10 pointer-events-none" />
              <div className="absolute -bottom-6 -right-5 w-3 h-3 border-b border-r border-white/20 transition-all duration-500 group-hover:w-[calc(100%+3rem)] group-hover:h-[calc(100%+3rem)] group-hover:border-white/10 pointer-events-none" />

              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Ajustement pour que le bouton s'aligne proprement en fin de grille */}
        <div className="flex items-center justify-center lg:mt-12">
          <a
            href="#contact"
            className="rounded-md bg-amber-500 px-8 py-4 text-md font-semibold text-white shadow-xs hover:bg-amber-50 hover:text-gray-600 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-900"
          >
            Discuter de votre projet
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group overflow-hidden rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-amber-50/10 transition-all duration-500 backdrop-blur-sm"
    >
      {/* Image Wrapper avec effet zoom au survol */}
      <div className="w-full h-48 overflow-hidden relative">
        <img
          src={service.image}
          alt={service.titre}
          className="w-full h-full object-cover opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-8">
        <div className="mb-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-colors duration-500">
          <service.icon className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-medium mb-4 tracking-tight text-white">
          {service.titre}
        </h3>
        <p className="text-neutral-400 font-light leading-relaxed group-hover:text-neutral-300 transition-colors">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};
