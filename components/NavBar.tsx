"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LangueToggle from "./LangueToggle";
import { usePathname } from "next/navigation";
import ContactForm from "./ContactForm";
import { motion, AnimatePresence } from "framer-motion";

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
  
  const menuRef = useRef(null);

  const togglePanel = () => setIsOpenPanel((prev) => !prev);

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
      setOpen(false);
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
    { href: "/", label: "Acueil" },
    { href: "/about", label: "L'agence" },
    {
      href: "#galerie",
      label: "Studio ▼",
      dropdown: [
        { href: "/galerie/photographie", label: "Photographie" },
        { href: "/galerie/videographie", label: "Vidéographie" },
        { href: "/galerie/branding", label: "Branding" },
      ],
    },
    {
      href: "/blog-actualite",
      label: "Blog",
    },
    {
      label: "Contact",
      onClick: togglePanel,
    },
  ];

  const dropdownVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      {/* Contact Panel Modal Wrapper with AnimatePresence */}
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
              className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 w-full max-w-lg relative shadow-xl"
            >
              <ContactForm togglePanel={togglePanel} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-[999]"
      >
        <div
          className={`flex justify-between items-center px-6 transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md border-b border-zinc-100 dark:border-zinc-900 text-black dark:text-white"
              : "bg-transparent text-white border-b border-transparent"
          }`}
        >
          <div className="relative h-25 w-25 transition-all duration-300">
            <Image
              src="/N-services-agency-blanc.PNG"
              alt="Logo N.Services Agence"
              fill
              priority
              className="object-contain transition-transform duration-[1.5s]"
            />
          </div>

          <nav className="hidden lg:flex gap-6 items-center relative">
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
                        className="relative z-10"
                      >
                        {item.label}
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

          <div className="flex items-center gap-4">
            <div
              className={`transition-colors duration-300 ${isScrolled ? "" : "text-white"}`}
            >
              <LangueToggle />
            </div>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: isScrolled ? "#fef3c7" : "#ffffff",
                color: "#000000",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Thanks !")}
              className={`font-medium px-5 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-md ${
                isScrolled
                  ? "bg-amber-500 text-white hover:shadow-amber-500/20"
                  : "bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-sm"
              }`}
            >
              Recevez les offres
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
