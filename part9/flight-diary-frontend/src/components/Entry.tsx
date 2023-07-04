import {DiaryEntry} from '../types.ts';

export const Entry = ({diary}: { diary: DiaryEntry }) => {
    return (
        <ul>
            <li>{diary.id}</li>
            <li>{diary.date}</li>
            <li>{diary.weather}</li>
            <li>{diary.visibility}</li>
            <li>{diary.comment}</li>
        </ul>
    );
};