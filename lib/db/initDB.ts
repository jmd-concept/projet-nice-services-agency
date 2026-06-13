import sequelize from "@/lib/db/sequelize";
import "@/models/Abonnes..model"

let initialized = false;

export async function initDB(): Promise<typeof sequelize> {
    if (initialized) return sequelize;

    try {
        await sequelize.authenticate();

        if (process.env.NODE_ENV === "development") {
            await sequelize.sync();
            console.log("📡 [DB] Schéma synchronisé (Dev).");
        }

        console.log("✅ [DB] Connexion établie.");
        initialized = true;
        return sequelize;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("❌ [DB] Erreur d'initialisation :", error.message);
        } else {
            console.error("❌ [DB] Erreur inconnue :", error);
        }
        throw error;
    }
}
