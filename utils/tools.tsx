/**
 * 
 *  BAR DE NAVIGATION STYLE ET ANIMATION
 * 
 */

//2
/*
import { useState, useEffect, useLayoutEffect, useRef, } from "react";
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';

const NavBAr2: React.FC = () => {
    const logo: string = "./logo.svg";

    const items: NavCardItem[] = [
        {
            label: "About",
            bgColor: "#1B1722",
            textColor: "#fff",
            links: [
                { label: "Company", ariaLabel: "About Company", href: "/about" },
                { label: "Careers", ariaLabel: "About Careers", href: "/careers" }
            ]
        },
        {
            label: "Projects",
            bgColor: "#2F293A",
            textColor: "#fff",
            links: [
                { label: "Featured", ariaLabel: "Featured Projects", href: "/projects/featured" },
                { label: "Case Studies", ariaLabel: "Project Case Studies", href: "/projects/case-studies" }
            ]
        },
        {
            label: "Contact",
            bgColor: "#2F293A",
            textColor: "#fff",
            links: [
                { label: "Email", ariaLabel: "Email us", href: "mailto:hello@example.com" },
                { label: "Twitter", ariaLabel: "Twitter", href: "https://twitter.com" },
                { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://linkedin.com" }
            ]
        }
    ];

    return (
        <CardNav
            logo="" // <-- Correction ici : simple et propre !
            logoAlt="Company Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="back.out(1.7)"
            theme="light"
        />
    );
};




/** Card de navigation */
/*
export interface NavSubLink {
    label: string;
    ariaLabel: string;
    href?: string;
}

export interface NavCardItem {
    label: string;
    bgColor: string;
    textColor: string;
    links: NavSubLink[];
}

export interface CardNavProps {
    logo: string;
    logoAlt?: string;
    items: NavCardItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    theme?: 'light' | 'dark'; // Inclus car présent dans votre exemple d'appel
}



const CardNav: React.FC<CardNavProps> = ({
    logo = ".logo.svg",
    logoAlt = 'Logo',
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor,
    buttonBgColor,
    buttonTextColor
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const navRef = useRef<HTMLElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Fonction pour calculer dynamiquement la hauteur (notamment sur mobile)
    const calculateHeight = (): number => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        // Protection SSR pour Next.js
        if (typeof window === 'undefined') return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLDivElement | null;
            if (contentEl) {
                // Sauvegarde des styles inline actuels
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                // Force le calcul hors-champ
                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                // Déclenche un forced reflow de manière sécurisée
                const _offsetHeight = contentEl.offsetHeight;

                const topBar = 60;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                // Restauration des styles
                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    // Instanciation de la Timeline GSAP
    const createTimeline = (): gsap.core.Timeline | null => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 60, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cardsRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease,
            stagger: 0.08
        }, '-=0.1');

        return tl;
    };

    // Gestion du cycle de vie de la timeline d'animation
    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ease, items]);

    // Gestion du Resize de la fenêtre (mise à jour des calculs de hauteur)
    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;

        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    // Clavier-friendly: Accessibilité pour l'activation du menu au clavier
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    };

    return (
        <div className={`card-nav-container ${className}`}>
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''}`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
                        onClick={toggleMenu}
                        onKeyDown={handleKeyDown}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div className="hamburger-line" />
                        <div className="hamburger-line" />
                    </div>

                    <div className="logo-container">
                        <img src={logo} alt={logoAlt} className="logo" />
                    </div>

                    <button
                        type="button"
                        className="card-nav-cta-button"
                        style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
                    >
                        Get Started
                    </button>
                </div>

                <div className="card-nav-content" aria-hidden={!isExpanded}>
                    {(items || []).slice(0, 3).map((item: NavCardItem, idx: number) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card"
                            ref={(el) => {
                                if (el) cardsRef.current[idx] = el;
                            }}
                            style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        >
                            <div className="nav-card-label">{item.label}</div>
                            <div className="nav-card-links">
                                {item.links?.map((lnk, i) => (
                                    <a
                                        key={`${lnk.label}-${i}`}
                                        className="nav-card-link"
                                        href={lnk.href || '#'}
                                        aria-label={lnk.ariaLabel}
                                    >
                                        <GoArrowUpRight className="nav-card-link-icon" aria-hidden="true" />
                                        {lnk.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;



/**
 *  GALERIE 1
 * 
 */



