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
const index_1 = require("../index");
const xss = require('xss');
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield index_1.default.raw(`select text from "table"`);
    });
}
exports.getAll = getAll;
function save(text) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof text !== 'string') {
            throw Error('Bad argument exception');
        }
        return yield index_1.default('table').insert({ text: xss(text) });
    });
}
exports.save = save;
//# sourceMappingURL=table.js.map