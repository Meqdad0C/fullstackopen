import diagnoses from "../data/diagnoses";

import { DiagnoseEntry } from "../types/diagnoseType";

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
