"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
// ICONS
import { FaGlobeAfrica } from "react-icons/fa";
import { LiaFlagUsaSolid } from "react-icons/lia";

type Lang = {
  code: string;
  googleCode: string; // Le nom exact de la langue attendu par Google
  label: string;
  icon: React.ReactNode;
};

export default function LangueDropdown() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("FR");

  const languages: Lang[] = [
    {
      code: "FR",
      googleCode: "fr",
      label: "Français",
      icon: <FaGlobeAfrica />,
    },
    {
      code: "EN",
      googleCode: "en",
      label: "English",
      icon: <LiaFlagUsaSolid />,
    },
  ];

  const current = languages.find((l) => l.code === lang);

  // Fonction magique qui va déclencher la traduction Google sous le capot
  const changeLanguage = (googleCode: string, code: string) => {
    setLang(code);
    setOpen(false);

    // 1. On récupère le select caché ou le widget iframe injecté par Google
    const selectElem = document.querySelector(
      ".goog-te-combo",
    ) as HTMLSelectElement;
    if (selectElem) {
      selectElem.value = googleCode;
      // On déclenche l'événement "change" pour que le script Google comprenne l'action
      selectElem.dispatchEvent(new Event("change"));
    } else {
      // Alternative si le mode d'affichage SIMPLE est utilisé
      const googleFrame = document.querySelector(".goog-te-gadget-simple");
      if (googleFrame) {
        // Cette méthode simule le comportement natif si le select n'est pas dispo
        const inlineLinks = document.querySelectorAll(
          ".goog-te-menu-frame iframe",
        );
        // Note: Google translate changeant souvent d'UI, le sélecteur standard via .goog-te-combo reste le plus fiable.
      }
    }
  };

  return (
    <div className="relative inline-block">
      {/* Votre Dropdown Customisé */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3.5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-amber-100 flex items-center gap-2 hover:scale-105 transition shadow-sm"
      >
        {current?.icon}
        <span className="text-[12px] font-medium">{current?.code}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.googleCode, l.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-[12px] transition hover:bg-amber-50 dark:hover:bg-zinc-800 ${
                  lang === l.code
                    ? "text-amber-500 font-semibold"
                    : "text-gray-700 dark:text-zinc-300"
                }`}
              >
                {l.icon}
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Le Script Google Translate et son container CACHÉ (display: none ou invisible) */}
      <div id="google_translate_element" className="hidden"></div>

      <style jsx global>{`
        /* On fait disparaître tous les éléments disgracieux de Google */
        .goog-te-banner-frame.skiptranslate,
        .goog-banner-frame,
        .goog-te-gadget {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        /* Masque la petite barre de suggestion Google au survol du texte traduit */
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }
      `}</style>

      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              {
                pageLanguage: 'fr',
                includedLanguages: 'en,fr',
                autoDisplay: false
              },
              'google_translate_element'
            );
          }
        `}
      </Script>
    </div>
  );
}