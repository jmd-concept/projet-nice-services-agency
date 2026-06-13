export interface TeamMember {
  id: string;
  image: string;
  nom: string;
  domaine: string;
  reseaux: string[];
}

export const teamData: TeamMember[] = [
  {
    id: "1",
    image: "/equipe/pdg-christian.JPG",
    nom: "Christian",
    domaine: "Software Developer & Lead",
    reseaux: ["https://facebook.com", "https://linkedin.com"],
  },
  {
    id: "2",
    image: "/equipe/image-3.JPG",
    nom: "Anny",
    domaine: "UI/UX Designer",
    reseaux: ["https://facebook.com", "https://linkedin.com"],
  },
  {
    id: "3",
    image: "/equipe/image-2.JPG",
    nom: "Jonathan",
    domaine: "Responsable Studio & Vidéo",
    reseaux: ["https://facebook.com", "https://linkedin.com"],
  },
];

export interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
}

export const galerieItems: MasonryItem[] = [
  {
    id: "1",
    img: "/galerie/image-1.JPG",
    url: "/galerie/photographie/1",
    height: 400,
  },
  { id: "2", img: "/equipe/pdg-christian.JPG", url: "/galerie/2", height: 400 },
  {
    id: "3",
    img: "/galerie/image-2.JPG",
    url: "/galerie/photographie/3",
    height: 250,
  },
  {
    id: "4",
    img: "/galerie/image-3.JPG",
    url: "/galerie/photographie/4",
    height: 600,
  },
  {
    id: "5",
    img: "/galerie/image-4.JPG",
    url: "/galerie/photographie/5",
    height: 400,
  },
  {
    id: "6",
    img: "/galerie/image-5.JPG",
    url: "/galerie/videographie/6",
    height: 250,
  },
  {
    id: "7",
    img: "/galerie/image-6.JPG",
    url: "/galerie/videographie/7",
    height: 600,
  },
  {
    id: "8",
    img: "/galerie/image-7.JPG",
    url: "/galerie/videographie/8",
    height: 350,
  },
  {
    id: "9",
    img: "/galerie/image-8.JPG",
    url: "/galerie/branding/9",
    height: 500,
  },
  {
    id: "10",
    img: "/galerie/image-9.JPG",
    url: "/galerie/branding/10",
    height: 300,
  },
  {
    id: "11",
    img: "galerie/image-10.JPG",
    url: "/galerie/11",
    height: 450,
  },
  /*{
    id: "12",
    img: "galerie/image-11.JPG",
    url: "/galerie/12",
    height: 550,
  },
  {
    id: "13",
    img: "galerie/image-12.JPG",
    url: "/galerie/13",
    height: 280,
  },
  {
    id: "14",
    img: "galerie/image-13.JPG",
    url: "/galerie/14",
    height: 420,
  },
  {
    id: "15",
    img: "galerie/image-14.JPG",
    url: "/galerie/15",
    height: 390,
  },*/
];

export const projects = [
  {
    id: "aesop-ethereal",
    slug: "aesop-ethereal",
    title: "Aesop Ethereal",
    category: "Packaging Design",
    image:
      "https://images.unsplash.com/photo-1761125802333-d145773f4461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbHV4dXJ5JTIwY29zbWV0aWMlMjBwYWNrYWdpbmclMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzY1MjcwMzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2024",
    client: "Aesop",
    role: "Art Direction, Packaging",
    description:
      "A comprehensive packaging redesign focusing on the tactile experience of luxury skincare. The goal was to eliminate visual noise and focus purely on material quality and typography.",
  },
  {
    id: "mono-chair",
    slug: "mono-chair",
    title: "Mono Chair",
    category: "Furniture Design",
    image:
      "https://images.unsplash.com/photo-1551907234-fb773fb08a2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsJTIwY2hhaXIlMjBmdXJuaXR1cmUlMjBkZXNpZ24lMjBzdHVkaW98ZW58MXx8fHwxNzY1MjcwMzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2023",
    client: "Herman Miller",
    role: "Industrial Design",
    description:
      "An exploration of continuous form. The Mono Chair is cast from a single piece of recycled polycarbonate, creating a seamless silhouette that disappears into the room.",
  },
  {
    id: "leica-pure",
    slug: "leica-pure",
    title: "Leica Pure",
    category: "Product Concept",
    image:
      "https://images.unsplash.com/photo-1755136983366-b958dcd2053e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWljYSUyMGNhbWVyYSUyMG1pbmltYWxpc3QlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY1MjcwMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2023",
    client: "Leica",
    role: "Product Design",
    description:
      "Stripping the camera back to its essence. No digital screens, no complex menus. Just aperture, shutter speed, and ISO. A return to the pure joy of photography.",
  },
  {
    id: "bang-olufsen",
    slug: "bang-olufsen",
    title: "Bang & Olufsen",
    category: "Audio Design",
    image:
      "https://images.unsplash.com/photo-1750603244415-8c7d86d52091?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5nJTIwYW5kJTIwb2x1ZnNlbiUyMHNwZWFrZXIlMjBtaW5pbWFsaXN0JTIwYXVkaW8lMjBkZXNpZ258ZW58MXx8fHwxNzY1MjcwMzMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: "2022",
    client: "Bang & Olufsen",
    role: "Industrial Design",
    description:
      "A speaker system designed to be heard, not seen. Using acoustic fabric and aluminum, we created a form that mimics architectural elements.",
  },
  {
    id: "architectural-form",
    slug: "architectural-form",
    title: "Architectural Form",
    category: "Spatial Design",
    image:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2600&auto=format&fit=crop",
    year: "2022",
    client: "Vitra",
    role: "Spatial Design",
    description:
      "A temporary pavilion for Milan Design Week. The structure uses light and shadow to create shifting volumes throughout the day.",
  },
  {
    id: "ceramic-void",
    slug: "ceramic-void",
    title: "Ceramic Void",
    category: "Art Direction",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2600&auto=format&fit=crop",
    year: "2021",
    client: "Independent",
    role: "Art Direction",
    description:
      "A photographic series exploring the relationship between positive and negative space in contemporary ceramics.",
  },
];

