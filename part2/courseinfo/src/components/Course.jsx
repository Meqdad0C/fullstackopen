/* eslint-disable react/prop-types */
const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
  return (<h3>total of {sum} exercises</h3>)
}
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
  <>
    {parts.map((part) =>
      <Part key={part.id} part={part} />)}
  </>

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course