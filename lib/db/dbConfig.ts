import mysql2 from "mysql2";
import { Options } from "sequelize";

const isProd: boolean = process.env.NODE_ENV === "production";

export const dbOptions: Options = {
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
    pool: {
        max: isProd ? 10 : 3,
        min: 1,
        acquire: 20000,
        idle: 50000,
        evict: 1000,
    },
    dialectOptions: {
        connectTimeout: 30000,
        ...(isProd && {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }),
    },
};

export default dbOptions;
