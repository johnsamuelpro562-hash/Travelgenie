import { Router } from 'express';
import flightsController from '../controllers/flights.controller';

const router = Router();

// POST /api/flights/search
router.post('/search', flightsController.searchFlights);

export default router;
