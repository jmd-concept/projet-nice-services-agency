"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallerie from "@/components/Galerie";
import Team from "@/components/Team";
import Services from "@/components/Services";
import BlogActualite from "@/components/BlogActualite";
import AvisClient from "@/components/AvisClient";
import ContactForm from "@/components/ContactForm";
import Footer from "../components/Footer";
import { detecteConnexionInternet } from "@/utils/utils";

const Preloader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    className="fixed inset-0 z-999 bg-black flex items-center justify-center text-amber-500"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
        N.SERVICES AGENCY
      </h1>
      <p className="text-start text-md">PROFESIONALISME</p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
        className="h-px bg-black/20 w-32"
      />
    </motion.div>
  </motion.div>
);

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Extract the hash from the window object safely inside useEffect
    const hash = window.location.hash;

    if (hash) {
      setTimeout(() => {
        try {
          // Use decodeURIComponent in case your hash contains special formatting
          const element = document.querySelector(decodeURIComponent(hash));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } catch (error) {
          console.warn("Invalid selector from hash:", hash, error);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]); // Monitored via pathname transitions

  return null;
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const togglePanel = () => setIsOpenPanel((prev) => !prev);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

    if (hasLoadedBefore) {
      // Si l'utilisateur a déjà vu le preloader pendant cette session, on le passe immédiatement
      setLoading(false);
      detecteConnexionInternet();
    } else {
      // Sinon, c'est sa première visite de session : on lance le timer de 2s
      const timer = setTimeout(() => {
        sessionStorage.setItem("hasLoadedBefore", "true");
        setLoading(false);
        detecteConnexionInternet();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <NavBar />
          <Hero />
          <About />
          <Services />
          <Gallerie />
          <AvisClient />
          <Team />

          <BlogActualite />
          <ContactForm togglePanel={togglePanel} />
          <Footer />
        </>
      )}
    </div>
  );
}
