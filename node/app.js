import express from 'express';
import cors from 'cors';

import db from './database/db.js';

import MeserosRoutes from './routes/MeserosRoutes.js'; 
import ClientesRoutes from './routes/ClientesRoutes.js';
import PuntuacionesRoutes from './routes/PuntuacionesRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/meseros', MeserosRoutes);
app.use('/clientes', ClientesRoutes);
app.use('/puntuaciones', PuntuacionesRoutes);

try {
    await db.authenticate();
    console.log('Conexión exitosa');
} catch (error) {
    console.log('Error de conexión:', error);
}

app.get('/', (req, res) => {
    res.send('Bienvenido a Restaurante');
})

app.listen(8000, () => {
    console.log('Servidoren el puerto 8000');
})