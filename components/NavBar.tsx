"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LangueToggle from "./LangueToggle";
import { usePathname } from "next/navigation";
import ContactForm from "./ContactForm";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

type NavItem = {
  href?: string;
  label: string;
  onClick?: () => void;
  dropdown?: {
    href: string;
    label: string;
  }[];
};

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null,
  );
  const menuRef = useRef<HTMLDivElement>(null);

  const togglePanel = () => {
    setIsOpenPanel((prev) => !prev);
    setIsMobileMenuOpen(false); // Ferme le menu mobile si on ouvre le contact
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Fermer le menu mobile lors d'un changement de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(null);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const linkNav: NavItem[] = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "L'agence" },
    {
      href: "#services",
      label: "Services",
      dropdown: [
        { href: "/services/photo-video", label: "Photographie & Vidéographie" },
        { href: "/services/marketing-digital", label: "Marketing Digital" },
        {
          href: "/services/infographie-branding",
          label: "Infographie & Identité Visuelle",
        },
        {
          href: "/services/web-apps",
          label: "Création de Sites Web, App & BD",
        },
        {
          href: "/services/accompagnement",
          label: "Accompagnement des Entreprise",
        },
      ],
    },
    {
      href: "#galerie",
      label: "N.pictures",
      dropdown: [
        { href: "/galerie/photographie", label: "Photographie" },
        { href: "/galerie/videographie", label: "Vidéographie" },
        { href: "/galerie/branding", label: "Branding" },
      ],
    },
    { href: "/blog-actualite", label: "Blog" },
    { label: "Contact", onClick: togglePanel },
  ];

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeOut" },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // Variantes d'animation pour le tiroir mobile
  const mobileMenuVariants: Variants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { type: "spring", duration: 0.4, bounce: 0 },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Contact Panel Modal Wrapper */}
      <AnimatePresence>
        {isOpenPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePanel}
            className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 w-full lg:max-w-6xl relative shadow-xl"
            >
              <ContactForm togglePanel={togglePanel} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barre de navigation principale */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-[999]"
      >
        <div
          className={`flex justify-between items-center px-4 md:px-8 py-3 transition-all duration-300 ${
            isScrolled || isMobileMenuOpen
              ? "bg-white dark:bg-black backdrop-blur-md shadow-md border-b border-zinc-100 dark:border-zinc-900 text-black dark:text-white"
              : "bg-transparent text-white border-b border-transparent"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            className="relative h-14 w-36 transition-all duration-300"
          >
            <Image
              src={
                isScrolled || isMobileMenuOpen
                  ? "/N-services-agency-noir.PNG"
                  : "/N-services-agency-blanc.PNG"
              }
              alt="Logo N.Services Agence"
              fill
              priority
              className="object-contain"
            />
          </Link>

          {/* NAVIGATION DESKTOP (Masquée sur mobile) */}
          <nav
            className="hidden lg:flex gap-6 items-center relative"
            ref={menuRef}
          >
            {linkNav.map((item) => {
              const isActive = item.href ? pathname === item.href : false;

              return (
                <div
                  key={item.href || item.label}
                  className="relative py-2"
                  onMouseEnter={() => setOpen(item.label)}
                  onMouseLeave={() => setOpen(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="relative px-3 py-1.5 transition-colors duration-300 font-medium rounded-md text-sm md:text-base inline-block"
                    >
                      <motion.span
                        animate={{
                          color: isActive
                            ? "#f59e0b"
                            : open === item.label
                              ? "#f59e0b"
                              : isScrolled
                                ? undefined
                                : "#ffffff",
                        }}
                        className="relative z-10 flex items-center gap-1"
                      >
                        {item.label}
                        {item.dropdown && (
                          <FiChevronDown
                            className={`text-xs transition-transform duration-200 ${open === item.label ? "rotate-180" : ""}`}
                          />
                        )}
                      </motion.span>

                      {isActive && (
                        <motion.div
                          layoutId="underline"
                          className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-500 rounded"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="relative px-3 py-1.5 font-medium rounded-md text-sm md:text-base"
                    >
                      <motion.span
                        animate={{
                          color:
                            open === item.label
                              ? "#f59e0b"
                              : isScrolled
                                ? undefined
                                : "#ffffff",
                        }}
                      >
                        {item.label}
                      </motion.span>
                    </button>
                  )}

                  {/* Dropdown Desktop */}
                  <AnimatePresence>
                    {item.dropdown && open === item.label && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-full left-0 mt-1 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-2 min-w-[240px] border border-zinc-200/80 dark:border-zinc-800/80 backdrop-blur-xl text-black dark:text-white"
                      >
                        {item.dropdown.map((subItem) => (
                          <motion.div
                            key={subItem.href}
                            variants={itemVariants}
                          >
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-amber-50 dark:hover:bg-zinc-800/50 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200"
                            >
                              {subItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* BLOC BOUTONS + ACTIONS DESKTOP / BURGER MOBILE */}
          <div className="flex items-center gap-3 md:gap-4">
            <div
              className={`transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? "" : "text-white"}`}
            >
              <LangueToggle />
            </div>

            {/* Masqué sur petits mobiles pour aérer */}
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor:
                  isScrolled || isMobileMenuOpen ? "#fef3c7" : "#ffffff",
                color: "#000000",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Thanks !")}
              className={`font-medium px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs md:text-sm transition-all duration-300 shadow-md hidden sm:block ${
                isScrolled || isMobileMenuOpen
                  ? "bg-amber-500 text-white hover:shadow-amber-500/20"
                  : "bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-sm"
              }`}
            >
              Recevez les offres
            </motion.button>

            {/* BOUTON BURGER MOBILE */}
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-xl border transition-all duration-200 lg:hidden text-2xl ${
                isScrolled || isMobileMenuOpen
                  ? "border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* MENU DÉROULANT MOBILE */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full lg:hidden bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-900 overflow-hidden shadow-xl"
            >
              <div className="px-6 py-6 flex flex-col gap-2 max-h-[75vh] overflow-y-auto">
                {linkNav.map((item) => {
                  const isActive = item.href ? pathname === item.href : false;
                  const hasDropdown = !!item.dropdown;
                  const isDropdownOpen = mobileDropdownOpen === item.label;

                  return (
                    <div key={item.href || item.label} className="w-full">
                      {item.href ? (
                        hasDropdown ? (
                          /* Item parent avec Dropdown (Accordéon Tactile) */
                          <div>
                            <button
                              onClick={() =>
                                setMobileDropdownOpen(
                                  isDropdownOpen ? null : item.label,
                                )
                              }
                              className="w-full flex justify-between items-center py-3 px-2 text-left font-semibold text-lg border-b border-zinc-50 dark:border-zinc-900/50"
                            >
                              <span
                                className={isActive ? "text-amber-500" : ""}
                              >
                                {item.label.replace(" ▼", "")}
                              </span>
                              <FiChevronDown
                                className={`transition-transform duration-300 text-zinc-400 ${isDropdownOpen ? "rotate-180 text-amber-500" : ""}`}
                              />
                            </button>

                            {/* Sous-items Accordéon */}
                            <AnimatePresence>
                              {isDropdownOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="bg-zinc-50 dark:bg-zinc-900/40 rounded-xl my-1 overflow-hidden flex flex-col pl-4"
                                >
                                  {item.dropdown?.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className={`py-3 px-2 text-sm font-medium border-l border-zinc-200 dark:border-zinc-800 ${
                                        pathname === subItem.href
                                          ? "text-amber-500 font-bold"
                                          : "text-zinc-600 dark:text-zinc-400"
                                      }`}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          /* Lien simple standard */
                          <Link
                            href={item.href}
                            className={`block py-3 px-2 font-semibold text-lg border-b border-zinc-50 dark:border-zinc-900/50 ${
                              isActive
                                ? "text-amber-500 pl-4 border-l-2 border-amber-500"
                                : ""
                            }`}
                          >
                            {item.label}
                          </Link>
                        )
                      ) : (
                        /* Bouton simple (ex: Contact) */
                        <button
                          onClick={item.onClick}
                          className="w-full text-left block py-3 px-2 font-semibold text-lg border-b border-zinc-50 dark:border-zinc-900/50 text-amber-500"
                        >
                          {item.label}
                        </button>
                      )}
                    </div>
                  );
                })}

                {/* Bouton additionnel tout en bas pour les petits mobiles (< 640px) */}
                <div className="mt-4 sm:hidden">
                  <button
                    onClick={() => alert("Thanks !")}
                    className="w-full bg-amber-500 text-white font-medium py-3.5 rounded-xl text-sm text-center shadow-md shadow-amber-500/10"
                  >
                    Recevez les offres
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
