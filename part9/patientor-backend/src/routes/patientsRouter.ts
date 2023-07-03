import { Router } from 'express';

import patientsService from '../services/patientService';

const router = Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getNonSensitiveEntries());
});

export default router;