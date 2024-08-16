const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    
    const {Usuario, Contrasena} = req.body;
    try {
        const user = await User.findByUsername(Usuario);

        if (!user) {
            return res.status(401).json({ message: 'Usuario contraseña incorrectos' });
        }

        const isMatch = await User.verifyPassword(Usuario, Contrasena);

        if (!isMatch) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const token = User.generateToken(user);
        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor, intente nuevamente' });
    }
};

exports.logout = (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ message: 'Token no proporcionado' });
    }

    try {
        
        res.status(200).json({ message: 'Cierre de sesión exitoso' });
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor, intente nuevamente' });
    }
};

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token no válido o expirado' });
        }

        try {
            const isInvalid = await User.isTokenInvalidated(token);
            if (isInvalid) {
                return res.status(401).json({ message: 'Token ha sido invalidado' });
            }

            req.UsuarioId = decoded.idUsuario;
            next();
        } catch (err) {
            res.status(500).json({ error: 'Error en la validación del token' });
        }
    });
};
