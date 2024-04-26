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
const authMiddleware_1 = require("../Middleware/authMiddleware");
const db_1 = require("../module/db");
const routerReserve = express_1.default.Router();
routerReserve.get("/time/:idUsuario/:dataDia/:idfield", authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUsuario = req.params.idUsuario;
    const dataDia = req.params.dataDia;
    const idfield = req.params.idfield;
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.
            query('SELECT * FROM time where  idUsuario = ? AND dataDia = ? AND idField = ? AND reservado = 1;', [idUsuario, dataDia, idfield]);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerReserve.delete("/deletd/:id", authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.
            query('UPDATE time  SET reservado = 0 where id = ?;', [id]);
        res.status(200).json({ message: "salio bien" });
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerReserve.get("/admin/:idUsuario/:dataDia/:idfield", authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUsuario = req.params.idUsuario;
    const dataDia = req.params.dataDia;
    const idfield = req.params.idfield;
    const conection = yield (0, db_1.getConnection)();
    try {
        const result = yield conection.
            query('SELECT * FROM time where  idUsuario = ? AND dataDia = ? AND idField = ? AND reservado = 0;', [idUsuario, dataDia, idfield]);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerReserve.post("/adminreserva/:id", authMiddleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTime = req.params.id;
    const conection = yield (0, db_1.getConnection)();
    try {
        yield conection.
            query('UPDATE time SET reservado = 1, users = "admin" WHERE id = ?;', [idTime]);
        //'UPDATE * FROM time SET users = admin and reservado  where id = ?;'
        res.status(200).json({ message: "update" });
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
exports.default = routerReserve;
//# sourceMappingURL=reserve.rouer.js.map