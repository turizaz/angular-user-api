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
const express = require("express");
const table_1 = require("../database/queries/table");
const router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield table_1.getAll();
        return res.send(response.rows.map((it) => it.text));
    }
    catch (e) {
        return res.status(500).send('Internal error');
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    if (!text) {
        return res.status(422).send('Unprocessable Entity');
    }
    try {
        const response = yield table_1.getAll();
        if (response.rows.length > 9) {
            return res.status(403).send('Limit reached');
        }
        yield table_1.save(text);
        return res.send(true);
    }
    catch (e) {
        return res.status(500).send('Internal error');
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map