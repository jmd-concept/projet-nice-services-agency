"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { servicesData, Service } from "@/lib/constante";

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service>(
    servicesData[0],
  );

  return (
    <section
      id="services"
      className="w-full bg-black text-white py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold tracking-wider text-orange-500 uppercase bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20"
          >
            Notre Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-black mt-4 uppercase tracking-tight"
          >
            Des services pour <span className="text-orange-500">propulser</span>{" "}
            votre vision
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT: Large preview area */}
          <div className="lg:w-1/2 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: 30, rotateY: 10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl"
              >
                {/* Image with overlay gradient */}
                <div className="relative h-80 w-full overflow-hidden bg-gray-900">
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedService.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 border border-orange-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-lg uppercase tracking-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>

                {/* Description and CTA */}
                <div className="p-6 md:p-8 bg-gray-950">
                  <p className="text-gray-300 leading-relaxed mb-8 text-base md:text-lg">
                    {selectedService.fullDescription}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <Link
                      href={selectedService.route}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-white text-white hover:text-black font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/10 border border-transparent hover:border-orange-500"
                    >
                      <span>Découvrir le service</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                    <div className="text-xs font-mono text-gray-600 uppercase tracking-widest hidden sm:block">
                      // {selectedService.id}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Vertical scrollable list of services */}
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scroll">
              {servicesData.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  onClick={() => setSelectedService(service)}
                  className={`cursor-pointer rounded-xl transition-all duration-300 ${
                    selectedService.id === service.id
                      ? "bg-orange-500/10 border-l-4 border-orange-500 shadow-lg shadow-orange-500/5"
                      : "bg-gray-950/40 border border-gray-900 hover:bg-gray-900/40 hover:border-gray-800"
                  }`}
                >
                  <div className="flex p-4 gap-4 items-center">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-black text-base md:text-lg text-white truncate uppercase tracking-tight">
                          {service.title}
                        </h4>
                        {selectedService.id === service.id && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500 text-black flex-shrink-0">
                            Actif
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-1">
                          {service.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-900 text-gray-400 border border-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={service.route}
                          onClick={(e) => e.stopPropagation()}
                          className="text-orange-500 text-xs font-bold hover:text-white transition-colors flex items-center gap-1"
                        >
                          Détails →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom link */}
        <div className="text-center mt-12 pt-8 border-t border-gray-900">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 font-bold tracking-wide transition-colors uppercase text-sm"
          >
            <span>Voir tout notre catalogue</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #ea580c; /* Orange corporate (orange-600) */
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #f97316; /* orange-500 */
        }
      `}</style>
    </section>
  );
}
