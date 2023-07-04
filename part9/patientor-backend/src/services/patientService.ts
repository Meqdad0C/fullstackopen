import patients from '../data/patients-full';
import {
  NewPatientEntry,
  Patient,
  PatientEntry,
  PublicPatient,
} from '../types/patientTypes';
import { v4 as uuid } from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patientObject: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...patientObject,
    entries : []
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
};
