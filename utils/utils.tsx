import Swal, { SweetAlertIcon } from 'sweetalert2';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

/**
 * Détecte les changements de connexion internet et avertit l'utilisateur.
 */
export const detecteConnexionInternet = (): void => {
    if (typeof window === "undefined") return;

    // 1. Vérification au chargement initial de l'application
    if (!navigator.onLine) {
        triggerNotification("Statut de connexion internet", "❌ Vous êtes hors connexion");
        alertnotification("warning", "Vous êtes hors ligne. Veuillez vous connecter à internet.");
    }

    // 2. Écoute dynamique des changements d'état
    window.addEventListener("offline", () => {
        triggerNotification("Statut de connexion internet", "❌ Vous êtes hors connexion");
        alertnotification("warning", "Vous êtes hors ligne. Veuillez vous connecter à internet.");
    });

    window.addEventListener("online", () => {
        triggerNotification("Statut de connexion internet", "✅ Connexion rétablie");
        alertnotification("success", "Connexion rétablie avec succès !");
    });
};

/**
 * Déclenche une notification native du système (Notification API)
 */
export const triggerNotification = (
    titre: string = "Bienvenue sur JMD RestoConnect ! 🎉",
    message: string = "Vous avez activé les notifications."
): void => {
    if (typeof window !== "undefined" && "Notification" in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification(titre, {
                    body: message,
                    icon: "/favicon.ico",
                    badge: "/favicon.ico",
                    tag: "n.services agency"
                });
            }
        });
    }
};

/**
 * Affiche une alerte stylisée à l'écran via SweetAlert2
 */
export const alertnotification = (type: NotificationType = 'success', message: string): void => {
    const configs: Record<NotificationType, { title: string; text: string; icon: SweetAlertIcon; confirmButtonColor: string }> = {
        success: {
            title: 'Opération réussie',
            text: message || 'Les données ont été modifiées avec succès !',
            icon: 'success',
            confirmButtonColor: '#7cd1f9'
        },
        error: {
            title: 'Une erreur est survenue',
            text: message || "Impossible d'enregistrer les modifications.",
            icon: 'error',
            confirmButtonColor: '#e74c3c'
        },
        warning: {
            title: 'Attention',
            text: message || "Cette action pourrait impacter d'autres utilisateurs.",
            icon: 'warning',
            confirmButtonColor: '#f39c12'
        },
        info: {
            title: 'Information',
            text: message || 'Une mise à jour système est prévue ce soir.',
            icon: 'info',
            confirmButtonColor: '#3498db'
        }
    };

    // Appel de SweetAlert avec la configuration typée
    Swal.fire(configs[type]);
};

