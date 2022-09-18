import { Question } from "@/core/questions";
import { useCallback, useState } from "react";

interface DynamicFormProps {
  questionsTree: Question;
  onSubmit: (values: any) => void;
}

export function DynamicForm({ questionsTree, onSubmit }: DynamicFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(questionsTree);
  const [answer, setAnswer] = useState<any>(null);

  const handleAnswer = useCallback(
    (answer: any) => {
      setAnswer(answer);
    },
    [currentQuestion]
  );

  const handleSubmit = useCallback(() => {
    if (answer.nextQuestion) {
      setCurrentQuestion(answer.nextQuestion);
      return;
    }
    onSubmit({});
  }, [answer]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
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
      <button type="submit">Valider</button>
    </form>
  );
}
