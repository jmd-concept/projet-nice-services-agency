"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Type definition for a service
export type Service = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  route: string;
  tags?: string[];
};

// Sample services data - replace with your actual data
const servicesData: Service[] = [
  {
    id: "consulting",
    title: "Strategic Consulting",
    description: "Data-driven insights to accelerate your business growth.",
    fullDescription:
      "Our strategic consulting service provides in-depth market analysis, competitor research, and actionable roadmaps. We work closely with your leadership team to identify opportunities, mitigate risks, and implement high-impact strategies that drive sustainable growth.",
    imageUrl: "https://picsum.photos/id/20/800/600",
    route: "/services/consulting",
    tags: ["Strategy", "Analytics", "Growth"],
  },
  {
    id: "development",
    title: "Custom Development",
    description: "Tailored software solutions for complex challenges.",
    fullDescription:
      "From full-stack web applications to mobile platforms and enterprise systems, our development team crafts robust, scalable, and maintainable solutions. We leverage modern frameworks and best practices to deliver high-performance products that align perfectly with your business needs.",
    imageUrl: "https://picsum.photos/id/26/800/600",
    route: "/services/development",
    tags: ["Web", "Mobile", "API"],
  },
  {
    id: "design",
    title: "Creative Design",
    description: "Immersive brand experiences & user-centric interfaces.",
    fullDescription:
      "Our design team creates visually stunning and intuitive interfaces that captivate users. We focus on user research, wireframing, prototyping, and visual design to build cohesive brand identities and digital products that stand out in the market.",
    imageUrl: "https://picsum.photos/id/15/800/600",
    route: "/services/design",
    tags: ["UI/UX", "Branding", "Prototyping"],
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    description: "Performance-driven campaigns that maximize ROI.",
    fullDescription:
      "We combine SEO, content marketing, social media, and paid advertising to create powerful omnichannel campaigns. Our data-oriented approach ensures every dollar spent contributes to measurable growth, increased engagement, and higher conversion rates.",
    imageUrl: "https://picsum.photos/id/0/800/600",
    route: "/services/marketing",
    tags: ["SEO", "Social", "Analytics"],
  },
  {
    id: "support",
    title: "Premium Support",
    description: "24/7 technical assistance and maintenance.",
    fullDescription:
      "Our premium support service ensures your systems run smoothly around the clock. We provide fast incident response, proactive monitoring, regular maintenance, and dedicated account managers to keep your operations seamless and secure.",
    imageUrl: "https://picsum.photos/id/82/800/600",
    route: "/services/support",
    tags: ["Maintenance", "Monitoring", "SLA"],
  },
];

export default function ServicesCarousel() {
  const [selectedService, setSelectedService] = useState<Service>(
    servicesData[0],
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to show/hide arrows
  const updateArrows = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", updateArrows);
      updateArrows();
      return () => container.removeEventListener("scroll", updateArrows);
    }
  }, []);

  // Scroll carousel to bring selected card into view
  useEffect(() => {
    const selectedCard = document.getElementById(
      `service-card-${selectedService.id}`,
    );
    if (selectedCard && carouselRef.current) {
      selectedCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedService]);

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle service selection from right panel
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-wider text-indigo-600 uppercase"
          >
            Our expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2"
          >
            Tailored <span className="text-indigo-600">Services</span> for
            <br className="hidden sm:block" /> Modern Business
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"
          />
        </div>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT PANEL: Selected service preview */}
          <div className="lg:w-1/2 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedService.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 text-indigo-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {selectedService.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {selectedService.fullDescription}
                  </p>
                  <Link
                    href={selectedService.route}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-200 group"
                  >
                    <span>Explore this service</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT PANEL: Carousel with other services */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              {/* Carousel header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                  All services
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => scrollCarousel("left")}
                    disabled={!showLeftArrow}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      showLeftArrow
                        ? "bg-white shadow-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-lg"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    aria-label="Previous services"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollCarousel("right")}
                    disabled={!showRightArrow}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      showRightArrow
                        ? "bg-white shadow-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-lg"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    aria-label="Next services"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Horizontal scrollable carousel */}
              <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-5 pb-6 scroll-smooth hide-scrollbar"
                style={{ scrollbarWidth: "thin" }}
              >
                {servicesData.map((service) => (
                  <motion.div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className={`flex-shrink-0 w-72 cursor-pointer group transition-all duration-300 ${
                      selectedService.id === service.id
                        ? "scale-[1.02]"
                        : "hover:scale-[1.01]"
                    }`}
                    onClick={() => handleSelectService(service)}
                  >
                    <div
                      className={`relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full border ${
                        selectedService.id === service.id
                          ? "border-indigo-500 ring-2 ring-indigo-200"
                          : "border-gray-100 hover:border-indigo-200"
                      }`}
                    >
                      {/* Card image */}
                      <div className="h-36 overflow-hidden relative">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {selectedService.id === service.id && (
                          <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                            Active
                          </div>
                        )}
                      </div>

                      {/* Card content */}
                      <div className="p-4">
                        <h5 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                          {service.title}
                        </h5>
                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Link
                            href={service.route}
                            onClick={(e) => e.stopPropagation()}
                            className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Details
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                          <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                            {service.tags?.[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Gradient fade on edges for better UX (optional) */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Optional: Bottom link to all services */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors border-b border-indigo-200 hover:border-indigo-600 pb-1"
          >
            <span>View all services</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: #c7d2fe;
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #818cf8;
        }
      `}</style>
    </section>
  );
}

