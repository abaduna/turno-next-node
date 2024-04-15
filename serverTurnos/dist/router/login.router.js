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
    try {
        const saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const passwordToString = password.toString();
        const hashedPassword = yield bcrypt_1.default.hash(passwordToString, salt);
        console.log(`hashedPassword ${hashedPassword}`);
        const user = yield connection.query('SELECT * FROM usuarios WHERE name = ? AND hashPassword = ? ;', [name, hashedPassword]);
        jsonwebtoken_1.default.sign({ user: user }, 'secretKey', (err, token) => {
            res.json({ token: token });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}));
routerLogin.post('/created', authMiddleware_1.verifyToken, (req, res) => {
    res.json({ message: 'Ruta protegida accesible' });
});
//Authorization: Bearer <token>
exports.default = routerLogin;
//# sourceMappingURL=login.router.js.map