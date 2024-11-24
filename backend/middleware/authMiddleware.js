const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId }; // Ensure `req.user.id` is populated
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;