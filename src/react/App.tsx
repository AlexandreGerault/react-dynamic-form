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
      <DynamicForm
        questionsTree={tree}
        onSubmit={(values) => {
          alert("Submit form " + JSON.stringify(values));
        }}
      />
    </div>
  );
}

export default App;
