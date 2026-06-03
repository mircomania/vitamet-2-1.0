require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const submitRoutes = require('./routes/submit');
const agentesRoutes = require('./routes/agentes');

app.use('/api', submitRoutes);
app.use('/api', agentesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
