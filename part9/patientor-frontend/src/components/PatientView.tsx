import {
  DiagnosisEntry,
  Entry,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
} from "../types";
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
  patients: Patient[] | null;
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const isPatient = (patient: unknown): patient is Patient => {
  return (patient as Patient)?.id !== undefined;
};
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const PatientView = ({
  patientId,
  diagnoses,
  patients,
  setPatients,
}: Props) => {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  useEffect(() => {
    const fetchPatient = async () => {
      if (isString(patientId)) {
        const patient = await patientService.getOne(patientId);
        setCurrentPatient(patient);
      }
    };
    void fetchPatient();
  }, [patientId, patients]);

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
      <EntryForm
        patientId={patientId}
        diagnoses={diagnoses}
        patients={patients}
        setPatients={setPatients}
      />
    </>
  );
};

const useField = (type: string) => {
  const [value, setValue] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const Notificate = ({ message }: { message: string }) => {
  const style = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === "") {
    return null;
  }
  return <div style={style}>{message}</div>;
};

const EntryForm = ({ patientId, diagnoses, patients, setPatients }: Props) => {
  const [message, setMessage] = useState("");
  const description = useField("text");
  const date = useField("date");
  const specialist = useField("text");
  const [selectedCodes, setSelectedCodes] = useState<string>("");
  const type = useField("radio");
  const healthCheckRating = useField("select");
  const employerName = useField("text");
  const sickLeaveStartDate = useField("date");
  const sickLeaveEndDate = useField("date");
  const dischargeDate = useField("date");
  const dischargeCriteria = useField("text");

  useEffect(() => {
    console.log("rerendered");
  }, [patients]);

  const handleNotification = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const validate = () => {
    if (description.value === "") {
      handleNotification("description is empty");
      return false;
    }
    if (date.value === "") {
      handleNotification("date is empty");
      return false;
    }
    if (specialist.value === "") {
      handleNotification("specialist is empty");
      return false;
    }
    if (selectedCodes === "") {
      handleNotification("diagnosis codes are empty");
      return false;
    }
    if (type.value === "") {
      handleNotification("type is empty");
      return false;
    }
    if (type.value === "HealthCheck" && healthCheckRating.value === "") {
      handleNotification("health check rating is empty");
      return false;
    }
    if (type.value === "Hospital" && dischargeDate.value === "") {
      handleNotification("discharge date is empty");
      return false;
    }
    if (type.value === "Hospital" && dischargeCriteria.value === "") {
      handleNotification("discharge criteria is empty");
      return false;
    }
    if (type.value === "OccupationalHealthcare" && employerName.value === "") {
      handleNotification("employer name is empty");
      return false;
    }
    if (
      type.value === "OccupationalHealthcare" &&
      sickLeaveStartDate.value === ""
    ) {
      handleNotification("sick leave start date is empty");
      return false;
    }
    if (
      type.value === "OccupationalHealthcare" &&
      sickLeaveEndDate.value === ""
    ) {
      handleNotification("sick leave end date is empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    switch (type.value) {
      case "HealthCheck":
        let newHCEntry: EntryWithoutId = {
          description: description.value,
          date: date.value,
          specialist: specialist.value,
          diagnosisCodes: selectedCodes.split(",").filter((c) => c !== ""),
          type: "HealthCheck",
          healthCheckRating: Number(healthCheckRating.value),
        };
        console.log(newHCEntry.diagnosisCodes);
        if (patientId && patients) {
          const added = await patientService.addEntry(patientId, newHCEntry);
          console.log(added);
          const newPatients = patients.map((p) =>
            p.id === added.id ? added : p
          );
          setPatients(newPatients);
        }
        break;
      case "Hospital":
        let newHEntry: EntryWithoutId = {
          description: description.value,
          date: date.value,
          specialist: specialist.value,
          diagnosisCodes: selectedCodes.split(","),
          type: "Hospital",
          discharge: {
            date: dischargeDate.value,
            criteria: dischargeCriteria.value,
          },
        };
        if (patientId && patients) {
          const added = await patientService.addEntry(patientId, newHEntry);
          console.log(added);
          const newPatients = patients.map((p) =>
            p.id === added.id ? added : p
          );
          setPatients(newPatients);
        }
        break;
      case "OccupationalHealthcare":
        let newOEntry: EntryWithoutId = {
          description: description.value,
          date: date.value,
          specialist: specialist.value,
          diagnosisCodes: selectedCodes.split(","),

          type: "OccupationalHealthcare",
          employerName: employerName.value,
          sickLeave: {
            startDate: sickLeaveStartDate.value,
            endDate: sickLeaveEndDate.value,
          },
        };
        if (patientId && patients) {
          const added = await patientService.addEntry(patientId, newOEntry);
          console.log(added);
          const newPatients = patients.map((p) =>
            p.id === added.id ? added : p
          );
          setPatients(newPatients);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Notificate message={message} />
      <h2>add entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>description</label>
          <input {...description} />
        </div>
        <div>
          <label>date</label>
          <input {...date} />
        </div>
        <div>
          <label>specialist</label>
          <input {...specialist} />
        </div>
        <div>
          <label>diagnosis codes</label>
          {diagnoses.map((d) => (
            <label key={d.code}>
              <input
                type="checkbox"
                value={d.code}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCodes(selectedCodes + d.code + ",");
                    console.log(selectedCodes);
                  } else {
                    setSelectedCodes(selectedCodes.replace(d.code + ",", ""));
                  }
                }}
                checked={selectedCodes.includes(d.code)}
              />
              {d.code}
            </label>
          ))}
        </div>
        <div>
          <label>type</label>
          {["HealthCheck", "Hospital", "OccupationalHealthcare"].map((t) => (
            <label key={t}>
              <input
                type="radio"
                value={t}
                onChange={type.onChange}
                checked={type.value === t}
              />
              {t}
            </label>
          ))}
        </div>
        {type.value === "HealthCheck" && (
          <div>
            <label>health check rating</label>
            {Object.keys(HealthCheckRating)
              .filter((r) => !isNaN(Number(r)))
              .map((r) => (
                <label key={r}>
                  <input
                    type="radio"
                    value={r}
                    onChange={healthCheckRating.onChange}
                    checked={healthCheckRating.value === r}
                  />
                  {r}
                </label>
              ))}
          </div>
        )}
        {type.value === "Hospital" && (
          <div>
            <label>discharge date</label>
            <input {...dischargeDate} />
            <label>discharge criteria</label>
            <input {...dischargeCriteria} />
          </div>
        )}
        {type.value === "OccupationalHealthcare" && (
          <div>
            <label>employer name</label>
            <input {...employerName} />
            <label>sick leave start date</label>
            <input {...sickLeaveStartDate} />
            <label>sick leave end date</label>
            <input {...sickLeaveEndDate} />
          </div>
        )}
        <button type="submit">add</button>
        <button
          type="reset"
          onClick={() => {
            description.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            date.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            specialist.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            setSelectedCodes("");
            type.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            employerName.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            sickLeaveStartDate.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            sickLeaveEndDate.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            dischargeDate.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
            dischargeCriteria.onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
        >
          cancel
        </button>
      </form>
    </div>
  );
};

export default PatientView;
