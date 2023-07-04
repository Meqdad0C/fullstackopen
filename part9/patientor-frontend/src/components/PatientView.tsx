import { DiagnosisEntry, Entry, Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import HealthRatingBar from "./HealthRatingBar";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <div>
          <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
        </div>
      );
    case "Hospital":
      return (
        <div>
          <p>discharge date: {entry.discharge.date}</p>
          <p>discharge criteria: {entry.discharge.criteria}</p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <p>employer name: {entry.employerName}</p>
          {entry.sickLeave && (
            <div>
              <p>sick leave start: {entry.sickLeave.startDate}</p>
              <p>sick leave end: {entry.sickLeave.endDate}</p>
            </div>
          )}
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const EntryView = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnosisEntry[];
}) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 10,
  };

  return (
    <div style={style}>
      date {entry.date} description {entry.description}
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((d) => d.code === code)?.name}{" "}
          </li>
        ))}
      </ul>
      <p>specialist: {entry.specialist}</p>
      <EntryDetails entry={entry} />
    </div>
  );
};

interface Props {
  patientId: string | undefined;
  diagnoses: DiagnosisEntry[];
}

const isPatient = (patient: unknown): patient is Patient => {
  return (patient as Patient)?.id !== undefined;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const PatientView = ({ patientId, diagnoses }: Props) => {
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
    <>
      <div>
        <h1>{currentPatient.name}</h1>
        <p>ssn: {currentPatient.ssn}</p>
        <p>gender: {currentPatient.gender}</p>
        <p>occupation: {currentPatient.occupation}</p>
      </div>
      <div>
        <h2>entries</h2>
        {currentPatient.entries.map((entry) => (
          <EntryView key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </div>
    </>
  );
};

export default PatientView;
