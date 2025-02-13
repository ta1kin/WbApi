import dotenv from 'dotenv'

dotenv.config({ path: '.env' })


/**
 * Порт, на котором запускается сервер.
 * Берётся из переменной окружения `PORT`, либо по умолчанию `3000`.
 */
export const PORT: number = Number(process.env.PORT) ?? 3000

/**
 * Количество создаваемых Google-таблиц.
 * Берётся из переменной окружения `N`, либо по умолчанию `3`.
 */
export const N: number = Number(process.env.N) ?? 3

/**
 * Хост сервера.
 * Берётся из переменной окружения `HOST`, либо по умолчанию `'localhost'`.
 */
export const HOST: string = String(process.env.HOST) ?? 'localhost'

/**
 * Постфикс API.
 * Используется для построения путей API.
 * Берётся из переменной окружения `POSTFIX`, либо по умолчанию `'api'`.
 */
export const POSTFIX: string = String(process.env.POSTFIX) || 'api'

/**
 * Окружение, в котором работает приложение.
 * Берётся из переменной окружения `NODE_ENV`, либо по умолчанию `'development'`.

 */
export const NODE_ENV: string = String(process.env.NODE_ENV) ?? 'development'

/**
 * Флаг, указывающий, работает ли приложение в режиме разработки.
 */
export const isDev: boolean = NODE_ENV === 'development'

/**
 * Хост базы данных.
 * Берётся из переменной окружения `DB_HOST`, либо по умолчанию `'db'`.
 */
export const DB_HOST: string = String(process.env.DB_HOST) ?? 'db'

/**
 * Имя пользователя базы данных.
 * Берётся из переменной окружения `DB_USER`, либо по умолчанию `'postgres'`.
 */
export const DB_USER: string = String(process.env.DB_USER) ?? 'postgres'

/**
 * Пароль для подключения к базе данных.
 * Берётся из переменной окружения `DB_PASSWORD`, либо по умолчанию `'p0o9i8u7'`.
 */
export const DB_PASSWORD: string = String(process.env.DB_PASSWORD) ?? 'p0o9i8u7'

/**
 * Название базы данных.
 * Берётся из переменной окружения `DB_NAME`, либо по умолчанию `'wildberries_db'`.
 */
export const DB_NAME: string = String(process.env.DB_NAME) ?? 'wildberries_db'

/**
 * Порт базы данных.
 * Берётся из переменной окружения `DB_PORT`, либо по умолчанию `5432`.
 */
export const DB_PORT: number = Number(process.env.DB_PORT) ?? 5432

/**
 * API-ключ для аутентификации при запросах к внешнему API.
 * Берётся из переменной окружения `API_KEY`, либо по умолчанию `'your_key'`.
 */
export const API_KEY: string = process.env.API_KEY ?? 'default_value'

/**
 * URL внешнего API для получения тарифов.
 * Берётся из переменной окружения `API_URL`, либо по умолчанию `'https://common-api.wildberries.ru/api/v1/tariffs/box'`.
 */
export const API_URL: string = String(process.env.API_URL) || 'https://common-api.wildberries.ru/api/v1/tariffs/box'
