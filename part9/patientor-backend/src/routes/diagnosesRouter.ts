import { Router } from "express";

import diagnosesService from '../services/diagnoseService';


const router = Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getEntries());
});


export default router;
