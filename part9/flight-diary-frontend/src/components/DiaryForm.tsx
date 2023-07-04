import { NewDiaryEntry } from '../types.ts';
import { FormEvent, useState } from 'react';

interface DiaryFormProps {
  handleSubmit: (diaryToAdd: NewDiaryEntry) => Promise<void>;
}

const useField = (type: string) => {
  const [value, setValue] = useState<string>('');

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const reset = () => {
    setValue('');
  };

  const data = {
    type,
    value,
    onChange,
  };

  return {
    data,
    reset,
  };
};

const DiaryForm = ({ handleSubmit }: DiaryFormProps) => {
  const { reset: resetDate, data: date } = useField('date');
  const { reset: resetWeather, data: weather } = useField('text');
  const { reset: resetVisibility, data: visibility } = useField('text');
  const { reset: resetComment, data: comment } = useField('text');

  const resetFields = () => {
    resetDate();
    resetWeather();
    resetVisibility();
    resetComment();
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const diaryToAdd: NewDiaryEntry = {
      date: date.value,
      weather: weather.value,
      visibility: visibility.value,
      comment: comment.value,
    };
    await handleSubmit(diaryToAdd);
    resetFields();
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        date
        <input {...date} />
      </div>
      <div>
        weather
        <input {...weather} />
      </div>
      <div>
        visibility
        <input {...visibility} />
      </div>
      <div>
        comment
        <input {...comment} />
      </div>
      <button type="submit">save</button>
    </form>
  );
};

export default DiaryForm;
