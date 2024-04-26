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
require("dotenv/config");
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const routerMePA = express_1.default.Router();
console.log(process.env);
mercadopago_1.default.configure({
    access_token: process.env.ACCESS_TOKEN
});
routerMePA.post('/create-order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user } = req.body;
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
            notification_url: `https://1936-190-195-87-149.ngrok-free.app/api/mepa/notificar/${id}`,
            auto_return: 'approved'
        };
        const respons = yield mercadopago_1.default.preferences.create(preference);
        const conection = yield (0, db_1.getConnection)();
        yield conection.query(`UPDATE time
         SET users = ?
         WHERE id = ?`, [user, id]);
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
routerMePA.post("/notificar/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idItem = req.params.id;
        console.log(req.body);
        const { type, data } = req.body;
        console.log(data);
        switch (type) {
            case "payment": {
                const paymentId = data.id;
                const payment = yield mercadopago_1.default.payment.findById(paymentId);
                console.log("Payment:", payment.body.status_detail);
                console.log(payment.body.items);
                if (payment.body.status_detail === "accredited") {
                    console.log(`writing`);
                    const conection = yield (0, db_1.getConnection)();
                    try {
                        yield conection.query(`UPDATE time
                    SET reservado = 1
                    WHERE id = ?`, [idItem]);
                    }
                    catch (error) {
                        console.log(`error`);
                        console.log(error);
                    }
                }
                break;
            }
            case "plan": {
                const planId = data.id;
                const plan = yield mercadopago_1.default.plan.findById(planId);
                console.log("Plan:", plan);
                // Realizar acciones con el objeto `plan`
                break;
            }
            case "subscription": {
                const subscriptionId = data.id;
                const subscription = yield mercadopago_1.default.subscription.findById(subscriptionId);
                console.log("Subscription:", subscription);
                // Realizar acciones con el objeto `subscription`
                break;
            }
            case "invoice": {
                const invoiceId = data.id;
                const invoice = yield mercadopago_1.default.invoice.findById(invoiceId);
                console.log("Invoice:", invoice);
                // Realizar acciones con el objeto `invoice`
                break;
            }
            case "point_integration_wh": {
                // La notificación puede contener otros datos que debes manejar aquí
                console.log("Point Integration:", req.body);
                break;
            }
            default: {
                console.warn("Unknown type:", type);
                break;
            }
        }
        // Responder para confirmar que se recibió la notificación
        res.status(200).send("Notification received");
    }
    catch (error) {
        console.error("Error handling notification:", error);
        res.status(500).send("Error handling notification");
    }
}));
routerMePA.get('/succes', (req, res) => {
    res.send('creattin order');
});
routerMePA.get('/webhook', (req, res) => {
    res.send('creattin order');
});
exports.default = routerMePA;
//# sourceMappingURL=mepa.router.js.map