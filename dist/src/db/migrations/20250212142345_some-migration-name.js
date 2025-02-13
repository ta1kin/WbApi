"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
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
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('warehouse_tariffs', table => {
            table.increments('id').primary();
            table.string('warehouse_name').notNullable();
            table.decimal('box_delivery_and_storage_expr');
            table.decimal('box_delivery_base');
            table.decimal('box_delivery_liter');
            table.decimal('box_storage_base');
            table.decimal('box_storage_liter');
            table.date('dt_next_box');
            table.date('dt_till_max');
            table.date('date').notNullable();
            table.unique(['warehouse_name', 'date']);
        });
    });
}
/**
 * Функция для отмены миграции (удаление таблицы `warehouse_tariffs`).
 *
 * - Удаляет таблицу `warehouse_tariffs` из базы данных.
 *
 * @param {Knex} knex - Экземпляр Knex для выполнения операций с базой данных.
 * @returns {Promise<void>} Промис без возвращаемого значения.
 */
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable('warehouse_tariffs');
    });
}
