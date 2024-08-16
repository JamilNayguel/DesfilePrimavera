const db = require('../config/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Usuario = {
    findByUsername: async (Usuario) => {
        const query = `SELECT * FROM Users WHERE Usuario = $1`;
        try {
            const user = await db.oneOrNone(query, [Usuario]);
            
            return user;
        } catch (err) {
            throw new Error('Error al buscar por nombre de usuario');
        }
    },

    verifyPassword: async (usuario, password) => {
        const user = await Usuario.findByUsername(usuario);
        if (!user) return false;

        try {
            const match = await bcrypt.compare(password, user.contrasena); // Asegúrate de que 'user.contrasena' no es undefined
            return match ? user : null;
        } catch (err) {
            
            throw new Error('Error al verificar la contraseña');
        }
    },

    generateToken: (user) => {
        try {
            return jwt.sign(
                { idUsuario: user.idusuario, Usuario: user.usuario },
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '1h' }
            );
        } catch (err) {
            
            throw new Error('Error al generar el token');
        }
    }
};

module.exports = Usuario;
