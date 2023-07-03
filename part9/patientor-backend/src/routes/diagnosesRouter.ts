import { Router } from "express";

import diagnosesService from '../services/diagnoseService';


const router = Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a diagnosis!");
});

export default router;
