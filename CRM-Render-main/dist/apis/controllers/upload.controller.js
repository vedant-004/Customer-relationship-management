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
exports.uploadCustomersController = uploadCustomersController;
exports.uploadOrdersController = uploadOrdersController;
const response_1 = require("../../utils/response");
const upload_service_1 = require("../services/upload.service");
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = require("stream");
const mongoose_1 = require("mongoose");
function uploadCustomersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            if (!req.file) {
                resolve((0, response_1.error)("No customer file uploaded.", 400));
                return;
            }
            if (!req.user || !req.user.id) {
                resolve((0, response_1.error)("User not authenticated.", 401));
                return;
            }
            const userId = new mongoose_1.Types.ObjectId(req.user.id);
            const results = [];
            const errors = [];
            let rowCount = 0;
            const readableStream = stream_1.Readable.from(req.file.buffer.toString('utf-8'));
            readableStream
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => __awaiter(this, void 0, void 0, function* () {
                rowCount++;
                try {
                    const processedCustomer = yield (0, upload_service_1.processCustomerRow)(data, userId);
                    results.push(processedCustomer);
                }
                catch (e) {
                    errors.push({ row: rowCount, data, message: e.message });
                }
            }))
                .on('end', () => {
                if (errors.length > 0) {
                    resolve((0, response_1.success)({
                        message: `Customers file processed with some errors. ${results.length} processed, ${errors.length} failed.`,
                        processedCount: results.length,
                        failedCount: errors.length,
                        failures: errors,
                    }, 207));
                }
                else {
                    resolve((0, response_1.success)({ message: "Customers file processed successfully.", count: results.length, results }, 200)); // Resolve the outer promise
                }
            })
                .on('error', (err) => {
                console.error("CSV parsing error:", err);
                resolve((0, response_1.error)("Error processing CSV file.", 500));
            });
        });
    });
}
function uploadOrdersController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            if (!req.file) {
                resolve((0, response_1.error)("No order file uploaded.", 400));
                return;
            }
            if (!req.user || !req.user.id) {
                resolve((0, response_1.error)("User not authenticated.", 401));
                return;
            }
            const userId = new mongoose_1.Types.ObjectId(req.user.id);
            const results = [];
            const errors = [];
            let rowCount = 0;
            const customerCache = new Map();
            const readableStream = stream_1.Readable.from(req.file.buffer.toString('utf-8'));
            readableStream
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => __awaiter(this, void 0, void 0, function* () {
                rowCount++;
                try {
                    const processedOrder = yield (0, upload_service_1.processOrderRow)(data, userId, customerCache);
                    if (processedOrder) {
                        results.push(processedOrder);
                    }
                    else {
                        errors.push({ row: rowCount, data, message: "Customer not found for order." });
                    }
                }
                catch (e) {
                    errors.push({ row: rowCount, data, message: e.message });
                }
            }))
                .on('end', () => {
                if (errors.length > 0) {
                    resolve((0, response_1.success)({
                        message: `Orders file processed with some errors. ${results.length} processed, ${errors.length} failed.`,
                        processedCount: results.length,
                        failedCount: errors.length,
                        failures: errors,
                    }, 207));
                }
                else {
                    resolve((0, response_1.success)({ message: "Orders file processed successfully.", count: results.length, results }, 200));
                }
            })
                .on('error', (err) => {
                console.error("CSV parsing error:", err);
                resolve((0, response_1.error)("Error processing CSV file.", 500));
            });
        });
    });
}
//# sourceMappingURL=upload.controller.js.map