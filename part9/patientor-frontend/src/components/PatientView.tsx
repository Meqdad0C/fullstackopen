import { Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
interface Props {
  patientId: string | undefined;
}

const isPatient = (patient: unknown): patient is Patient => {
  return (patient as Patient)?.id !== undefined;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const PatientView = ({ patientId }: Props) => {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  useEffect(() => {
    const fetchPatient = async () => {
      if (isString(patientId)) {
        const patient = await patientService.getOne(patientId);
        setCurrentPatient(patient);
      }
    };
    void fetchPatient();
  }, [patientId]);

  if (!isPatient(currentPatient)) {
    return null;
  }
  return (
    <div>
      <h1>{currentPatient.name}</h1>
      <p>ssn: {currentPatient.ssn}</p>
      <p>gender: {currentPatient.gender}</p>
      <p>occupation: {currentPatient.occupation}</p>
    </div>
  );
};

export default PatientView;
