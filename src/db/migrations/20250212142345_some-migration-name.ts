import { Knex } from 'knex'


/**
 * Функция для применения миграции (создание таблицы `warehouse_tariffs`).
 * 
 * - Создаёт таблицу `warehouse_tariffs` для хранения тарифов складов.
 * - Включает в себя идентификатор, название склада, тарифные данные и даты.
 * - Добавляет уникальный индекс по `warehouse_name` и `date`.
 * 
 * @param {Knex} knex - Экземпляр Knex для выполнения операций с базой данных.
 * @returns {Promise<void>} Промис без возвращаемого значения.
 */
export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('warehouse_tariffs', table => {
		table.increments('id').primary()
		table.string('warehouse_name').notNullable()
		table.decimal('box_delivery_and_storage_expr')
		table.decimal('box_delivery_base')
		table.decimal('box_delivery_liter')
		table.decimal('box_storage_base')
		table.decimal('box_storage_liter')
		table.date('dt_next_box')
		table.date('dt_till_max')
		table.date('date').notNullable()
		table.unique(['warehouse_name', 'date'])
	})
}

/**
 * Функция для отмены миграции (удаление таблицы `warehouse_tariffs`).
 * 
 * - Удаляет таблицу `warehouse_tariffs` из базы данных.
 * 
 * @param {Knex} knex - Экземпляр Knex для выполнения операций с базой данных.
 * @returns {Promise<void>} Промис без возвращаемого значения.
 */
export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('warehouse_tariffs')
}
