("use client");

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
//ICONS
import { FaGlobeAfrica } from "react-icons/fa";
import { LiaFlagUsaSolid } from "react-icons/lia";

type Lang = {
  code: string;
  label: string;
  icon: React.ReactNode;
};

export default function LangueDropdown() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("FR");

  const languages: Lang[] = [
    {
      code: "FR",
      label: "Français",
      icon: <FaGlobeAfrica />,
    },
    {
      code: "EN",
      label: "English",
      icon: <LiaFlagUsaSolid />,
    },
  ];

  const current = languages.find((l) => l.code === lang);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3.5 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-amber-100 flex items-center gap-2 hover:scale-105 transition"
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
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden"
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-[12px] transition hover:bg-amber-50 dark:hover:bg-zinc-800 ${
                  lang === l.code ? "text-amber-500 font-semibold" : ""
                }`}
              >
                {l.icon}
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

("use client");

import Script from "next/script";

const GoogleTranslate = () => {
  return (
    <>
      <style jsx global>{`
        /* Supprime la bannière Google en haut de page */
        .goog-te-banner-frame.skiptranslate,
        .goog-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }

        /* Design moderne pour le bouton de traduction */
        .goog-te-gadget-simple {
          background-color: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          padding: 6px 12px !important;
          border-radius: 6px !important;
          font-family: inherit !important;
          font-size: 14px !important;
          display: inline-flex !important;
          align-items: center !important;
          transition: all 0.2s ease;
        }

        .goog-te-gadget-simple:hover {
          border-color: #cbd5e1 !important;
          background-color: #f8fafc !important;
          cursor: pointer;
        }

        .goog-te-gadget-simple span {
          color: #334155 !important;
        }

        /* Masque le logo Google */
        .goog-te-gadget-icon {
          display: none !important;
        }

        /* Masque la flèche de fin par défaut */
        .goog-te-menu-value span:last-child {
          display: none !important;
        }
      `}</style>

      {/* Conteneur dans le flux normal (Flexbox / Inline) */}
      <div
        id="google_translate_element"
        className="flex items-center justify-center min-h-[38px]"
      ></div>

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
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              },
              'google_translate_element'
            );
          }
        `}
      </Script>
    </>
  );
};

export default GoogleTranslate;