export const galleryItems = [
  {
    id: 1,
    title: "DisNEp",
    subtitle: "ENCANTE",
    track: "SURFACE PRESSURE",
    artist: "Jessica Darrow / Disney",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop",
    badge: "As Heard",
    color: "from-purple-500 to-pink-500",
    featured: true,
  },
  {
    id: 2,
    title: "Ed Sheeran",
    subtitle: "=",
    track: "Shape of You · Shivers",
    artist: "Ed Sheeran",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=400&fit=crop",
    badge: "AS HEARD",
    color: "from-blue-500 to-cyan-500",
    featured: false,
  },
  {
    id: 3,
    title: "AROUND THE WORLD",
    subtitle: "Discovery",
    track: "Around the World",
    artist: "Daft Punk",
    imageUrl:
      "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
    badge: "Global Hit",
    color: "from-green-500 to-emerald-500",
    featured: false,
  },
  {
    id: 4,
    title: "Surface Pressure",
    subtitle: "ENCANTO OST",
    track: "Jessica Darrow",
    artist: "Disney Animation",
    imageUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=400&fit=crop",
    badge: "Trending",
    color: "from-orange-500 to-red-500",
    featured: false,
  },
  {
    id: 5,
    title: "Disney Hits",
    subtitle: "Best of Encanto",
    track: "We Don't Talk About Bruno",
    artist: "Disney",
    imageUrl:
      "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&h=400&fit=crop",
    badge: "Playlist",
    color: "from-indigo-500 to-purple-500",
    featured: false,
  },
  {
    id: 6,
    title: "Ed Sheeran Live",
    subtitle: "World Tour",
    track: "Perfect · Bad Habits",
    artist: "Ed Sheeran",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop",
    badge: "Concert",
    color: "from-yellow-500 to-amber-500",
    featured: false,
  },
];



// 1. Définition de la structure d'un avis client
export interface Avis {
  id: number;
  nom: string;
  role: string; // ex: "Client régulier", "Chef d'entreprise"
  commentaire: string;
  note: number; // Note sur 5
  avatar: string;
  date: string;
}

// 2. Données de démonstration
export const listeAvis: Avis[] = [
  {
    id: 1,
    nom: "Sophie Martin",
    role: "Cliente fidèle",
    commentaire: "Le service de JMD RestoConnect a totalement transformé nos soirées. Les commandes sont fluides et les notifications.",
    note: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    date: "Il y a 2 jours"
  },
  {
    id: 2,
    nom: "Jean-Pierre Dupond",
    role: "Directeur de Resto Pro",
    commentaire: "Une application robuste et intuitive. L'interface est claire, l'équipe technique est très réactive",
    note: 4,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    date: "Il y a 1 semaine"
  },
  {
    id: 3,
    nom: "Amélie Le Gall",
    role: "Épicurienne",
    commentaire: "Superbe expérience utilisateur ! C'est rapide, beau et super pratique pour commander ou réserver.",
    note: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    date: "Il y a 2 semaines"
  }
];
