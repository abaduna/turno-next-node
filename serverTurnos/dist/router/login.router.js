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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = require("./../Middleware/authMiddleware");
const db_1 = require("../module/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const routerLogin = express_1.default.Router();
routerLogin.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getConnection)();
    const { name, password } = req.body;
    console.log(req.body);
    try {
        const user = yield connection.query('SELECT * FROM usuarios WHERE name = ?;', [name]);
        if (user.length === 0) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        if (typeof password !== 'string') {
            return res.status(400).json({ message: "La contraseña debe ser un string" });
        }
        const storedHashedPassword = user[0].hashPassword;
        const isPasswordValid = yield bcrypt_1.default.compare(password, storedHashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user[0].id, user: user[0].name }, 'abaduna');
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor buena ruta" });
    }
}));
routerLogin.post('/created', authMiddleware_1.verifyToken, (req, res) => {
    res.json({ message: 'Ruta protegida accesible' });
});
//Authorization: Bearer <token>
exports.default = routerLogin;
//# sourceMappingURL=login.router.js.map