import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { DiagnosisEntry, Patient } from "./types";

import patientService from "./services/patients";
import diagnosisService from "./services/diagnosis";
import PatientListPage from "./components/PatientListPage";
import PatientView from "./components/PatientView";

const App = () => {
  const [diagnoses, setDiagnoses] = useState<DiagnosisEntry[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      const diagnoses = await diagnosisService.getEntries();
      setPatients(patients);
      setDiagnoses(diagnoses);
    };
    void fetchPatientList();
  }, []);

  const patientMatcher = useMatch("/patients/:id");
  const patientID = patientMatcher?.params.id;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <PatientView
                patientId={patientID}
                diagnoses={diagnoses}
                patients={patients}
                setPatients={setPatients}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
