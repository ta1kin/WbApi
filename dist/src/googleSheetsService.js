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
exports.createGoogleSheets = createGoogleSheets;
exports.exportDataToSheets = exportDataToSheets;
const googleapis_1 = require("googleapis");
const googleAuth_1 = require("./googleAuth");
const database_1 = __importDefault(require("./db/database"));
const sheets = googleapis_1.google.sheets({ version: 'v4', auth: googleAuth_1.auth });
const drive = googleapis_1.google.drive({ version: 'v3', auth: googleAuth_1.auth });
/**
 * Создает указанное количество новых Google-таблиц и предоставляет к ним доступ по ссылке.
 *
 * @param {number} count - Количество создаваемых таблиц.
 * @returns {Promise<string[]>} Промис, который возвращает массив идентификаторов созданных таблиц.
 */
function createGoogleSheets(count) {
    return __awaiter(this, void 0, void 0, function* () {
        const spreadsheetIds = [];
        for (let i = 0; i < count; i++) {
            const response = yield sheets.spreadsheets.create({
                requestBody: {
                    properties: { title: `Wildberries Tariffs Data ${i + 1}` },
                    sheets: [{ properties: { title: 'stocks_coefs' } }],
                },
            });
            const spreadsheetId = response.data.spreadsheetId;
            if (spreadsheetId) {
                const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
                console.log(`Создана таблица ${i + 1}: ${sheetUrl}`);
                spreadsheetIds.push(spreadsheetId);
                yield drive.permissions.create({
                    fileId: spreadsheetId,
                    requestBody: {
                        role: 'reader', // Чтение
                        type: 'anyone', // Доступ всем, у кого есть ссылка
                    },
                });
            }
            else {
                console.error(`Ошибка: spreadsheetId не получен для таблицы ${i + 1}`);
            }
        }
        return spreadsheetIds;
    });
}
/**
 * Получает список идентификаторов Google-таблиц, сохраненных в базе данных.
 *
 * @returns {Promise<string[]>} Промис, возвращающий массив идентификаторов Google-таблиц.
 */
function fetchGoogleSheetIds() {
    return __awaiter(this, void 0, void 0, function* () {
        const sheetRecords = yield (0, database_1.default)('google_sheets').select('spreadsheet_id');
        return sheetRecords.map(record => record.spreadsheet_id);
    });
}
/**
 * Извлекает данные из таблицы `warehouse_tariffs` в базе данных.
 *
 * @returns {Promise<Object[]>} Промис, который возвращает массив объектов с данными.
 */
function fetchDataFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, database_1.default)('warehouse_tariffs')
            .select('*')
            .orderBy('box_delivery_and_storage_expr', 'asc');
    });
}
/**
 * Экспортирует данные из БД в Google-таблицы, обновляя их содержимое.
 *
 * @returns {Promise<void>} Промис, выполняемый после завершения экспорта.
 */
function exportDataToSheets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const spreadsheetIds = yield fetchGoogleSheetIds();
            if (spreadsheetIds.length === 0) {
                console.log('В БД нет Google-таблиц для обновления.');
                return;
            }
            const data = yield fetchDataFromDB();
            if (data.length === 0) {
                console.log('В БД нет данных для выгрузки.');
                return;
            }
            const headers = Object.keys(data[0]);
            const values = data.map(row => headers.map(header => row[header]));
            const sheetData = [headers, ...values];
            for (const spreadsheetId of spreadsheetIds) {
                yield sheets.spreadsheets.values.update({
                    spreadsheetId,
                    range: 'stocks_coefs!A1',
                    valueInputOption: 'RAW',
                    requestBody: { values: sheetData },
                });
                console.log(`✅ Данные обновлены: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
            }
        }
        catch (error) {
            console.error('❌ Ошибка при выгрузке данных:', error);
        }
    });
}
