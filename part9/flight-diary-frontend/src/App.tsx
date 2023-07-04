import './App.css';
import { useEffect, useRef, useState } from 'react';
import diaryService from './services/diaryService.ts';
import { DiaryEntry, NewDiaryEntry } from './types.ts';
import DiaryForm from './components/DiaryForm.tsx';
import { Entry } from './components/Entry.tsx';
import { AxiosError } from 'axios';

const Notification = ({
  message,
  isError,
}: {
  message: string;
  isError: boolean;
}) => {
  if (message === '') {
    return null;
  }
  const style = {
    color: isError ? 'red' : 'green',
    fontStyle: 'italic',
    fontSize: 16,
    border: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={style}>{message}</div>;
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>('');
  const errorFlag = useRef<boolean>(false);
  useEffect(() => {
    diaryService.getDiary().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const handleSubmit = async (diaryToAdd: NewDiaryEntry) => {
    try {
      const newEntry = await diaryService.addDiary(diaryToAdd);
      setDiaries(diaries.concat(newEntry));
      const message = `Added ${diaryToAdd.comment}`;
      sendNotification({ message, isError: false });
    } catch (e) {
      if (e instanceof AxiosError) {
        const message = e.response?.data || 'Unknown Error';
        sendNotification({ message, isError: true });
      } else {
        console.log(e);
      }
    }
  };

  const sendNotification = ({
    message,
    isError,
  }: {
    message: string;
    isError: boolean;
  }) => {
    errorFlag.current = isError;
    setNotification(message);
    setTimeout(() => {
      errorFlag.current = false;
      setNotification('');
    }, 5000);
  };

  return (
    <>
      <Notification message={notification} isError={errorFlag.current} />
      <h2>create new</h2>
      <DiaryForm handleSubmit={handleSubmit} />
      <h1>Entries</h1>
      <div className="container">
        {diaries.map((diary) => (
          <Entry key={diary.id} diary={diary} />
        ))}
      </div>
    </>
  );
};

export default App;
