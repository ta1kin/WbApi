import knex from 'knex'
import config from '../../knexfile'


/**
 * Создаёт и экспортирует экземпляр Knex для работы с базой данных.
 * 
 * - Использует конфигурацию из `knexfile.ts` (раздел `development`).
 * - Позволяет выполнять SQL-запросы через Knex в проекте.
 */
const db = knex(config.development)

export default db
