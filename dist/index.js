"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const index_route_1 = __importDefault(require("./routers/admin/index.route"));
const index_route_2 = __importDefault(require("./routers/client/index.route"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./configs/database.config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(`${__dirname}/public`, { redirect: false }));
app.use("/node_modules", express_1.default.static(`${__dirname}/node_modules`, { redirect: false }));
app.use((0, cookie_parser_1.default)());
(0, index_route_2.default)(app);
(0, index_route_1.default)(app);
app.listen(port, () => {
    console.log(`Website đang chạy trên cổng ${port}`);
});
