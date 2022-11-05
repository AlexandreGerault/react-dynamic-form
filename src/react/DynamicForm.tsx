import { useCallback, useState } from 'react';

import { Answer, Question } from '@/core/questions';

interface DynamicFormProps {
  questionsTree: Question;
  onSubmit: (values: Record<string, string>) => void;
}

interface Step {
  question: Question;
  answer: Answer;
}

type History = Step[];

export function DynamicForm({ questionsTree, onSubmit }: DynamicFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(questionsTree);
  const [answer, setAnswer] = useState<Answer>();
  const [history, setHistory] = useState<History>([]);

  const handleAnswer = useCallback(
    (answer: Answer) => {
      setAnswer(answer);
    },
    [currentQuestion],
  );

  const handleSubmit = useCallback(() => {
    if (!answer) {
      throw new Error('No answer');
    }

    if (answer.options?.nextQuestion) {
      setHistory((prev) => [...prev, { question: currentQuestion, answer }]);
      setCurrentQuestion(answer.options.nextQuestion);
      return;
    }

    const payload = history.reduce<Record<string, string>>(
      (acc, step) => {
        return {
          ...acc,
          [step.question.options?.key || step.question.label]:
            step.answer.options?.value || step.answer.label,
        };
      },
      {
        [currentQuestion.options?.key || currentQuestion.label]:
          answer.options?.value || answer.label,
      },
    );

    onSubmit(payload);
  }, [answer]);

  const handleBack = useCallback(() => {
    const previousStep = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setCurrentQuestion(previousStep.question);
  }, [history]);

  const isFirstQuestion = useCallback(() => history.length === 0, [history]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <p>{currentQuestion.label}</p>
      <div>
        {currentQuestion.answers.map((answer) => (
          <div key={answer.label}>
            <label htmlFor={answer.label}>{answer.label}</label>

            <input
              type="radio"
              name="answer"
              value={answer.label}
              id={answer.label}
              onClick={() => handleAnswer(answer)}
            />
          </div>
        ))}
      </div>
      <button type="button" onClick={handleBack} disabled={isFirstQuestion()}>
        Retour
      </button>
      <button type="submit">Valider</button>
    </form>
  );
}
