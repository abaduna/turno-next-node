"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
const usuarios_router_1 = __importDefault(require("./router/usuarios.router"));
app.use('/api', usuarios_router_1.default);
const field_router_1 = __importDefault(require("./router/field.router"));
app.use('/api/field', field_router_1.default);
const timetable_router_1 = __importDefault(require("./router/timetable.router"));
app.use('/api/time', timetable_router_1.default);
const login_router_1 = __importDefault(require("./router/login.router"));
app.use('/api/login', login_router_1.default);
const mepa_router_1 = __importDefault(require("./router/mepa.router"));
app.use("/api/mepa", mepa_router_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map