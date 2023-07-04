import { DiagnosisEntry } from "../types";
import axios from "axios";

import { apiBaseUrl } from "../constants";

const getEntries = async (): Promise<DiagnosisEntry[]> => {
    const { data } = await axios.get<DiagnosisEntry[]>(`${apiBaseUrl}/diagnoses`);
    return data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getEntries
}