"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Avatar, Button, Tag } from "antd";

interface Article {
  id: number;
  titre: string;
  categorie:
    | "Conseils marketing"
    | "Entrepreneuriat"
    | "Branding"
    | "Création web"
    | "Communication digitale";
  date: string;
  description: string;
  avatar: string;
  image: string;
}

const CATEGORY_COLORS = {
  "Conseils marketing": "orange",
  Entrepreneuriat: "purple",
  Branding: "magenta",
  "Création web": "blue",
  "Communication digitale": "cyan",
};

// Liste complète de toutes les catégories possibles pour le filtre
const CATEGORIES = [
  "Tous",
  "Conseils marketing",
  "Entrepreneuriat",
  "Branding",
  "Création web",
  "Communication digitale",
];

const ALL_ARTICLES: Article[] = [
  {
    id: 1,
    titre: "5 Stratégies pour booster votre visibilité locale",
    categorie: "Conseils marketing",
    date: "12 Juin 2026",
    description:
      "Découvrez les leviers indispensables pour attirer plus de clients qualifiés sans exploser votre budget publicitaire.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    titre: "Lancer son agence en 2026 : Le guide de survie",
    categorie: "Entrepreneuriat",
    date: "10 Juin 2026",
    description:
      "De l'idée initiale à la signature des premiers contrats, évitez les pièges classiques des jeunes entrepreneurs.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=business",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    titre: "Pourquoi l'identité visuelle peut faire couler votre produit",
    categorie: "Branding",
    date: "08 Juin 2026",
    description:
      "Le branding ne se résume pas à un logo. Analyse de l'impact psychologique des choix graphiques sur vos ventes.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=brand",
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    titre: "Introduction aux architectures Headless et Jamstack",
    categorie: "Création web",
    date: "05 Juin 2026",
    description:
      "Pourquoi séparer le back-end du front-end révolutionne les performances de vos sites vitrines et e-commerce.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=dev",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    titre: "Storytelling : Humanisez votre communication sur LinkedIn",
    categorie: "Communication digitale",
    date: "03 Juin 2026",
    description:
      "Les structures narratives qui captivent l'audience B2B pour transformer vos abonnés en ambassadeurs.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=social",
    image:
      "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    titre: "Automatisation no-code : Libérez du temps pour votre business",
    categorie: "Entrepreneuriat",
    date: "01 Juin 2026",
    description:
      "Connectez vos outils quotidiens pour éliminer les tâches répétitives sans écrire une seule ligne de code.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=nocode",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function BlogActualiteSection() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // Filtrage des articles selon la catégorie sélectionnée
  const filteredArticles =
    selectedCategory === "Tous"
      ? ALL_ARTICLES
      : ALL_ARTICLES.filter(
          (article) => article.categorie === selectedCategory,
        );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 intersection-observer-context">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4 bg-amber-500 rounded-md p-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-100 tracking-tight sm:text-4xl">
              Nos Dernières Publications
            </h2>
            <p className="mt-2 text-lg text-gray-200 max-w-xl">
              Analyses, conseils et décryptages pour propulser votre business.
            </p>
          </div>
        </div>

        {/* Barre de Filtres Dynamique */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-gray-500">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille de cartes de Blog Animée */}
        <motion.div
          layout // Permet un repositionnement fluide lors du filtrage
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6 }}
                className="flex"
                // Le secret est ici : le "as const" force TypeScript à lire "spring" comme le type exact attendu
                transition={{
                  type: "spring" as const,
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1,
                }}
              >
                <Card
                  variant="borderless"
                  className="flex flex-col justify-between w-full shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden bg-white dashboard-glass"
                  styles={{
                    body: {
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    },
                  }}
                  cover={
                    <div className="overflow-hidden h-48 w-full relative">
                      <img
                        src={article.image}
                        alt={article.titre}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  }
                >
                  <div className="flex-1">
                    {/* Catégorie & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <Tag
                        color={CATEGORY_COLORS[article.categorie]}
                        className="m-0 font-medium"
                      >
                        {article.categorie}
                      </Tag>
                      <span className="text-xs text-gray-400 font-medium">
                        {article.date}
                      </span>
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer leading-snug">
                      {article.titre}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                      {article.description}
                    </p>
                  </div>

                  {/* Pied de la carte */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={article.avatar}
                        size="small"
                        className="bg-gray-100 border border-gray-200"
                      />
                      <span className="text-xs font-semibold text-gray-700">
                        Équipe N.Service Agency
                      </span>
                    </div>

                    <Link
                      href="/blog-actualite"
                      className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors cursor-pointer flex items-center gap-1 group"
                    >
                      Lire l'article
                      <span className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}




/**
 * BLOG/ACTUALITES
Articles :
 Conseils marketing
 Entrepreneuriat
 Branding
 Création web
 Communication digitale                         "use client";

import { motion } from "framer-motion";
import { Card, Avatar, Button, Tag } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

// Données fictives pour le fil d'actualité
const ARTICLES = [
  {
    id: 1,
    title: "Découvrir Next.js 14 et le App Router",
    category: "Tech",
    date: "12 Juin 2026",
    description:
      "Plongée au cœur des nouveautés de Next.js et de la puissance des Server Components.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
  },
  {
    id: 2,
    title: "Maîtriser Framer Motion",
    category: "Animation",
    date: "10 Juin 2026",
    description:
      "Comment rendre vos interfaces vivantes et fluides avec des animations basées sur la physique.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
  },
  {
    id: 3,
    title: "L'art du Clean Code en React",
    category: "Bonnes Pratiques",
    date: "05 Juin 2026",
    description:
      "Astuces et patterns essentiels pour maintenir une base de code React propre et scalable.",
    avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
  },
];

// Variantes de configuration pour Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Délai entre l'apparition de chaque carte
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function BlogActualite() {
  return (
    <div className="min-h-screen py-12 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête de la page animé */ /*}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Fil d'actualité
          </h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Découvrez nos derniers articles et partages de la communauté.
          </p>
        </motion.div>

        {/* Conteneur des articles */ /*}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {ARTICLES.map((article) => (
            <motion.div
              key={article.id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }} // Effet interactif au survol
              className="shadow-sm rounded-xl overflow-hidden"
            >
              <Card
                variant="borderless"
                actions={[
                  <Button type="text" icon={<LikeOutlined />}>
                    12
                  </Button>,
                  <Button type="text" icon={<MessageOutlined />}>
                    5
                  </Button>,
                  <Button type="text" icon={<ShareAltOutlined />} />,
                ]}
              >
                <div className="flex items-start gap-4">
                  <Avatar src={article.avatar} size="large" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Tag color="blue">{article.category}</Tag>
                      <span className="text-xs text-gray-400">
                        {article.date}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
 */
