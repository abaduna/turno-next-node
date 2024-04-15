"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'secretKey');
        req.user = decoded.user;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=authMiddleware.js.map