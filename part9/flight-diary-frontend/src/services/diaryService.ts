import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types.ts';

export const getDiary = async () => {
  const { data: diary } = await axios.get<DiaryEntry[]>('/api/diaries');
  return diary;
};

export const addDiary = async (entry: NewDiaryEntry): Promise<DiaryEntry> => {
  const { data: newDiary } = await axios.post<DiaryEntry>(
    '/api/diaries',
    entry
  );
  return newDiary;
};

export const getNonSensitiveDiary = async () => {
  const { data: nonSensitiveDiary } = await axios.get<NonSensitiveDiaryEntry[]>(
    '/api/diaries'
  );
  return nonSensitiveDiary;
};

export default {
  getDiary,
  addDiary,
  getNonSensitiveDiary,
};
