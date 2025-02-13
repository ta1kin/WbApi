import type { Knex } from 'knex'
import {
	DB_HOST,
	DB_NAME,
	DB_PASSWORD,
	DB_USER,
	DB_PORT
} from './src/config/config.main'

/**
 * Конфигурация базы данных для Knex.
 * 
 * Определяет параметры подключения к PostgreSQL и настройки миграций.
 */
const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'pg',
		connection: {
			host: DB_HOST,
			port: DB_PORT,
			user: DB_USER,
			password: DB_PASSWORD,
			database: DB_NAME,
		},
		migrations: {
			directory: './src/db/migrations',
			extension: 'ts',
		},
	},
}

export default config
