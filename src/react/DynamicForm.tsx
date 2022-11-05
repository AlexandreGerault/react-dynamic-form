import { Question } from '@/core/questions';

import useStepForm from './hooks/step-form';

interface DynamicFormProps {
  questionsTree: Question;
  onSubmit: (values: Record<string, string>) => void;
}

export function DynamicForm({ questionsTree, onSubmit }: DynamicFormProps) {
  const {
    submit,
    back,
    selectAnswer,
    currentQuestion,
    shouldDisableBackButton,
    selectedAnswer,
  } = useStepForm(questionsTree, onSubmit);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="max-w-xs bg-white rounded shadow px-6 py-4 w-full space-y-4">
      <p className="text-2xl">{currentQuestion.label}</p>
      <div className="space-y-2">
        {currentQuestion.answers.map((answer) => (
          <div key={answer.label} className="flex gap-2 items-center">
            <input
              type="radio"
              name="answer"
              value={answer.label}
              id={answer.label}
              onClick={() => selectAnswer(answer)}
              checked={answer.label === selectedAnswer?.label}
            />

            <label htmlFor={answer.label}>{answer.label}</label>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          disabled={shouldDisableBackButton}
          className="rounded outline-purple-500 text-purple-500 px-3 py-2">
          Retour
        </button>
        <button type="submit" className="rounded bg-purple-500 text-white px-3 py-2">
          Valider
        </button>
      </div>
    </form>
  );
}
