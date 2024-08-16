const db = require('../config/database.js');

const Request = {
    create: async (requestData) => {
        const query = `
            INSERT INTO Requests 
            (Tipo, tipoDocumento, numeroDocumento, Nombres, primerApellido, segundoApellido, Direccion, nroCelular, otroTelefono, Correo, NombreGrupo, Categoria, Banda, carroAlegorico, Reina, totalMayores, totalMenores, Fecha, Estado)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            RETURNING *`;
        const values = [
            requestData.Tipo,
            requestData.tipoDocumento,
            requestData.numeroDocumento,
            requestData.Nombres,
            requestData.primerApellido,
            requestData.segundoApellido,
            requestData.Direccion,
            requestData.nroCelular,
            requestData.otroTelefono,
            requestData.Correo,
            requestData.NombreGrupo,
            requestData.Categoria,
            requestData.Banda,
            requestData.carroAlegorico,
            requestData.Reina,
            requestData.totalMayores,
            requestData.totalMenores,
            requestData.Fecha,
            requestData.Estado
        ];

        try {
            const result = await db.one(query, values);
            return result;
        } catch (err) {
            throw new Error('Error al crear la solicitud');
        }
    },

    findById: async (id) => {
        const query = `SELECT * FROM requests WHERE Nro = $1`;
        try {
            const request = await db.oneOrNone(query, [id]);
            return request;
        } catch (err) {
            throw new Error('Error al buscar la solicitud por ID');
        }
    },

    searchByNameAndLastName: async (nombre, primerApellido) => {
        const query = `SELECT * FROM requests WHERE Nombres ILIKE $1 AND primerApellido ILIKE $2`;
        try {
            const requests = await db.any(query, [`%${nombre}%`, `%${primerApellido}%`]);
            return requests;
        } catch (err) {
            throw new Error('Error al buscar solicitudes por nombre y apellido');
        }
    },

    searchByMultipleParams: async (params) => {
        const { Tipo, Categoria, NombreGrupo, Nombres } = params;
        const query = `
            SELECT * FROM requests 
            WHERE 
            ($1 IS NULL OR Tipo ILIKE $1) AND
            ($2 IS NULL OR Categoria ILIKE $2) AND
            ($3 IS NULL OR NombreGrupo ILIKE $3) AND
            ($4 IS NULL OR Nombres ILIKE $4)`;
        try {
            const requests = await db.any(query, [
                Tipo ? `%${Tipo}%` : null,
                Categoria ? `%${Categoria}%` : null,
                NombreGrupo ? `%${NombreGrupo}%` : null,
                Nombres ? `%${Nombres}%` : null
            ]);
            return requests;
        } catch (err) {
            throw new Error('Error al buscar solicitudes por múltiples parámetros');
        }
    }
};

module.exports = Request;



