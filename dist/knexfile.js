"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_main_1 = require("./src/config/config.main");
/**
 * Конфигурация базы данных для Knex.
 *
 * Определяет параметры подключения к PostgreSQL и настройки миграций.
 */
const config = {
    development: {
        client: 'pg',
        connection: {
            host: config_main_1.DB_HOST,
            port: config_main_1.DB_PORT,
            user: config_main_1.DB_USER,
            password: config_main_1.DB_PASSWORD,
            database: config_main_1.DB_NAME,
        },
        migrations: {
            directory: './src/db/migrations',
            extension: 'ts',
        },
    },
};
exports.default = config;
