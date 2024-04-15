
import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const token = req.headers.authorization; 

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey'); 
    req.user = decoded.user; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}
export { verifyToken };
