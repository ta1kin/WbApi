import { google } from 'googleapis'
import { readFileSync } from 'fs'

/**
 * Загружает учетные данные сервисного аккаунта из файла.
 */
export const credentials = JSON.parse(readFileSync('./src/service_cred.json', 'utf8'))

/**
 * Создает экземпляр аутентификации с использованием сервисного аккаунта.
 */
const auth = new google.auth.JWT(
	credentials.client_email,
	undefined,
	credentials.private_key,
	[
		'https://www.googleapis.com/auth/spreadsheets',
		'https://www.googleapis.com/auth/drive', 
		'https://www.googleapis.com/auth/drive.file', 
		'https://www.googleapis.com/auth/drive.resource', 
	]
)

export { auth }
