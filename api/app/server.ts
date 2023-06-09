import express from 'express';
import * as dotenv from 'dotenv';

import apiRoute from './routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 2500;
console.log(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_HOST,
    process.env.DB_DRIVER)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "from  server js" })
})
// api Router
app.use('/api', apiRoute);

app.listen(port, () => console.log(`server is running on https://localhost:${port}`))
