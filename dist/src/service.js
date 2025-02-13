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
exports.fetchAndStoreTariffs = fetchAndStoreTariffs;
const axios_1 = __importDefault(require("axios"));
const config_main_1 = require("./config/config.main");
/**
 * Функция для получения тарифов с API и их сохранения в базе данных.
 *
 * - Отправляет запрос на API с текущей датой.
 * - Извлекает данные тарифов из ответа API.
 * - Для каждого склада создаёт объект тарифа и сохраняет его в БД.
 * - Обновляет запись, если тариф уже существует.
 *
 * @param {Knex} knex - Объект Knex для работы с базой данных.
 * @returns {Promise<void>} Промис без возвращаемого значения.
 */
function fetchAndStoreTariffs(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date().toISOString().split('T')[0];
        try {
            const response = yield axios_1.default.get(config_main_1.API_URL, {
                params: { date: today },
                headers: {
                    Authorization: `Bearer ${config_main_1.API_KEY}`,
                },
            });
            const { dtNextBox, dtTillMax, warehouseList } = response.data.response.data;
            for (const warehouse of warehouseList) {
                const tariffData = {
                    warehouse_name: warehouse.warehouseName,
                    date: today,
                    box_delivery_and_storage_expr: warehouse.boxDeliveryAndStorageExpr,
                    box_delivery_base: warehouse.boxDeliveryBase,
                    box_delivery_liter: warehouse.boxDeliveryLiter,
                    box_storage_base: warehouse.boxStorageBase,
                    box_storage_liter: warehouse.boxStorageLiter,
                    dt_next_box: dtNextBox,
                    dt_till_max: dtTillMax,
                };
                yield upsertTariff(knex, tariffData);
            }
        }
        catch (error) {
            console.error('Error fetching tariffs:', error);
        }
    });
}
/**
 * Функция для вставки или обновления тарифов в базе данных.
 *
 * - Преобразует строки в числа для полей стоимости.
 * - Конвертирует даты в корректный ISO-формат.
 * - Вставляет запись в таблицу или обновляет её при конфликте.
 *
 * @function upsertTariff
 * @param {Knex} knex - Объект Knex для работы с базой данных.
 * @param {Tariff} data - Объект с данными тарифа.
 * @returns {Promise<void>} Промис без возвращаемого значения.
 */
function upsertTariff(knex, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { warehouse_name, date, box_delivery_and_storage_expr, box_delivery_base, box_delivery_liter, box_storage_base, box_storage_liter, dt_next_box, dt_till_max, } = data;
        /**
         * Функция для преобразования строкового значения в число.
         * @param {string} value - Строка, представляющая число.
         * @returns {number} Числовое значение.
         */
        const convertToFloat = (value) => {
            return parseFloat(value.replace(',', '.'));
        };
        const boxDeliveryBase = convertToFloat(box_delivery_base);
        const boxStorageBase = convertToFloat(box_storage_base);
        const boxDeliveryLiter = convertToFloat(box_delivery_liter);
        const boxStorageLiter = convertToFloat(box_storage_liter);
        /**
          * Функция для преобразования строки с датой в ISO-формат.
          * @param {string} dateString - Строковое представление даты.
          * @returns {string | null} Корректный ISO-формат даты или null, если некорректно.
          */
        const parseDate = (dateString) => {
            const parsedDate = new Date(dateString);
            return parsedDate.toString() !== 'Invalid Date' ? parsedDate.toISOString() : null;
        };
        const validDtNextBox = parseDate(dt_next_box);
        const validDtTillMax = parseDate(dt_till_max);
        try {
            yield knex('warehouse_tariffs')
                .insert({
                warehouse_name,
                date,
                box_delivery_and_storage_expr,
                box_delivery_base: boxDeliveryBase,
                box_delivery_liter: boxDeliveryLiter,
                box_storage_base: boxStorageBase,
                box_storage_liter: boxStorageLiter,
                dt_next_box: validDtNextBox,
                dt_till_max: validDtTillMax,
            })
                .onConflict(['warehouse_name', 'date'])
                .merge();
        }
        catch (error) {
            console.error('Error upserting tariff:', error);
        }
    });
}
