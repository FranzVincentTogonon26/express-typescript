import express from 'express';
import type { Router, Request, Response } from 'express';

import { getPets, getPetsById } from '../controllers/pets.controllers'
import { authMiddleware, validateNumericId } from '../middleware/pets.middleware'

export const petRouter: Router = express.Router();

petRouter.use(authMiddleware)

petRouter.get( '/', getPets)
petRouter.get('/:id', validateNumericId, getPetsById)