// Définition de l'interface pour TypeScript
/*
interface AlbumItem {
    id: number;
    image: string;
    titre: string;
    categorie: string;
}

const ALBUMS: AlbumItem[] = [
    { id: 1, image: "/galerie/image-1.JPG", titre: "Collection Bosse", categorie: "Mode" },
    { id: 2, image: "/galerie/image-1.JPG", titre: "Collection Été", categorie: "Mode" },
    { id: 3, image: "/galerie/image-3.JPG", titre: "Collection Shotting", categorie: "Mode" },
    { id: 4, image: "/galerie/image-4.JPG", titre: "Collection Présidentiel", categorie: "Mode" },
    { id: 5, image: "/galerie/image-5.JPG", titre: "Collection Mariage", categorie: "Mode" },
    { id: 6, image: "/galerie/image-6.JPG", titre: "Collection Patron", categorie: "Mode" },
    { id: 7, image: "/galerie/image-7.JPG", titre: "Collection Fiancé", categorie: "Mode" },
    { id: 8, image: "/galerie/image-8.JPG", titre: "Collection Été", categorie: "Mode" },
    { id: 9, image: "/galerie/image-9.JPG", titre: "Collection Été", categorie: "Mode" },
];

export default function Gallery() {
    // On stocke l'item sélectionné au lieu d'un simple booléen
    const [selectedItem, setSelectedItem] = useState<AlbumItem | null>(null);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-950 via-pink-200 to-blue-900 bg-clip-text text-transparent mb-4">
                        Studio
                    </h1>
                </div>

<div className={`max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 rounded-xl backdrop-blur-sm transition-colors duration-300 dark:bg-black/80 bg-gray-200`}
>
{ALBUMS.map((item) => (
<div
key={item.id}
onClick={() => setSelectedItem(item)} // On passe l'objet cliqué à l'état
className="relative h-64 w-full rounded-lg overflow-hidden group shadow-md cursor-pointer"
>
<Image
src={item.image}
alt={item.titre || "Image galerie"}
fill
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
className="object-cover object-center pointer-events-none transition-transform duration-[1.2s] ease-out group-hover:scale-110"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />

{/* Textes au survol *//*}
<div className="absolute inset-0 flex flex-col justify-end p-5 text-white transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
    {item.categorie && (
        <span className="text-xs uppercase tracking-widest text-pink-300 font-semibold mb-1">
            {item.categorie}
        </span>
    )}
    <h3 className="text-xl font-bold font-serif tracking-wide leading-tight">
        {item.titre || "Sans titre"}
    </h3>
    <div className="w-8 h-[2px] bg-white mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left delay-100" />
</div>
</div>
))}
</div>

{selectedItem && (
    <ShowPhoto
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
    />
)}

</div>
</div>
);
}

interface ShowPhotoProps {
item: AlbumItem;
onClose: () => void;
}

// Sous-composant avec une majuscule (Convention React)
const ShowPhoto = ({ item, onClose }: ShowPhotoProps) => {
return (
<div
onClick={onClose} // Ferme la modale en cliquant n'importe où sur le fond noir
className="fixed inset-0 flex p-4 md:p-12 items-center justify-center bg-black/90 backdrop-blur-md z-50 animate-fade-in cursor-zoom-out"
>
<button
    onClick={onClose}
    className="absolute top-6 right-6 text-white text-3xl font-light hover:text-pink-300 transition-colors z-50"
>
    ✕
</button>

<div className="relative w-full h-full max-w-4xl max-h-[80vh]">
    <Image
        src={item.image}
        alt={item.titre || "Image agrandie"}
        fill
        sizes="(max-width: 1200px) 100vw, 80vw"
        className="object-contain" // 'object-contain' évite de couper la photo originale en grand format !
        priority
    />

    {/* Petit titre sous la photo zoomée *//*}
<div className="absolute -bottom-10 left-0 right-0 text-center text-white">
<p className="text-lg font-serif">{item.titre}</p>
<p className="text-xs text-gray-400 uppercase tracking-widest">{item.categorie}</p>
</div>
</div>
</div>
);
};



{/* 
    Gallery Grid 2

 */ /*}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {galleryItems.map((item) => (
        <div
            key={item.id}
            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 border border-white/10"
        >
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                />

                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform transition-transform hover:scale-110 hover:bg-white/30">
                        <FaPlay className="text-white text-2xl ml-0.5" />
                    </button>
                </div>

                {/* Badge *//*}
                {item.badge && (
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-xs font-semibold text-white">{item.badge}</span>
                    </div>
                )}

                {/* Spotify Icon *//*}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaSpotify className="text-green-500 text-sm" />
                </div>
            </div>

            {/* Content *//*}
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                        {item.title}
                    </h3>
                    {item.subtitle && (
                        <p className="text-sm text-purple-400 font-medium mb-1">
                            {item.subtitle}
                        </p>
                    )}
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {item.track}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                        <p className="text-xs text-gray-400">Artist</p>
                        <p className="text-sm font-medium text-gray-300 line-clamp-1">
                            {item.artist}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <FaHeart className="text-sm" />
                        </button>
                        <button className="text-gray-400 hover:text-blue-500 transition-colors">
                            <FaShareAlt className="text-sm" />
                        </button>
                    </div>
                </div>

                {item.featured && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className="h-1 flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span className="text-xs text-purple-400 font-semibold">Featured</span>
                    </div>
                )}
            </div>
        </div>
    ))}
</div>

{/* Footer Note */ /*}
<div className="text-center mt-12 pt-8 border-t border-white/10">
    <p className="text-gray-500 text-sm">
        ✨ {galleryItems.length} titres disponibles • Mis à jour quotidiennement
    </p>
    <div className="flex justify-center gap-4 mt-4">
        <span className="text-xs text-gray-600">#Disney</span>
        <span className="text-xs text-gray-600">#EdSheeran</span>
        <span className="text-xs text-gray-600">#DaftPunk</span>
        <span className="text-xs text-gray-600">#Encanto</span>
    </div>
</div>

*/