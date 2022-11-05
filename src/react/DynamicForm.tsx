import { useCallback, useState } from 'react';

import { Question } from '@/core/questions';

interface DynamicFormProps {
  questionsTree: Question;
  onSubmit: (values: Record<string, string>) => void;
}

interface Step {
  question: Question;
  answers: string;
}

type History = Step[];

export function DynamicForm({ questionsTree, onSubmit }: DynamicFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(questionsTree);
  const [answer, setAnswer] = useState<any>(null);
  const [history, setHistory] = useState<History>([]);

  const handleAnswer = useCallback(
    (answer: any) => {
      setAnswer(answer);
    },
    [currentQuestion],
  );

  const handleSubmit = useCallback(() => {
    if (answer.nextQuestion) {
      setHistory((prev) => [
        ...prev,
        { question: currentQuestion, answers: answer.label },
      ]);
      setCurrentQuestion(answer.nextQuestion);
      return;
    }

    onSubmit(
      history.reduce((acc, step) => ({ ...acc, [step.question.label]: step.answers }), {
        [currentQuestion.label]: answer.label,
      }),
    );
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
