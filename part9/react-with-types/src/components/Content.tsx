import { CoursePart } from "../types/partTypes";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => {
        return <Part part={part} key={part.name} />;
      })}
    </>
  );
};

export default Content;
