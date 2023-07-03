interface ExerciseCalculatorValues {
  target: number;
  daily_exercises: number[];
}

interface ExerciseCalculatorResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseCalculatorArguments = (
  args: String[]
): ExerciseCalculatorValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const target = args[2];
  const daily_excercises = args.slice(3);
  daily_excercises.forEach((d) => {
    if (isNaN(Number(d))) {
      throw new Error("Provided values were not numbers!");
    }
  })
  if (!isNaN(Number(target))) {
    return {
      target: Number(target),
      daily_exercises: daily_excercises.map(Number),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  daily_exercises: number[],
  target: number
): ExerciseCalculatorResult => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((d) => d > 0).length;
  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription =
    rating === 1
      ? "You need to train harder"
      : rating === 2
      ? "You are on the right track"
      : "You are doing great";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, daily_exercises } = parseExerciseCalculatorArguments(
    process.argv
  );
  console.log(calculateExercises(daily_exercises, target));
} catch (e: unknown) {
  if (e instanceof Error) {
    console.log("Error, something bad happened, message: ", e.message);
  }
}
