export interface Question {
  label: string;
  answers: Answer[];
}

export interface Answer {
  label: string;
  nextQuestion?: Question;
}

export function createQuestion(label: string, answers: Answer[]): Question {
  if (answers.length < 2)
    throw Error("A question must have at least 2 answers");

  return {
    label,
    answers,
  };
}

export function createAnswer(label: string, nextQuestion?: Question): Answer {
  return {
    label,
    nextQuestion,
  };
}
