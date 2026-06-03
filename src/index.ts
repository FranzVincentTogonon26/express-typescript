import express from 'express';
import cors from 'cors';

import type { Express, Request, Response } from 'express';

import { Pets } from "./data/pets"

const PORT = 8000;
const app: Express = express();



app.get( '/', (req: Request, res: Response) => {
    res.json(Pets)
})

app.listen( PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

app.use((req: Request, res: Response) : void => {
    res.status(404).json({ message: "Endpoint not found. "})
})