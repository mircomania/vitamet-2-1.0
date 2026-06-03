const axios = require('axios');
const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_GET_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_GET_TABLE_NAME;

const airtableURL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const cacheFile = path.join(__dirname, '../cache/agentes.json');

const CACHE_TIME = 24 * 60 * 60 * 1000;

/* ------------------ CACHE FUNCTIONS ------------------ */

const readCache = async () => {
    try {
        const data = await fs.promises.readFile(cacheFile, 'utf8');
        return JSON.parse(data);
    } catch {
        return null;
    }
};

const writeCache = async (data) => {
    await fs.promises.writeFile(cacheFile, JSON.stringify(data, null, 2));
};

/* ------------------ AIRTABLE FETCH ------------------ */

const fetchAirtable = async () => {
    const response = await axios.get(airtableURL, {
        headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
    });

    return response.data.records.map((r) => {
        const a = r.fields;

        return {
            nombre: a.nombre ?? '',
            cargo: a.cargo ?? '',
            correo: a.correo?.[0] ?? '',
            status: a.status?.[0] ?? '',
            telefono: a.telefono ?? '',
            whatsapp: a.whatsapp ?? '',
            exp: a.exp ?? '',
            clientes: a.clientes ?? '',
            path: a.path ?? '',
            foto: a.url_ibb ?? '',
        };
    });
};

const getAgentesData = async () => {
    const cached = await readCache();

    if (cached) {
        const stats = await fs.promises.stat(cacheFile);
        const now = Date.now();

        if (now - stats.mtimeMs < CACHE_TIME) {
            return cached.data;
        }
    }

    const agentes = await fetchAirtable();

    const result = {
        success: true,
        data: agentes,
    };

    await writeCache(result);

    return agentes;
};

/* ------------------ ENDPOINT: LISTA ------------------ */

exports.getAgentes = async (req, res) => {
    try {
        const agentes = await getAgentesData();

        res.json({
            success: true,
            data: agentes,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: 'Error obteniendo agentes',
        });
    }
};

/* ------------------ ENDPOINT: AGENTE INDIVIDUAL ------------------ */

exports.getAgenteBySlug = async (req, res) => {
    try {
        const { slug } = req.params;

        const agentes = await getAgentesData();

        const agente = agentes.find((a) => a.path === slug);

        if (!agente) {
            return res.status(404).json({
                success: false,
                error: 'Agente no encontrado',
            });
        }

        res.json({
            success: true,
            data: agente,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: 'Error obteniendo agente',
        });
    }
};
