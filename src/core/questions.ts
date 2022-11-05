interface QuestionOptions {
  key?: string;
}

export interface Question {
  label: string;
  answers: Answer[];
  options?: QuestionOptions;
}

interface AnswerOptions {
  value?: string;
  nextQuestion?: Question;
}

export interface Answer {
  label: string;
  options?: AnswerOptions;
}

export function createQuestion(
  label: string,
  answers: Answer[],
  options?: QuestionOptions,
): Question {
  if (answers.length < 2) throw Error('A question must have at least 2 answers');

  return {
    label,
    answers,
    options,
  };
}

export function createAnswer(label: string, options?: AnswerOptions): Answer {
  return {
    label,
    options,
  };
}
