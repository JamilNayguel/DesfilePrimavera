const Request = require('../models/requestModel.js');
const pdf = require('pdfkit');  
const fs = require('fs');
const path = require('path');

exports.createRequest = async (req, res) => {
    const requestData = req.body;

    const totalParticipantes = requestData.totalMayores + requestData.totalMenores;
    const categoriasMinimos = {
        'Inicial': 20,
        'Primaria': 40,
        'Secundaria': 40,
        'Universitaria': 50,
        'Junta V/Sindicato': 50,
        'Individual/Otro': 3
    };

    if (totalParticipantes < categoriasMinimos[requestData.Categoria]) {
        return res.status(400).json({ 
            message: `El número total de participantes es insuficiente para la categoría ${requestData.Categoria}. Se requieren al menos ${categoriasMinimos[requestData.Categoria]} participantes.`
        });
    }

    try {
        const newRequest = await Request.create(requestData);

        const doc = new pdf();
        const fileName = `request_${newRequest.Nro}.pdf`;
        const filePath = path.join(__dirname, `../pdfs/${fileName}`);
        doc.pipe(fs.createWriteStream(filePath));

        doc.text(`Tipo: ${newRequest.Tipo}`);
        doc.text(`Tipo de Documento: ${newRequest.tipoDocumento}`);
        doc.text(`Número de Documento: ${newRequest.numeroDocumento}`);
        doc.text(`Nombres: ${newRequest.Nombres}`);
        doc.text(`Primer Apellido: ${newRequest.primerApellido}`);
        doc.text(`Segundo Apellido: ${newRequest.segundoApellido}`);
        doc.text(`Dirección: ${newRequest.Direccion}`);
        doc.text(`Nro de Celular: ${newRequest.nroCelular}`);
        doc.text(`Otro Teléfono: ${newRequest.otroTelefono}`);
        doc.text(`Correo Electronico: ${newRequest.Correo}`);
        doc.text(`Nombre del Grupo/Participantes: ${newRequest.NombreGrupo}`);
        doc.text(`Categoría: ${newRequest.Categoria}`);
        doc.text(`Banda: ${newRequest.Banda}`);
        doc.text(`Carro Alegórico: ${newRequest.carroAlegorico}`);
        doc.text(`Reina: ${newRequest.Reina}`);
        doc.text(`Número de Personas Mayores: ${newRequest.totalMayores}`);
        doc.text(`Número de Personas Menores: ${newRequest.totalMenores}`);
        doc.text(`TOTAL DE PARTICIPANTES : ${newRequest.totalParticipantes}`);

        doc.end();

        res.status(201).json({ message: 'Solicitud creada exitosamente', request: newRequest, pdfUrl: `/pdfs/${fileName}` });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la solicitud' });
    }
};


exports.getRequestById = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar la solicitud' });
    }
};

exports.searchRequestsByNameAndLastName = async (req, res) => {
    const { Nombres, primerApellido } = req.query;

    try {
        const requests = await Request.searchByNameAndLastName(Nombres, primerApellido);
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar solicitudes' });
    }
};

exports.searchRequestsByMultipleParams = async (req, res) => {
    const { Tipo, Categoria, nombreGrupo, Solicitante } = req.query;
    
      let Nombres = '';
      let primerApellido = '';

    // Extraer nombre y apellido si se proporciona el Solicitante
    if (Solicitante) {
        const parts = Solicitante.trim().split(' ');
        Nombres = parts[0]; // El primer valor es el nombre
        primerApellido = parts.slice(1).join(' '); // El resto es el apellido (por si tiene más de un apellido)
    }
    try {
        const requests = await Request.searchByMultipleParams({ Tipo, Categoria, nombreGrupo, Nombres, primerApellido });
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar solicitudes' });
    }
};
