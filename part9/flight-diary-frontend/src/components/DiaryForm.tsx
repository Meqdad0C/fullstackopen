import { NewDiaryEntry, Visibility, Weather } from '../types.ts';
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

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};
const parseWeather = (weather: string): Weather => {
  if (!isWeather(weather)) {
    throw new Error('Incorrect weather: ' + weather);
  }
  return weather;
};
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};
const parseVisibility = (visibility: string): Visibility => {
  if (!isVisibility(visibility)) {
    throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};

const DiaryForm = ({ handleSubmit }: DiaryFormProps) => {
  const { reset: resetDate, data: date } = useField('date');
  const { reset: resetWeather, data: weather } = useField('radio');
  const { reset: resetVisibility, data: visibility } = useField('radio');
  const { reset: resetComment, data: comment } = useField('text');
  const weatherValues: string[] = Object.values(Weather);
  const visibilityValues: string[] = Object.values(Visibility);

  const resetFields = () => {
    resetDate();
    resetWeather();
    resetVisibility();
    resetComment();
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const weatherValue = parseWeather(weather.value);
    const visibilityValue = parseVisibility(visibility.value);

    const diaryToAdd: NewDiaryEntry = {
      date: date.value,
      weather: weatherValue,
      visibility: visibilityValue,
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
        weather:
        {weatherValues.map((value) => (
          <label key={value}>
            <input {...weather} />
            {value}
          </label>
        ))}
      </div>
      <div>
        visibilit:
        {visibilityValues.map((value) => (
          <label key={value}>
            <input {...visibility} />
            {value}
          </label>
        ))}
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
