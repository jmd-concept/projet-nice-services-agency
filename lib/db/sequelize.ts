import { Sequelize } from "sequelize";
import dbOptions from "../db/dbConfig";

const isProd: boolean = process.env.NODE_ENV === "production";

const createInstance = (): Sequelize => {
    if (isProd && process.env.BD_URL) {
        return new Sequelize(process.env.BD_URL, dbOptions);
    }

    if (!isProd) {
        return new Sequelize(
            process.env.DEV_DB_NAME as string,
            process.env.DEV_DB_USER as string,
            process.env.DEV_DB_PASSWORD as string,
            {
                host: process.env.DEV_DB_HOST,
                port: Number(process.env.DEV_DB_PORT),
                ...dbOptions,
            }
        );
    }

    return new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        (process.env.DB_PWD || process.env.DB_PASSWORD) as string,
        {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            ...dbOptions,
        }
    );
};

// Singleton global
const globalForSequelize = global as typeof global & {
    sequelize?: Sequelize;
};

const sequelize: Sequelize =
    globalForSequelize.sequelize || createInstance();

if (!isProd) {
    globalForSequelize.sequelize = sequelize;
}

export default sequelize;
