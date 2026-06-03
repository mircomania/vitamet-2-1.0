const axios = require('axios');

exports.submitForm = async (req, res) => {
    const { nombre, telefono, email, asesoria } = req.body;

    try {
        await axios.post(
            `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`,
            {
                fields: {
                    Name: nombre,
                    telefono: telefono,
                    correo: email,
                    asesoria: asesoria,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        res.status(200).json({ message: 'Datos enviados correctamente.' });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: 'Hubo un problema al procesar el formulario.' });
    }
};
