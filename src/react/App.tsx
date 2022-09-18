import { Answer, createAnswer, createQuestion } from "@/core/questions";
import { DynamicForm } from "./DynamicForm";

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

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <DynamicForm
            questionsTree={tree}
            onSubmit={() => {
              alert("Submit form");
            }}
          />
        </li>
      </ul>
    </div>
  );
}

export default App;
