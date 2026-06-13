//ICONS
import {
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const socials = [
  {
    name: "WhatsApp",
    label: "Suivez-nous sur WhatsApp",
    href: "https://wa.me/243824912430", // À remplacer par vos liens réels
    icon: FaWhatsapp,
  },
  {
    name: "Facebook",
    label: "Suivez-nous sur Facebook",
    href: "https://facebook.com/votre_page", // À remplacer par vos liens réels
    icon: FiFacebook,
  },
  {
    name: "Instagram",
    label: "Suivez-nous sur Instagram",
    href: "https://instagram.com/votre_compte",
    icon: FiInstagram,
  },
  {
    name: "X (Twitter)",
    label: "Suivez-nous sur X",
    href: "https://twitter.com/votre_compte",
    icon: FiTwitter,
  },
  {
    name: "YouTube",
    label: "Abonnez-vous sur YouTube",
    href: "https://youtube.com/votre_chaine",
    icon: FiYoutube,
  },
];


export const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4">
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            aria-label={social.label}
            className="w-12 h-12 grid place-items-center opacity-80 hover:opacity-100 transition-all duration-300 text-white z-50 bg-white/5 hover:bg-white/10 hover:scale-105 rounded-full border border-white/10 backdrop-blur-sm"
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;