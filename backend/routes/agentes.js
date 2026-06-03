const express = require('express');
const router = express.Router();

const { getAgentes, getAgenteBySlug } = require('../controllers/agentesController');

router.get('/agentes', getAgentes);
router.get('/agente/:slug', getAgenteBySlug);

module.exports = router;
