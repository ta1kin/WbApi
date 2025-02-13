import { Knex } from 'knex'

/**
 * Создает таблицу `google_sheets` в базе данных.
 *
 * @param {Knex} knex - Экземпляр Knex для выполнения операций с БД.
 * @returns {Promise<void>} Промис, который выполняется после завершения миграции.
 */
export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('google_sheets', table => {
		table.increments('id').primary()
		table.string('spreadsheet_id').notNullable().unique()
		table.timestamp('created_at').defaultTo(knex.fn.now())
	})
}

/**
 * Откатывает миграцию, удаляя таблицу `google_sheets`.
 *
 * @param {Knex} knex - Экземпляр Knex для выполнения операций с БД.
 * @returns {Promise<void>} Промис, который выполняется после завершения отката.
 */
export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('google_sheets')
}
