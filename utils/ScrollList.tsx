/* 'use client'

import React, { useEffect, useState, useRef, useCallback } from "react";
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from "react-icons/fi";
import {
    FiPlus,
    FiChevronUp,
    FiChevronDown,
    FiX,
    FiTwitter
} from 'react-icons/fi';


function App() {
    // Le tableau respecte strictement le type ScrollListItem[]
    const notifications: ScrollListItem[] = [
        {
            id: 1,
            title: "Nouvelle connexion",
            description: "Un appareil s'est connecté à votre compte.",
            time: "Il y a 5 min"
        },
        {
            id: 2,
            title: "Mise à jour",
            description: "La version 3.0 est disponible.",
            time: "Hier"
        }
    ];

    return (
        <div style={{
            backgroundColor: '#0f172a',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ScrollList items={notifications} />
        </div>
    );
}


export interface ScrollListItem {
    id: string | number;
    title: string;
    description: string;
    time?: string; // Le point d'interrogation signifie que ce champ est optionnel
}

interface ScrollListProps {
    items: ScrollListItem[];
}

const ScrollList: React.FC<ScrollListProps> = ({ items }) => {
    return (
        <div className="scroll-list__wrap">
            {items && items.length > 0 ? (
                items.map((item) => (
                    <div key={item.id} className="scroll-list__item">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {item.time && <span className="scroll-list__time">{item.time}</span>}
                    </div>
                ))
            ) : (
                <p className="scroll-list__empty">Aucun élément à afficher</p>
            )}
        </div>
    );
};

export default ScrollList;


interface QuoteItem {
    quote: string;
    author?: string;
    work?: string;
    year?: string | number;
    url?: string;
}

interface QuoteRotatorProps {
    /** URL de l'API ou du fichier JSON contenant les citations */ /*
    dataSource?: string;
}

const DEFAULT_QUOTES: QuoteItem[] = [
    {
        quote: "Build adaptive UI foundations with tokens, motion, and accessible color ramps. Ship faster without sameness.",
        author: "Design Systems",
        work: "Edge Visuals Playbook",
        year: "2026",
    },
    {
        quote: "Stream metrics, smooth spikes, and highlight deltas. Clarity first, chrome last.",
        author: "Realtime Dashboards",
        work: "Signal Guide",
    }
];

const AUTOPLAY_MS = 6000;

export function QuoteRotator({ dataSource }: QuoteRotatorProps) {
    const [quotes, setQuotes] = useState<QuoteItem[]>(DEFAULT_QUOTES);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [displayIndex, setDisplayIndex] = useState(0);

    // Chargement des données si un dataSource est fourni
    useEffect(() => {
        if (!dataSource) return;

        async function fetchQuotes() {
            try {
                const res = await fetch(dataSource, { cache: "no-cache" });
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const json = await res.json();
                const arr = Array.isArray(json) ? json : (Array.isArray(json.items) ? json.items : []);
                if (arr.length > 0) {
                    setQuotes(arr);
                }
            } catch (err) {
                console.error("Failed to load quotes:", err);
            }
        }

        fetchQuotes();
    }, [dataSource]);

    // Gestion de l'animation de transition (fade out -> switch -> fade in)
    const changeQuote = useCallback((nextIndex: number) => {
        setIsFading(true);
        setTimeout(() => {
            setDisplayIndex(nextIndex);
            setCurrentIndex(nextIndex);
            setIsFading(false);
        }, 300); // Doit correspondre à la moitié de la durée de transition Tailwind
    }, []);

    const handleNext = useCallback(() => {
        const nextIndex = (currentIndex + 1) % quotes.length;
        changeQuote(nextIndex);
    }, [currentIndex, quotes.length, changeQuote]);

    const handlePrev = useCallback(() => {
        const prevIndex = (currentIndex - 1 + quotes.length) % quotes.length;
        changeQuote(prevIndex);
    }, [currentIndex, quotes.length, changeQuote]);

    // Boucle d'Autoplay
    useEffect(() => {
        if (!isPlaying || quotes.length <= 1) return;

        const timer = setTimeout(handleNext, AUTOPLAY_MS);
        return () => clearTimeout(timer);
    }, [isPlaying, currentIndex, quotes.length, handleNext]);

    const activeQuote = quotes[displayIndex] || quotes[0];

    return (
        <section
            className="w-[min(1100px,calc(100vw-3rem))] mx-auto px-4 md:px-6"
            aria-label="Quote Rotator"
        >
            <div className="w-full py-8 md:py-12 flex flex-col items-stretch justify-center gap-6 box-border" aria-live="polite">

                {/* Viewport de la Citation */ /*}
                <div className="min-h-[clamp(160px,28vh,320px)] flex flex-col justify-center items-stretch text-left w-full">
                    <blockquote
                        className={`m-0 w-full border-l-4 border-sky-500 pl-4 font-serif text-[clamp(1.6rem,2vw+1rem,2.6rem)] font-semibold leading-[1.35] transition-all duration-500 ease-out ${isFading ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                            }`}
                    >
                        <q className="block w-full text-zinc-100 bg-none normal-case overflow-wrap-anywhere break-words [text-fill-color:initial]">
                            {activeQuote.quote}
                        </q>
                    </blockquote>

                    <div
                        className={`mt-4 pl-4 font-sans italic text-[clamp(0.95rem,0.4vw+0.85rem,1.05rem)] color text-zinc-400 overflow-wrap-anywhere break-words transition-all duration-500 ease-out delay-75 ${isFading ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                            }`}
                    >
                        {activeQuote.author && <span>{activeQuote.author}</span>}
                        {activeQuote.work && <span className="not-italic">, </span>}
                        {activeQuote.work && <em className="text-zinc-300">{activeQuote.work}</em>}
                        {activeQuote.year && <span>, {activeQuote.year}</span>}
                        {activeQuote.url && (
                            <>
                                <span className="not-italic"> — </span>
                                <a
                                    href={activeQuote.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-inherit underline decoration-sky-500/50 hover:decoration-rose-500 transition-colors duration-200 inline-block max-w-full break-all"
                                >
                                    source
                                </a>
                            </>
                        )}
                    </div>
                </div>

                <div className="inline-flex items-center justify-center gap-3 mt-6 flex-wrap" role="group" aria-label="Quote controls">
                    <button
                        onClick={handlePrev}
                        className="flex items-center gap-2 bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-xl px-[1.1rem] py-[0.6rem] cursor-pointer text-base font-sans tracking-wide transition-all duration-200 hover:bg-zinc-800 hover:border-sky-500 hover:-translate-y-0.5 active:translate-y-px"
                        aria-label="Previous quote"
                    >
                        <FiChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-xl px-[1.1rem] py-[0.6rem] cursor-pointer text-base font-sans tracking-wide transition-all duration-200 hover:bg-zinc-800 hover:border-sky-500 hover:-translate-y-0.5 active:translate-y-px min-w-[110px] justify-center"
                        aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
                    >
                        {isPlaying ? (
                            <>
                                <FiPause className="w-4 h-4" /> Pause
                            </>
                        ) : (
                            <>
                                <FiPlay className="w-4 h-4" /> Play
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-xl px-[1.1rem] py-[0.6rem] cursor-pointer text-base font-sans tracking-wide transition-all duration-200 hover:bg-zinc-800 hover:border-sky-500 hover:-translate-y-0.5 active:translate-y-px"
                        aria-label="Next quote"
                    >
                        Next <FiChevronRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </section>
    );
}





// Structure des données issues du HTML d'origine
const features = [
    {
        id: 1,
        title: "Details & Summary",
        content: "A built-in web platform disclosure, accessible by default — no JavaScript required.",
        imgSrc: "https://assets.codepen.io/605876/the-faux-phone.png?format=auto"
    },
    {
        id: 2,
        title: "Smooth Height",
        content: "Apply interpolate-size: allow-keywords to create smooth auto-to-open transitions on height/block-size, zero hacks.",
        imgSrc: "https://assets.codepen.io/605876/the-faux-phone-closeup.png?format=auto"
    },
    {
        id: 3,
        title: "Timings",
        content: "Mess with the timings, use linear() to get that little bounce.",
        imgSrc: "https://assets.codepen.io/605876/the-faux-phone-breakdown.png?format=auto"
    },
    {
        id: 4,
        title: "Progressive",
        content: "Start with plain details/summary markup using [name]. Enhance with interpolate-size: allow-keywords. Then add some scripting for the buttons and to switch motion styles.",
        imgSrc: "https://assets.codepen.io/605876/the-faux-phone-parallax.png?format=auto"
    },
    {
        id: 5,
        title: "Follow for more",
        content: (
            <>
                You can find me on{" "}
                <a
                    aria-label="Follow Jhey"
                    href="https://x.com/intent/follow?screen_name=jh3yy"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline hover:text-sky-400 dynamic-link"
                >
                    X
                </a>{" "}
                or consider signing up my{" "}
                <a
                    href="https://craftofui.dev/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline hover:text-sky-400 dynamic-link"
                >
                    newsletter
                </a>.
            </>
        ),
        imgSrc: "https://assets.codepen.io/605876/the-faux-phone-lion-king.png?format=auto"
    }
];

// Image par défaut (la première, ou une de couverture globale)
const defaultImg = "https://assets.codepen.io/605876/the-faux-phone-camera-shot.png?format=auto";

export function FeatureSlider() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [hasCheckedDetails, setHasCheckedDetails] = useState<boolean>(false);

    // Gérer le changement d'état global comme le faisait le script "syncState"
    useEffect(() => {
        if (openIndex === null) {
            setHasCheckedDetails(false);
        } else {
            // Simule un léger délai pour caler l'origine de l'animation après l'ouverture
            const timer = setTimeout(() => setHasCheckedDetails(true), 50);
            return () => clearTimeout(timer);
        }
    }, [openIndex]);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleNext = () => {
        if (openIndex !== null) {
            setOpenIndex((openIndex + 1) % features.length);
        }
    };

    const handlePrev = () => {
        if (openIndex !== null) {
            setOpenIndex((openIndex - 1 + features.length) % features.length);
        }
    };

    const handleExit = () => {
        setOpenIndex(null);
    };

    return (
        <div className="relative min-h-screen w-full bg-neutral-950 text-white flex flex-col items-center justify-center p-4 antialiased selection:bg-pink-500/30 selection:text-pink-200">

            {/* Background Grid Pattern standardisé en pur CSS/Tailwind */ /*}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:linear-gradient(-20deg,transparent_40%,white)] pointer-events-none" />

            <section
                data-checking-details={hasCheckedDetails}
                className="relative w-full max-w-[800px] aspect-[4/3] min-h-[500px] flex items-center justify-start gap-4 rounded-2xl bg-black border border-white/10 overflow-hidden group"
            >

                {/* Colonne Accordéons (Gauche) */ /*}
                <div className="pl-16 grid auto-rows-auto w-[300px] items-center justify-items-start gap-2 z-20 flex-initial">
                    {features.map((feature, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={feature.id}
                                className={`w-full inline-block rounded-[28px] overflow-hidden min-h-[56px] transition-colors duration-200 backdrop-blur-md bg-white/10 hover:bg-white/15 ${isOpen ? 'bg-white/10' : ''
                                    }`}
                                style={{
                                    interpolateSize: 'allow-keywords', // Propriété d'animation moderne supportée nativement
                                } as React.CSSProperties}
                            >
                                {/* En-tête (Summary alternatif) */ /*}
                                <button
                                    onClick={() => handleToggle(idx)}
                                    className={`w-full text-left inline-flex gap-2 items-center px-6 rounded-[28px] h-11 min-h-[56px] cursor-pointer whitespace-nowrap font-semibold transition-all duration-500 ease-[var(--bounce)] ${isOpen ? 'opacity-0 pointer-events-none w-[300px]' : 'w-auto'
                                        }`}
                                >
                                    <FiPlus className="w-6 h-6 shrink-0 text-white" />
                                    <span>{feature.title}</span>
                                </button>

                                {/* Contenu expansible contrôlé par l'état */ /*}
                                <div
                                    className={`transition-all duration-500 overflow-hidden ease-[var(--bounce)] ${isOpen
                                        ? 'h-auto opacity-100 mt-[-56px] w-[300px]'
                                        : 'h-0 opacity-0 w-[120px] pointer-events-none'
                                        }`}
                                >
                                    <div className="w-[300px] min-h-[56px] p-6">
                                        <p className="m-0 text-sm leading-relaxed text-neutral-200">{feature.content}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Colonne Images (Droite / Arrière-plan) */ /*}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">

                    <div className={`absolute inset-0 transition-all duration-500 ${openIndex === null ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}>
                        <img
                            src={defaultImg}
                            alt="Default preview"
                            className="absolute top-0 right-0 bottom-0 h-full w-full object-cover object-[calc(50%+4rem)_50%]"
                        />
                    </div>

                    {/* Images dynamiques associées aux fonctionnalités */ /*}
                    {features.map((feature, idx) => {
                        const isOpen = openIndex === idx;

                        // Calcul des classes d'animation complexes selon l'état du panneau
                        let wrapperStyles = "translate-x-0 scale-90 opacity-0";
                        if (isOpen) {
                            wrapperStyles = "translate-x-0 scale-100 opacity-100";
                        } else if (openIndex !== null) {
                            // Si un autre onglet est ouvert, on décale l'image
                            wrapperStyles = "-translate-x-[15%] scale-90 opacity-0";
                        }

                        return (
                            <div
                                key={`img-${feature.id}`}
                                className={`absolute inset-0 transition-transform duration-500 ${isOpen ? 'translate-x-[15%] z-20' : 'translate-x-0 z-0'
                                    }`}
                            >
                                <div
                                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out origin-[50%_100%] ${wrapperStyles}`}
                                >
                                    <img
                                        src={feature.imgSrc}
                                        alt={feature.title}
                                        className="absolute top-0 right-0 bottom-0 h-full w-full object-cover object-right"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={`absolute inset-0 pointer-events-none z-30 transition-all duration-300 ${openIndex === null ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                    }`}>
                    {/* Bouton Précédent */ /*}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 -translate-y-[150%] pointer-events-auto flex items-center justify-center w-9 h-9 border-0 cursor-pointer rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition-all duration-200 text-white"
                        aria-label="Previous feature"
                    >
                        <FiChevronUp className="w-[22px] h-[22px] stroke-[3]" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute left-4 top-1/2 translate-y-[50%] pointer-events-auto flex items-center justify-center w-9 h-9 border-0 cursor-pointer rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition-all duration-200 text-white"
                        aria-label="Next feature"
                    >
                        <FiChevronDown className="w-[22px] h-[22px] stroke-[3]" />
                    </button>

                    <button
                        onClick={handleExit}
                        className="absolute right-4 top-4 pointer-events-auto flex items-center justify-center w-9 h-9 border-0 cursor-pointer rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition-all duration-200 text-white"
                        aria-label="Exit view"
                    >
                        <FiX className="w-[22px] h-[22px] stroke-[3]" />
                    </button>
                </div>

            </section>

            {/* Bouton Profil Créateur Flottant (Bear-link) */ /*}
            <a
                aria-label="Follow Jhey on X"
                className="w-12 h-12 grid place-items-center opacity-80 hover:opacity-100 transition-opacity text-white z-50 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
                href="https://twitter.com/intent/follow?screen_name=jh3yy"
                target="_blank"
                rel="noreferrer noopener"
            >
                <FiTwitter className="w-5 h-5" />
            </a>
        </div>
    );
}













/**
 *  MzaCarousel de la galerie photos
 */ /*


interface CarouselItem {
  id: number;
  bgImage: string;
  title: string;
  kicker: string;
  text: string;
  btnText: string;
}

const CAROUSEL_DATA: CarouselItem[] = [
  {
    id: 1015,
    bgImage: "https://picsum.photos/id/1015/1600/1000",
    title: "Edge Visuals",
    kicker: "Design systems that breathe",
    text: "Build adaptive UI foundations with tokens, motion, and accessible color ramps. Ship faster without sameness.",
    btnText: "See case study",
  },
  {
    id: 1011,
    bgImage: "https://picsum.photos/id/1011/1600/1000",
    title: "Realtime Dashboards",
    kicker: "Signal over noise",
    text: "Stream metrics, smooth spikes, and highlight deltas. Clarity first, chrome last.",
    btnText: "View live demo",
  },
  {
    id: 1018,
    bgImage: "https://picsum.photos/id/1018/1600/1000",
    title: "Brand Motion",
    kicker: "Identity in motion",
    text: "Translate marks into kinetic systems. Timing, easing, and restraint create memory.",
    btnText: "Explore reels",
  },
  {
    id: 1021,
    bgImage: "https://picsum.photos/id/1021/1600/1000",
    title: "E-commerce UX",
    kicker: "Frictionless paths",
    text: "Model intent, compress choice, and keep the dopamine loop honest. Checkout in one breath.",
    btnText: "See patterns",
  },
  {
    id: 1005,
    bgImage: "https://picsum.photos/id/1005/1600/1000",
    title: "Content Engines",
    kicker: "Scale without sludge",
    text: "Structured content, image policy, and smart defaults. Publish daily, stay sharp.",
    btnText: "Read playbook",
  },
];

// Configuration par défaut & Breakpoints identiques au code initial
const OPTS = {
  gap: 28,
  peek: 0.15,
  rotateY: 34,
  zDepth: 150,
  scaleDrop: 0.09,
  blurMax: 2.0,
  activeLeftBias: 0.12,
  interval: 4500,
  transitionMs: 900,
};

export function MzaCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPos, setCurrentPos] = useState(0);

  // État mutable interne pour éviter les re-renders intempestifs durant le drag & RAF
  const stateRef = useRef({
    index: 0,
    pos: 0,
    slideW: 880,
    gap: 28,
    dragging: false,
    pointerId: null as number | null,
    x0: 0,
    v: 0,
    t0: 0,
    animating: false,
    hovering: false,
    startTime: 0,
    pausedAt: 0,
  });

  const n = CAROUSEL_DATA.length;

  const mod = (i: number, n: number) => ((i % n) + n) % n;

  // Mesure des dimensions de l'écran et adaptation responsive
  const measure = () => {
    if (!viewportRef.current || !rootRef.current) return;
    const w = window.innerWidth;

    // Reproduction dynamique des breakpoints CSS/JS d'origine
    let currentOpts = { ...OPTS };
    if (w <= 560) {
      currentOpts = {
        ...currentOpts,
        gap: 12,
        peek: 0.05,
        rotateY: 12,
        zDepth: 60,
        scaleDrop: 0.05,
        activeLeftBias: 0.07,
      };
    } else if (w <= 768) {
      currentOpts = {
        ...currentOpts,
        gap: 14,
        peek: 0.06,
        rotateY: 16,
        zDepth: 70,
        scaleDrop: 0.06,
        activeLeftBias: 0.08,
      };
    } else if (w <= 1000) {
      currentOpts = {
        ...currentOpts,
        gap: 18,
        peek: 0.09,
        rotateY: 22,
        zDepth: 90,
        scaleDrop: 0.07,
        activeLeftBias: 0.09,
      };
    } else if (w <= 1200) {
      currentOpts = {
        ...currentOpts,
        gap: 24,
        peek: 0.12,
        rotateY: 28,
        zDepth: 120,
        scaleDrop: 0.08,
        activeLeftBias: 0.1,
      };
    }

    const viewRect = viewportRef.current.getBoundingClientRect();
    const pagSpace =
      64 + Math.max(12, Math.round(window.innerHeight - viewRect.bottom));
    const cardH = Math.max(
      320,
      Math.min(640, Math.round(viewRect.height - pagSpace)),
    );

    stateRef.current.slideW = Math.min(
      880,
      viewRect.width * (1 - currentOpts.peek * 2),
    );
    stateRef.current.gap = currentOpts.gap;

    rootRef.current.style.setProperty("--mzaPagH", `${pagSpace}px`);
    rootRef.current.style.setProperty("--mzaCardH", `${cardH}px`);

    renderSlides(stateRef.current.pos, currentOpts);
  };

  // Calcul mathématique matriciel 3D et rendu manuel direct pour de hautes performances
  const renderSlides = (pos: number, currentOpts = OPTS) => {
    if (!rootRef.current) return;
    const span = stateRef.current.slideW + stateRef.current.gap;
    const tiltX = parseFloat(
      rootRef.current.style.getPropertyValue("--mzaTiltX") || "0",
    );
    const tiltY = parseFloat(
      rootRef.current.style.getPropertyValue("--mzaTiltY") || "0",
    );

    slidesRef.current.forEach((slide, i) => {
      if (!slide) return;
      let d = i - pos;
      if (d > n / 2) d -= n;
      if (d < -n / 2) d += n;

      const weight = Math.max(0, 1 - Math.abs(d) * 2);
      const biasActive =
        -stateRef.current.slideW * currentOpts.activeLeftBias * weight;
      const tx = d * span + biasActive;
      const depth = -Math.abs(d) * currentOpts.zDepth;
      const rot = -d * currentOpts.rotateY;
      const scale = 1 - Math.min(Math.abs(d) * currentOpts.scaleDrop, 0.42);
      const blur = Math.min(
        Math.abs(d) * currentOpts.blurMax,
        currentOpts.blurMax,
      );
      const z = Math.round(1000 - Math.abs(d) * 10);

      slide.style.transform = `translate3d(${tx}px,-50%,${depth}px) rotateY(${rot}deg) scale(${scale})`;
      slide.style.filter = `blur(${blur}px)`;
      slide.style.zIndex = `${z}`;

      const card = slide.querySelector(".mzaCard") as HTMLDivElement;
      if (card) {
        const parBase = Math.max(-1, Math.min(1, -d));
        const parX = parBase * 48 + tiltY * 2.0;
        const parY = tiltX * -1.5;
        const bgX = parBase * -64 + tiltY * -2.4;
        card.style.setProperty("--mzaParX", `${parX.toFixed(2)}px`);
        card.style.setProperty("--mzaParY", `${parY.toFixed(2)}px`);
        card.style.setProperty("--mzaParBgX", `${bgX.toFixed(2)}px`);
        card.style.setProperty("--mzaParBgY", `${(parY * 0.35).toFixed(2)}px`);
      }
    });

    const active = mod(Math.round(pos), n);
    setCurrentPos(active);
  };

  const goTo = (targetIndex: number, animate = true) => {
    const start = stateRef.current.pos;
    let d = targetIndex - Math.round(start);
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    const end = Math.round(start) + d;

    const dur = animate ? OPTS.transitionMs : 0;
    const t0 = performance.now();
    const ease = (x: number) => 1 - Math.pow(1 - x, 4);

    stateRef.current.animating = true;

    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / dur);
      const p = dur ? ease(t) : 1;
      const nextPos = start + (end - start) * p;
      stateRef.current.pos = nextPos;
      renderSlides(nextPos);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        const finalIndex = mod(Math.round(nextPos), n);
        stateRef.current.index = finalIndex;
        stateRef.current.pos = finalIndex;
        stateRef.current.animating = false;
        setActiveIndex(finalIndex);
        renderSlides(finalIndex);
        stateRef.current.startTime = performance.now();
      }
    };
    requestAnimationFrame(step);
  };

  // Gestionnaires de Drag (Pointer Events)
  const onDragStart = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stateRef.current.dragging = true;
    stateRef.current.pointerId = e.pointerId;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    stateRef.current.x0 = e.clientX;
    stateRef.current.t0 = performance.now();
    stateRef.current.v = 0;
    stateRef.current.pausedAt = performance.now();
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (
      !stateRef.current.dragging ||
      e.pointerId !== stateRef.current.pointerId
    )
      return;
    const dx = e.clientX - stateRef.current.x0;
    const dt = Math.max(16, performance.now() - stateRef.current.t0);
    stateRef.current.v = dx / dt;
    const slideSpan = stateRef.current.slideW + stateRef.current.gap;
    const nextPos = mod(stateRef.current.index - dx / slideSpan, n);
    stateRef.current.pos = nextPos;
    renderSlides(nextPos);
  };

  const onDragEnd = () => {
    if (!stateRef.current.dragging) return;
    stateRef.current.dragging = false;
    try {
      if (stateRef.current.pointerId !== null) {
        viewportRef.current?.releasePointerCapture(stateRef.current.pointerId);
      }
    } catch {}
    stateRef.current.pointerId = null;

    if (stateRef.current.pausedAt) {
      stateRef.current.startTime +=
        performance.now() - stateRef.current.pausedAt;
      stateRef.current.pausedAt = 0;
    }

    const v = stateRef.current.v;
    const threshold = 0.18;
    const target = Math.round(
      stateRef.current.pos - Math.sign(v) * (Math.abs(v) > threshold ? 0.5 : 0),
    );
    goTo(mod(target, n));
  };

  const onTilt = (e: React.MouseEvent) => {
    if (!viewportRef.current || !rootRef.current) return;
    const r = viewportRef.current.getBoundingClientRect();
    const mx = (e.clientX - r.left) / r.width - 0.5;
    const my = (e.clientY - r.top) / r.height - 0.5;
    rootRef.current.style.setProperty("--mzaTiltX", (my * -6).toFixed(3));
    rootRef.current.style.setProperty("--mzaTiltY", (mx * 6).toFixed(3));
    renderSlides(stateRef.current.pos);
  };

  useEffect(() => {
    measure();
    stateRef.current.startTime = performance.now();

    // Auto-play Loop
    let rafId: number;
    const loop = (t: number) => {
      if (
        !stateRef.current.dragging &&
        !stateRef.current.hovering &&
        !stateRef.current.animating
      ) {
        const elapsed = t - stateRef.current.startTime;
        const p = Math.min(1, elapsed / OPTS.interval);
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${p})`;
        }
        if (elapsed >= OPTS.interval) {
          goTo(mod(stateRef.current.index + 1, n));
        }
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // Événements clavier globaux
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(mod(stateRef.current.index - 1, n));
      if (e.key === "ArrowRight") goTo(mod(stateRef.current.index + 1, n));
    };

    window.addEventListener("resize", measure);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative h-screen max-w-full mx-auto px-[18px] overflow-hidden select-none touch-none"
      style={{ contain: "layout paint" }}
      onMouseEnter={() => {
        stateRef.current.hovering = true;
        stateRef.current.pausedAt = performance.now();
      }}
      onMouseLeave={() => {
        if (stateRef.current.pausedAt) {
          stateRef.current.startTime +=
            performance.now() - stateRef.current.pausedAt;
          stateRef.current.pausedAt = 0;
        }
        stateRef.current.hovering = false;
      }}
    >
      <div
        ref={viewportRef}
        className="relative outline-none overflow-hidden h-full cursor-grab active:cursor-grabbing"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
        onMouseMove={onTilt}
      >
        {/* Track 3D */ /*}
        <div
          className="relative overflow-hidden"
          style={{
            height:
              "calc(100% - var(--mzaPagH) - max(env(safe-area-inset-bottom), 12px))",
            transformStyle: "preserve-3d",
            perspective: "1200px",
          }}
        >
          {CAROUSEL_DATA.map((item, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  slidesRef.current[i] = el;
                }}
                className="absolute top-[calc(50%+5px)] left-50% w-[var(--mzaC-slideW,min(880px,90vw))] rounded-[22px] overflow-hidden will-change-transform"
                style={{
                  transformStyle: "preserve-3d",
                  height: "min(var(--mzaCardH,500px), calc(100% - 50px))",
                  left: "50%",
                  marginLeft: "calc(var(--mzaC-slideW,min(880px,90vw)) / -2)",
                }}
              >
                {/* Card Element */ /*}
                <div
                  className={`mzaCard relative w-full h-full rounded-inherit overflow-hidden bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-[4px] backdrop-saturate-[120%] transform translate-z-0 transition-shadow duration-500 ${
                    isActive
                      ? "shadow-[0_30px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/5"
                      : ""
                  }`}
                >
                  <div
                    className={`absolute -inset-[2%] bg-cover bg-center scale-[1.18] -translate-z-[60px] transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0,1)] ${
                      isActive
                        ? "contrast-[1.06] saturate-[1.12] brightness-[1.02]"
                        : "contrast-[1.02] saturate-[1.08] brightness-[0.9]"
                    }`}
                    style={{
                      backgroundImage: `url('${item.bgImage}')`,
                      transform: `translate3d(var(--mzaParBgX, 0px), var(--mzaParBgY, 0px), -60px) scale(1.18)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/25 z-[1]" />

                  <header
                    className="absolute inset-[20px_auto_auto_20px] z-[2] transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0,1)]"
                    style={{
                      transform: `translate3d(calc(var(--mzaParX, 0px) * 0.35), calc(var(--mzaParY, 0px) * 0.35), 0)`,
                    }}
                  >
                    <h2 className="m-0 font-[800] tracking-[0.2px] text-[clamp(22px,3.1vw,38px)] text-white text-shadow-lg leading-[110%]">
                      {item.title}
                    </h2>
                    <p className="m-0 mt-2 color-[#9ef7d2] text-[clamp(12px,1.7vw,14px)] font-[600] text-[#9ef7d2]">
                      {item.kicker}
                    </p>
                  </header>

                  <p
                    className="absolute inset-[auto_20px_85px_20px] z-[2] max-w-[60ch] bg-black/40 p-5 backdrop-blur-[5px] rounded-[10px] text-zinc-300 text-[0.9rem] leading-relaxed max-md:max-w-[45%] line-clamp-3"
                    style={{
                      transform: `translate3d(calc(var(--mzaParX, 0px) * 0.25), calc(var(--mzaParY, 0px) * 0.25), 0)`,
                    }}
                  >
                    {item.text}
                  </p>

                  <footer
                    className="absolute inset-[auto_auto_18px_18px] z-[2]"
                    style={{
                      transform: `translate3d(calc(var(--mzaParX, 0px) * 0.18), calc(var(--mzaParY, 0px) * 0.18), 0)`,
                    }}
                  >
                    <button className="border border-[#9ef7d2] rounded-[14px] px-5 py-[15px] font-[700] text-[#0b0e13] bg-gradient-to-b from-[#9ef7d2] to-[#517e6b] shadow-[0_3px_15px_rgba(130,160,255,0.75)] active:translate-y-[1px] active:shadow-sm transition-all duration-200">
                      {item.btnText}
                    </button>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between pointer-events-none px-4">
        <button
          onClick={() => goTo(mod(stateRef.current.index - 1, n))}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={() => goTo(mod(stateRef.current.index + 1, n))}
          className="pointer-events-auto w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all active:scale-95"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */ /*}
      <div className="absolute left-0 right-0 bottom-[max(27px,env(safe-area-inset-bottom))] flex gap-2.5 justify-center items-center">
        {CAROUSEL_DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentPos === i
                ? "bg-gradient-to-b from-[#82a0ff] to-[#9ef7d2] scale-[1.35]"
                : "bg-white/25"
            }`}
            aria-selected={currentPos === i}
            role="tab"
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Global Progress Bar */ /*}
      <div className="fixed left-0 right-0 bottom-0 h-1 bg-white/10 z-[9999] overflow-hidden">
        <span
          ref={progressBarRef}
          className="block h-full w-screen origin-left scale-x-0 will-change-transform bg-gradient-to-r from-[#9ef7d2] to-[#82a0ff]"
        />
      </div>
    </div>
  );
}

 */
