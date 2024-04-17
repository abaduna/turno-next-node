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
const db_1 = require("../module/db");
const authMiddleware_1 = require("../Middleware/authMiddleware");
const routerField = express_1.default.Router();
routerField.get('/', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.query('SELECT * FROM field ;');
        return res.status(200).json(result);
    }
    catch (error) {
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerField.get('/:idusuario', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    const idusuario = req.params.idusuario;
    try {
        const result = yield conection.query('SELECT * FROM field WHERE idusuario =?  ;', [idusuario]);
        return res.status(200).json(result);
    }
    catch (error) {
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerField.post('/', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    const { name, ubicacion, idusuario } = req.body;
    const idfield = new Date().getTime();
    try {
        yield conection.query(`INSERT INTO field (  name, ubicacion, idusuario,idfield ) VALUES (?,?,?,?);`, [name, ubicacion, idusuario, idfield]);
        res.status(200).json({ mesage: 'good post' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
routerField.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ubicacion, idusuario } = req.body;
    const id = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.query(`UPDATE field
            SET name = ?, ubicacion = ?, idusuario = ?
            WHERE id = ?`, [name, ubicacion, idusuario, id]);
        res.status(200).json({ message: 'salio bien' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
routerField.delete('/:id', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.query('DELETE FROM field WHERE id = ?', [id]);
        res.status(200).json({ message: 'salio bien' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
exports.default = routerField;
//# sourceMappingURL=field.router.js.map