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
const mercadopago_1 = __importDefault(require("mercadopago"));
const db_1 = require("../module/db");
const routerMePA = express_1.default.Router();
mercadopago_1.default.configure({
    access_token: 'TEST-5966353069909290-041616-8d5b1072aa23bcee655e278b6906943f-207725092'
});
routerMePA.post('/create-order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user } = req.body;
    console.log(req.body);
    try {
        const preference = {
            items: [
                {
                    title: 'tu reserca',
                    unit_price: 4,
                    currency_id: 'ARS',
                    description: `reseva la cancha con id ${id}`,
                    quantity: 1
                }
            ],
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'https://turnitos.com/failure',
                pending: 'https://turnitos.com/pending'
            },
            auto_return: 'approved'
        };
        const respons = yield mercadopago_1.default.preferences.create(preference);
        console.log(respons.status); //201
        console.log("t", respons.status === 201);
        write(id, user);
        res.status(200).json(respons.response.init_point);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error en el post' });
    }
}));
const write = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`write ${user}-${id}`);
    const conection = yield (0, db_1.getConnection)();
    const data = yield conection.query(`UPDATE time
            SET reservado = 1 , users = ?
            WHERE id = ?`, [user, id]);
    console.log(`data`, data);
});
routerMePA.get('/succes', (req, res) => {
    res.send('creattin order');
});
routerMePA.get('/webhook', (req, res) => {
    res.send('creattin order');
});
exports.default = routerMePA;
//# sourceMappingURL=mepa.router.js.map