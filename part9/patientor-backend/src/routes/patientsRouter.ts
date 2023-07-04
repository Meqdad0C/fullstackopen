import { Router } from 'express';

import patientsService from '../services/patientService';
import { toNewPatientEntry } from '../utils/patientUtil';
import { PatientEntry } from '../types/patientTypes';

const router = Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient: PatientEntry | undefined = patientsService.findById(req.params.id);
  if (patient) res.send(patient);
  else res.sendStatus(404);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message);
  }
});
export default router;
