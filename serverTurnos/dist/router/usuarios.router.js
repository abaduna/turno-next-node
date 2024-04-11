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
const db_1 = require("./../module/db");
const routerUsuarios = express_1.default.Router();
routerUsuarios.get('/usuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.query('SELECT * FROM usuarios;');
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerUsuarios.post('/usuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    const { name, email, password } = req.body;
    try {
        yield conection.query(`INSERT INTO usuarios (  name, email, hashPassword ) VALUES (?,?,?);`, [name, email, password]);
        res.status(200).json({ mesage: 'good post' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
routerUsuarios.put('/usuario/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const id = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.query(`UPDATE usuarios
            SET name = ?, email = ?, hashPassword = ?
            WHERE id = ?`, [name, email, password, id]);
        res.status(200).json({ message: 'salio bien' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
exports.default = routerUsuarios;
//# sourceMappingURL=usuarios.router.js.map