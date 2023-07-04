import { EntryType, EntryWithoutId, Gender, HealthCheckRating, HospitalEntry, NewPatientEntry, OccupationalHealthcareEntry } from '../types/patientTypes';
import { DiagnosisEntry } from '../types/diagnoseType';
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
  } else {
    throw new Error('Incorrect or missing object');
  }
};


const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnosisEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnosisEntry['code']>;
};


const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  console.log(typeof object, `line 92`);
  if (!isString(object) || !isHealthCheckRating(parseInt(object))) {
    throw new Error('Incorrect or missing healthCheckRating: ' + object);
  }
  return parseInt(object) as HealthCheckRating;
};

const isEntryType = (param: string): boolean => {
  return Object.values(EntryType).map((t:EntryType)=> t.toString()).includes(param);
};

const isType = (object: unknown): object is EntryType => {
  if (!isString(object) || !isEntryType(object)) {
    throw new Error('Incorrect or missing type: ' + object);
  }
  return true;
};



export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing object');
  }

  try {
    if (
      'description' in object &&
      'date' in object &&
      'specialist' in object &&
      'type' in object) {
        
      if (!isType(object.type)) throw new Error('Incorrect or missing type: ' + object.type);
      const type: EntryType = object.type;
      console.log(type, `line 129`);
      switch (type) {
        case 'HealthCheck':
          if (!('healthCheckRating' in object)) {
            throw new Error('Missing healthCheckRating');
          }
          const healthCheckEntry: EntryWithoutId = {
            description: parseName(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseSsn(object.specialist),
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
          if ("diagnosisCodes" in object)
            healthCheckEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
          return healthCheckEntry;

        case 'OccupationalHealthcare':
          if (!('employerName' in object)) {
            throw new Error('Missing employerName');
          }
          const occupationalHealthcareEntry: EntryWithoutId = {
            description: parseName(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseSsn(object.specialist),
            type: 'OccupationalHealthcare',
            employerName: parseOccupation(object.employerName),
          };
          if ("diagnosisCodes" in object)
            occupationalHealthcareEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
          if ("sickLeave" in object) {
            if (!object.sickLeave || !isSickLeave(object.sickLeave)) {
              throw new Error('Missing sickLeave.startDate');
            }
            const sickLeave: OccupationalHealthcareEntry['sickLeave'] = object.sickLeave;
            occupationalHealthcareEntry.sickLeave = {
              startDate: parseDateOfBirth(sickLeave.startDate),
              endDate: parseDateOfBirth(sickLeave.endDate),
            };
          }
          return occupationalHealthcareEntry;
        case 'Hospital':
          console.log(object);
          if (!('discharge' in object)) {
            throw new Error('Missing discharge');
          }
          if (!object.discharge || !isDischarge(object.discharge)) {
            throw new Error('Missing discharge.date');
          }
          const hospitalEntry: EntryWithoutId = {
            description: parseName(object.description),
            date: parseDateOfBirth(object.date),
            specialist: parseSsn(object.specialist),
            type: 'Hospital',
            discharge: {
              date: parseDateOfBirth(object.discharge.date),
              criteria: parseOccupation(object.discharge.criteria),
            },
          };
          if ("diagnosisCodes" in object)
            hospitalEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
          return hospitalEntry;

        default:
          return object as EntryWithoutId;
      }
    }
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
  }
  throw new Error('Incorrect or missing object');
};
const isSickLeave = (object: unknown): object is OccupationalHealthcareEntry['sickLeave'] => {
  if (!object || typeof object !== 'object' || !('startDate' in object)) {
    throw new Error('Incorrect or missing sickLeave.startDate: ' + object);
  }
  if (!isString(object.startDate) || !isDate(object.startDate)) {
    throw new Error('Incorrect or missing sickLeave.startDate: ' + object);
  }
  return true;
};

const isDischarge = (object: unknown): object is HospitalEntry['discharge'] => {
  if (!object || typeof object !== 'object' || !('date' in object)) {
    throw new Error('Incorrect or missing discharge.date: ' + object);
  }
  if (!isString(object.date) || !isDate(object.date)) {
    throw new Error('Incorrect or missing discharge.date: ' + object);
  }
  if (!('criteria' in object)) {
    throw new Error('Incorrect or missing discharge.criteria: ' + object);
  }
  if (!isString(object.criteria)) {
    throw new Error('Incorrect or missing discharge.criteria: ' + object);
  }
  return true;
};
