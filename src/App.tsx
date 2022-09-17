import "./App.css";
import {
  Answer,
  createAnswer,
  createQuestion,
  Question,
} from "./core/questions";

const questionRoute = createQuestion("Quelle fillière ?", [
  createAnswer("PCSI"),
  createAnswer("MPSI"),
  createAnswer("PC"),
  createAnswer("PSI"),
]);

const tree = createQuestion("Vous êtes ?", [
  createAnswer("En CPGE", questionRoute),
  createAnswer(
    "Lycéen",
    createQuestion("Envisagez-vous de faire une prépa ?", [
      createAnswer("Oui", questionRoute),
      createAnswer("Non"),
    ])
  ),
]);

function QuestionComponent({ question }: { question: Question }) {
  return (
    <li>
      {question.label}
      <ul>
        {question.answers.map((answer) => (
          <AnswerComponent answer={answer} />
        ))}
      </ul>
    </li>
  );
}

function AnswerComponent({ answer }: { answer: Answer }) {
  return (
    <li>
      <p>{answer.label}</p>
      {answer.nextQuestion && (
        <ul>
          <QuestionComponent question={answer.nextQuestion} />
        </ul>
      )}
    </li>
  );
}

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <QuestionComponent question={tree} />
        </li>
      </ul>
    </div>
  );
}

export default App;
