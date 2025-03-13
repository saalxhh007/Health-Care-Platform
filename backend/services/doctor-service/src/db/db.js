import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pg from "pg";
const { Client } = pg

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const client = new Client({
    user: dbUser,
    host: dbHost,
    database: "postgres",
    password: dbPassword,
    port: dbPort,
});

async function ensureDatabaseExists() {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}';`);
    if (res.rowCount === 0) {
        console.log(`Database "${dbName}" does not exist. Creating now...`);
        await client.query(`CREATE DATABASE ${dbName};`);
        console.log(`Database "${dbName}" created successfully.`);
    }
    await client.end();
}

await ensureDatabaseExists();

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "postgres",
    logging: false,
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
    },
});

sequelize.authenticate()
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Database connection error:", err));
