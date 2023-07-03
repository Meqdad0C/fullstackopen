import patients from '../data/patients';
import { Patient, PatientEntry, NewPatientEntry } from '../types/patientTypes';
import { v4 as uuid } from 'uuid';
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

const getPatient = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patientObject: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...patientObject,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatient,
  addPatient,
};
