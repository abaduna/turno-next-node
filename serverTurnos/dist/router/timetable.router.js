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
const routerTime = express_1.default.Router();
routerTime.get('/:dataDia/:idfield/:idUsuario', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.header);
    ///api/time/2024-04-11 0:0:0/1234
    // mostra solo los reservador
    //hacer otro para que se puede editar
    const conection = yield (0, db_1.getConnection)();
    const dataDia = req.params.dataDia;
    const idfield = req.params.idfield;
    const idUsuario = req.params.idUsuario;
    try {
        const result = yield conection.query('SELECT * FROM time WHERE idfield = ? AND idUsuario = ? AND dataDia = ? AND reservado = false;', [idfield, idUsuario, dataDia]);
        return res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerTime.put("/reserver/:id/:user", authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.params.user;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.query(`UPDATE time
            SET reservado = 1 , users = ?
            WHERE id = ?`, [user, id]);
        res.status(200).json({ message: '/reserver/:id/:user' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
routerTime.put('/put/:id', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`put`);
    const conection = yield (0, db_1.getConnection)();
    const id = req.params.id;
    const { dateStart, dateEnd, idfield, reservado, dataDia, idUsuario } = req.body;
    try {
        yield conection.query(`UPDATE time
            SET dateStart = ?, dateEnd = ?, idfield = ?,reservado = ?,dataDia = ?,idUsuario = ?
            WHERE id = ?`, [dateStart, dateEnd, idfield, reservado, dataDia, idUsuario, id]);
        res.status(200).json({ mesage: 'good put' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
routerTime.post('/', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    const { dateStart, dateEnd, idfield, reservado, dataDia, idUsuario } = req.body;
    try {
        yield conection.query(`INSERT INTO time (  dateStart, dateEnd, idfield ,reservado,dataDia,idUsuario ) VALUES (?,?,?,?,?,?);`, [dateStart, dateEnd, idfield, reservado, dataDia, idUsuario]);
        res.status(200).json({ mesage: 'good post' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
routerTime.delete('/:id', authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.query('DELETE FROM time WHERE id = ?', [id]);
        res.status(200).json({ message: 'salio bien' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
}));
exports.default = routerTime;
//# sourceMappingURL=timetable.router.js.map