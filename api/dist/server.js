"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const server = new app_1.default({
    port: 5000,
});
server.listen();
exports.default = server.app;
//# sourceMappingURL=server.js.map