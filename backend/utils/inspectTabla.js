require('dotenv').config();
const axios = require('axios');

async function inspectTable() {
    try {
        const baseId = process.env.AIRTABLE_GET_BASE_ID;
        const tableName = process.env.AIRTABLE_GET_TABLE_NAME;

        const response = await axios.get(`https://api.airtable.com/v0/${baseId}/${tableName}?maxRecords=1`, {
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
            },
        });

        const records = response.data.records;

        if (!records.length) {
            console.log('La tabla está vacía, crea un registro primero.');
            return;
        }

        const fields = Object.keys(records[0].fields);

        console.log('Campos de la tabla:');
        console.log(fields);
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}

inspectTable();
