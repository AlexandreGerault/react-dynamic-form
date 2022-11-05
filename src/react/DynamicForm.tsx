import { Question } from "@/core/questions";
import { useCallback, useState } from "react";

interface DynamicFormProps {
  questionsTree: Question;
  onSubmit: (values: Record<string, string>) => void;
}

export function DynamicForm({ questionsTree, onSubmit }: DynamicFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(questionsTree);
  const [answer, setAnswer] = useState<any>(null);
  const [history, setHistory] = useState<Question[]>([]);

  const handleAnswer = useCallback(
    (answer: any) => {
      setAnswer(answer);
    },
    [currentQuestion]
  );

  const handleSubmit = useCallback(() => {
    if (answer.nextQuestion) {
      setHistory((prev) => [...prev, currentQuestion])
      setCurrentQuestion(answer.nextQuestion);
      return;
    }
    
    onSubmit({
      "Question 1 : Vous êtes": "Un homme",
      "Question 2 : Quel est votre âge ?": "Entre 18 et 25 ans",
    });
  }, [answer]);

  const handleBack = useCallback(() => {
    const previousQuestion = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setCurrentQuestion(previousQuestion);
  }, [history]);

  const isFirstQuestion = useCallback(() => history.length === 0, [history]);

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
      <button type="button" role="button[back]" name="back" onClick={handleBack} disabled={isFirstQuestion()}>
        Retour
      </button>
      <button type="submit">Valider</button>
    </form>
  );
}
