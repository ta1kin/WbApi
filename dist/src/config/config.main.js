"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = exports.API_KEY = exports.DB_PORT = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = exports.isDev = exports.NODE_ENV = exports.POSTFIX = exports.HOST = exports.N = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
/**
 * Порт, на котором запускается сервер.
 * Берётся из переменной окружения `PORT`, либо по умолчанию `3000`.
 */
exports.PORT = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 3000;
/**
 * Количество создаваемых Google-таблиц.
 * Берётся из переменной окружения `N`, либо по умолчанию `3`.
 */
exports.N = (_b = Number(process.env.N)) !== null && _b !== void 0 ? _b : 3;
/**
 * Хост сервера.
 * Берётся из переменной окружения `HOST`, либо по умолчанию `'localhost'`.
 */
exports.HOST = (_c = String(process.env.HOST)) !== null && _c !== void 0 ? _c : 'localhost';
/**
 * Постфикс API.
 * Используется для построения путей API.
 * Берётся из переменной окружения `POSTFIX`, либо по умолчанию `'api'`.
 */
exports.POSTFIX = String(process.env.POSTFIX) || 'api';
/**
 * Окружение, в котором работает приложение.
 * Берётся из переменной окружения `NODE_ENV`, либо по умолчанию `'development'`.

 */
exports.NODE_ENV = (_d = String(process.env.NODE_ENV)) !== null && _d !== void 0 ? _d : 'development';
/**
 * Флаг, указывающий, работает ли приложение в режиме разработки.
 */
exports.isDev = exports.NODE_ENV === 'development';
/**
 * Хост базы данных.
 * Берётся из переменной окружения `DB_HOST`, либо по умолчанию `'db'`.
 */
exports.DB_HOST = (_e = String(process.env.DB_HOST)) !== null && _e !== void 0 ? _e : 'db';
/**
 * Имя пользователя базы данных.
 * Берётся из переменной окружения `DB_USER`, либо по умолчанию `'postgres'`.
 */
exports.DB_USER = (_f = String(process.env.DB_USER)) !== null && _f !== void 0 ? _f : 'postgres';
/**
 * Пароль для подключения к базе данных.
 * Берётся из переменной окружения `DB_PASSWORD`, либо по умолчанию `'p0o9i8u7'`.
 */
exports.DB_PASSWORD = (_g = String(process.env.DB_PASSWORD)) !== null && _g !== void 0 ? _g : 'p0o9i8u7';
/**
 * Название базы данных.
 * Берётся из переменной окружения `DB_NAME`, либо по умолчанию `'wildberries_db'`.
 */
exports.DB_NAME = (_h = String(process.env.DB_NAME)) !== null && _h !== void 0 ? _h : 'wildberries_db';
/**
 * Порт базы данных.
 * Берётся из переменной окружения `DB_PORT`, либо по умолчанию `5432`.
 */
exports.DB_PORT = (_j = Number(process.env.DB_PORT)) !== null && _j !== void 0 ? _j : 5432;
/**
 * API-ключ для аутентификации при запросах к внешнему API.
 * Берётся из переменной окружения `API_KEY`, либо по умолчанию `'your_key'`.
 */
exports.API_KEY = (_k = process.env.API_KEY) !== null && _k !== void 0 ? _k : 'default_value';
/**
 * URL внешнего API для получения тарифов.
 * Берётся из переменной окружения `API_URL`, либо по умолчанию `'https://common-api.wildberries.ru/api/v1/tariffs/box'`.
 */
exports.API_URL = String(process.env.API_URL) || 'https://common-api.wildberries.ru/api/v1/tariffs/box';
