// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type Patient = Omit<PatientEntry, 'ssn'| 'entries'>;
export type NewPatientEntry = Omit<PatientEntry, 'id' >;

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}
