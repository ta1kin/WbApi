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
 * Создает таблицу `google_sheets` в базе данных.
 *
 * @param {Knex} knex - Экземпляр Knex для выполнения операций с БД.
 * @returns {Promise<void>} Промис, который выполняется после завершения миграции.
 */
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable('google_sheets', table => {
            table.increments('id').primary();
            table.string('spreadsheet_id').notNullable().unique();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
    });
}
/**
 * Откатывает миграцию, удаляя таблицу `google_sheets`.
 *
 * @param {Knex} knex - Экземпляр Knex для выполнения операций с БД.
 * @returns {Promise<void>} Промис, который выполняется после завершения отката.
 */
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTableIfExists('google_sheets');
    });
}
