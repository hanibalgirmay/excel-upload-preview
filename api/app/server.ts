import express from 'express';
import * as dotenv from 'dotenv';

import apiRoute from './routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 2500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api Router
app.use('api/', apiRoute);

app.listen(port, () => console.log(`server is running on https://localhost:${port}`))
