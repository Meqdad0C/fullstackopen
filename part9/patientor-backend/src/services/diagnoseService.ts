import diagnoses from '../data/diagnoses';
import { DiagnosisEntry } from '../types/diagnoseType';

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};
