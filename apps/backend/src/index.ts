import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('ok');
});

app.listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
});
