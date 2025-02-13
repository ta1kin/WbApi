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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const service_1 = require("./service");
const googleSheetsService_1 = require("./googleSheetsService");
const database_1 = __importDefault(require("./db/database"));
const node_cron_1 = __importDefault(require("node-cron"));
const config_main_1 = require("./config/config.main");
/**
 * Основная функция, выполняющая первоначальное обновление тарифов
 * и настраивающая крон-задачу для их периодического обновления.
 *
 * Этапы выполнения функции:
 * 	1. выполняет обновление тарифов, вызывая `fetchAndStoreTariffs(knex)`.
 * 	2. запускает крон-задачу, которая обновляет тарифы каждый час.
 * 	3. в случае ошибки выводит сообщение в консоль.
 * 	4. в конце освобождает ресурсы, закрывая соединение с базой данных.
 *
 * @returns {Promise<void>}
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Очистка таблицы Google Sheets в БД
            yield (0, database_1.default)('google_sheets').del();
            console.log('Таблица google_sheets очищена.');
            // Создание новых Google-таблиц
            const sheetIds = yield (0, googleSheetsService_1.createGoogleSheets)(config_main_1.N);
            yield (0, database_1.default)('google_sheets').insert(sheetIds.map(id => ({ spreadsheet_id: id })));
            console.log('Google-таблицы успешно созданы и сохранены в БД');
            // Запрос данных из API и сохранение в БД
            yield (0, service_1.fetchAndStoreTariffs)(database_1.default);
            console.log('Тарифы успешно обновлены в БД!');
            // Выгрузка данных из БД в Google-таблицы
            yield (0, googleSheetsService_1.exportDataToSheets)();
            console.log('Данные успешно выгружены в Google-таблицы!');
            console.log('Следующее обновление данных через 1 час');
            // Запуск обновления данных каждый 1 час
            node_cron_1.default.schedule('0 * * * *', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield (0, service_1.fetchAndStoreTariffs)(database_1.default);
                    console.log('Тарифы успешно обновлены в БД!');
                    yield (0, googleSheetsService_1.exportDataToSheets)();
                    console.log('Данные успешно выгружены в Google-таблицы!');
                    console.log('Следующее обновление данных через 1 час');
                }
                catch (error) {
                    console.error('Ошибка при обновлении тарифов и выгрузке данных:', error);
                }
            }));
        }
        catch (error) {
            console.error('Ошибка в процессе выполнения:', error);
        }
        finally {
            yield database_1.default.destroy();
        }
    });
}
/**
 * Вызов функции запуска сервиса.
 *
 * @function main
 * @returns {Promise<void>}
 */
main();
