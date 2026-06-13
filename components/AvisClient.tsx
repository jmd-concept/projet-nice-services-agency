import React from 'react';
import { listeAvis, Avis } from "@/lib/constante";

// 3. Sous-composant pour le rendu des étoiles
const Etoiles: React.FC<{ note: number }> = ({ note }) => {
  return (
    <div className="flex items-center text-amber-400">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-5 w-5 ${index < note ? 'fill-current' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// 4. Sous-composant pour la carte d'avis individuelle
const AvisCard: React.FC<{ avis: Avis }> = ({ avis }) => {
  return (
    <div className="flex flex-col justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div>
        {/* Étoiles et Date */}
        <div className="flex items-center justify-between mb-4">
          <Etoiles note={avis.note} />
          <span className="text-xs text-gray-400">{avis.date}</span>
        </div>
        
        {/* Commentaire */}
        <p className="text-gray-600 italic leading-relaxed mb-6">
          "{avis.commentaire}"
        </p>
      </div>

      {/* Profil de l'utilisateur */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
        <img
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          src={avis.avatar}
          alt={avis.nom}
        />
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{avis.nom}</h4>
          <p className="text-xs text-gray-500">{avis.role}</p>
        </div>
      </div>
    </div>
  );
};

// 5. Composant Principal Exporté
export const AvisClients: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">
            Témoignages
          </h2>
          <p className="mt-8 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
            Ce que nos clients disent de N-Services Agency
          </p>
          <p className="mt-6 text-lg text-gray-500">
            La confiance de nos partenaires et utilisateurs est notre plus belle réussite. Découvrez leurs retours d'expérience.
          </p>
        </div>

        {/* Grille des avis */}
        <div className="m-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listeAvis.map((item) => (
            <AvisCard key={item.id} avis={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AvisClients;