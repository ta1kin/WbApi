"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.credentials = void 0;
const googleapis_1 = require("googleapis");
const fs_1 = require("fs");
/**
 * Загружает учетные данные сервисного аккаунта из файла.
 */
exports.credentials = JSON.parse((0, fs_1.readFileSync)('./src/service_cred.json', 'utf8'));
/**
 * Создает экземпляр аутентификации с использованием сервисного аккаунта.
 */
const auth = new googleapis_1.google.auth.JWT(exports.credentials.client_email, undefined, exports.credentials.private_key, [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.resource',
]);
exports.auth = auth;
