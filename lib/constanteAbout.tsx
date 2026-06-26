import {
  FaUsers,
  FaAward,
  FaBriefcase,
  FaLaptopCode,
  FaGraduationCap,
} from "react-icons/fa";
import { IoCameraSharp, IoShareSocialSharp } from "react-icons/io5";

export const statsData = [
  { id: 1, name: "Projets Réalisés", value: "80+", icon: <FaBriefcase /> },
  {
    id: 2,
    name: "Étudiants Formés",
    value: "250+",
    icon: <FaGraduationCap />,
  },
  { id: 3, name: "Clients Satisfaits", value: "98%", icon: <FaUsers /> },
  { id: 4, name: "Années d'Expérience", value: "5+", icon: <FaAward /> },
];

export const polesData = [
  {
    title: "N.pictures professional",
    icon: <IoCameraSharp className="text-xl" />,
    color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
    items: [
      "Photographie professionnelle",
      "Vidéographie",
      "Couverture d'événements",
      "Production de contenus visuels",
    ],
  },
  {
    title: "N.Digital",
    icon: <IoShareSocialSharp className="text-xl" />,
    color: "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
    items: [
      "Marketing digital",
      "Gestion des réseaux sociaux",
      "Publicité en ligne",
      "Branding",
    ],
  },
  {
    title: "N.Web",
    icon: <FaLaptopCode className="text-xl" />,
    color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
    items: [
      "Création de sites web",
      "E-commerce",
      "Maintenance et référencement",
    ],
  },
  {
    title: "N.Academy",
    icon: <FaGraduationCap className="text-xl" />,
    color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600",
    items: [
      "Formation en photographie",
      "Formation en vidéographie",
      "Formation en marketing digital",
      "Accompagnement professionnel",
    ],
  },
];

export const valeursData = [
  {
    name: "Excellence",
    desc: "La qualité dans chacune de nos réalisations.",
  },
  {
    name: "Créativité",
    desc: "Des solutions originales adaptées à chaque client.",
  },
  {
    name: "Professionnalisme",
    desc: "Rigueur, discipline et respect des engagements.",
  },
  {
    name: "Innovation",
    desc: "Intégration des nouvelles technologies et tendances.",
  },
  { name: "Intégrité", desc: "Honnêteté, transparence et responsabilité." },
  { name: "Passion", desc: "Enthousiasme et engagement total au quotidien." },
  {
    name: "Transmission",
    desc: "Partage des connaissances par la formation.",
  },
];
