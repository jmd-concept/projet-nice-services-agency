"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, Avatar, Button, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

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

const DISPLAYED_ARTICLES: Article[] = [
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
];

export default function BlogActualiteSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 intersection-observer-context">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <Tag
              color="blue"
              className="mb-2 uppercase tracking-wider font-semibold"
            >
              Actualités
            </Tag>
            <h2 className="text-3xl font-extrabold text-gray-400 tracking-tight sm:text-4xl">
              Nos Dernières Publications
            </h2>
            <p className="mt-2 text-lg text-gray-500 max-w-xl">
              Analyses, conseils et décryptages pour propulser votre business.
            </p>
          </div>

          {/* Bouton "Voir plus" - Version Desktop */}
          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex items-center justify-center lg:mt-12">
                <Link
                  href="/blog-actualite"
                  className="flex gap-8 items-center text-md bg-amber-500 hover:bg-amber-600 border-none shadow-md h-12 rounded-lg font-medium px-8 py-4"
                >
                  Voir tout le blog
                  <ArrowRightOutlined />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Grille de cartes de Blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISPLAYED_ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              layout
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -8 }}
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
                className="flex flex-col justify-between w-full shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-white dashboard-glass"
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

                {/* Pied de la carte : Profil & Lien d'action */}
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

                  {/* Lien cliquable vers la page du blog */}
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
        </div>

        {/* Bouton "Voir plus" - Version Mobile */}
        <div className="mt-10 block md:hidden text-center">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Link href="/blog-actualite">
              <Button
                type="primary"
                block
                size="large"
                icon={<ArrowRightOutlined />}
                className="bg-blue-600 hover:bg-blue-500 border-none h-12 rounded-xl font-medium"
              >
                Voir tout le blog
              </Button>
            </Link>
          </motion.div>
        </div>
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
