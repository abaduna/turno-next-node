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
const routerCantFields = express_1.default.Router();
routerCantFields.get('/:idusuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    const Iduserio = req.params.idusuario;
    try {
        const result = yield conection.query("SELECT * FROM cantFields WHERE idusuario = ?", [Iduserio]);
        res.status(200).json(result);
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
routerCantFields.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    const { cantidFields, idusuario } = req.body;
    try {
        yield conection.query(`INSERT INTO cantFields ( cantidFields, idusuario ) VALUES (?,?);`, [cantidFields, idusuario]);
        res.status(200).json({ mesage: 'good post post' });
    }
    catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: `Error en la consulta ${error}`, });
    }
}));
routerCantFields.delete('/:idusuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conection = yield (0, db_1.getConnection)();
    const Iduserio = req.params.idusuario;
    try {
        yield conection.query("DELETE FROM cantFields WHERE idusuario = ?", [Iduserio]);
        res.status(200).json({ message: "eliminado con exito" });
    }
    catch (error) {
        console.log(`error en la consulta`, error);
        yield conection.end();
        res.status(500).json({ error: error });
    }
}));
exports.default = routerCantFields;
//# sourceMappingURL=cantFields.router.js.map