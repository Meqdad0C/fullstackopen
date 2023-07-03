import patients from '../data/patients';
import { Patient, PatientEntry } from '../types/patientType';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): Patient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries,
};
