import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

dotenv.config();

export const appConfig = {
    port: process.env.PORT || 3030,
    corsOrigin: process.env.CORS_ORIGIN || ''
}

const ormConfigBase = {
    username: process.env.DB_USERNAME,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: [path.join(__dirname,'./entity/**/*.entity.js')]
}


const ormConfig = {
    
    development: {
        ...ormConfigBase,
        entities: [path.join(__dirname, '../entity/**/*.entity.ts')],
        synchronize: true
    },

    production: {
        ...ormConfigBase,
        synchronize:false
    }

}

const config:any = ormConfig[process.env.NODE_ENV];
const AppDataSource = new DataSource(config);

export default AppDataSource;
