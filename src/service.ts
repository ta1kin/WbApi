import axios from 'axios'
import { Knex } from 'knex'

import {API_KEY, API_URL} from './config/config.main'

/**
 * Интерфейс, описывающий структуру склада с тарифами.
 */
interface Warehouse {
	boxDeliveryAndStorageExpr: string
	boxDeliveryBase: string
	boxDeliveryLiter: string
	boxStorageBase: string
	boxStorageLiter: string
	warehouseName: string
}

/**
 * Интерфейс, описывающий структуру данных тарифов.
 */
interface TariffData {
	dtNextBox: string
	dtTillMax: string
	warehouseList: Warehouse[]
}

/**
 * Интерфейс ответа API, содержащего данные тарифов.
 */
interface ApiResponse {
	response: {
		data: TariffData
	}
}


/**
 * Интерфейс, описывающий структуру тарифа для хранения в базе данных.
 */
interface Tariff {
	warehouse_name: string
	date: string
	box_delivery_and_storage_expr: string
	box_delivery_base: string
	box_delivery_liter: string
	box_storage_base: string
	box_storage_liter: string
	dt_next_box: string
	dt_till_max: string
}

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
export async function fetchAndStoreTariffs(knex: Knex): Promise<void> {
	const today = new Date().toISOString().split('T')[0] 

	try {
		const response = await axios.get<ApiResponse>(API_URL, {
			params: { date: today },
			headers: {
				Authorization: `Bearer ${API_KEY}`,
			},
		})

		const { dtNextBox, dtTillMax, warehouseList } = response.data.response.data

		for (const warehouse of warehouseList) {
			const tariffData: Tariff = {
				warehouse_name: warehouse.warehouseName,
				date: today,
				box_delivery_and_storage_expr: warehouse.boxDeliveryAndStorageExpr,
				box_delivery_base: warehouse.boxDeliveryBase,
				box_delivery_liter: warehouse.boxDeliveryLiter,
				box_storage_base: warehouse.boxStorageBase,
				box_storage_liter: warehouse.boxStorageLiter,
				dt_next_box: dtNextBox,
				dt_till_max: dtTillMax,
			}
			await upsertTariff(knex, tariffData)
		}
	} catch (error) {
		console.error('Error fetching tariffs:', error)
	}
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
async function upsertTariff(knex: Knex, data: any) {
  const {
    warehouse_name,
    date,
    box_delivery_and_storage_expr,
    box_delivery_base,
    box_delivery_liter,
    box_storage_base,
    box_storage_liter,
    dt_next_box,
    dt_till_max,
  } = data;

  /**
   * Функция для преобразования строкового значения в число.
   * @param {string} value - Строка, представляющая число.
   * @returns {number} Числовое значение.
   */
  const convertToFloat = (value: string): number => {
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
  const parseDate = (dateString: string): string | null => {
    const parsedDate = new Date(dateString);
    return parsedDate.toString() !== 'Invalid Date' ? parsedDate.toISOString() : null;
  };

  const validDtNextBox = parseDate(dt_next_box);
  const validDtTillMax = parseDate(dt_till_max);

  try {
    await knex('warehouse_tariffs')
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
  } catch (error) {
    console.error('Error upserting tariff:', error);
  }
}
