import { createAnswer, createQuestion } from '@/core/questions';

import { DynamicForm } from './DynamicForm';

const questionRoute = createQuestion(
  'Quelle fillière ?',
  [
    createAnswer('PCSI', undefined, { value: 'pcsi' }),
    createAnswer('MPSI', undefined, { value: 'mpsi' }),
    createAnswer('PC', undefined, { value: 'pc' }),
    createAnswer('PSI', undefined, { value: 'psi' }),
  ],
  { key: 'route' },
);

const tree = createQuestion(
  'Vous êtes ?',
  [
    createAnswer('En CPGE', questionRoute, { value: 'cpge' }),
    createAnswer(
      'Lycéen',
      createQuestion('Envisagez-vous de faire une prépa ?', [
        createAnswer('Oui', undefined, { value: 'yes' }),
        createAnswer('Non', undefined, { value: 'no' }),
      ]),
      { value: 'highschool' },
    ),
  ],
  { key: 'level' },
);

function App() {
  return (
    <div className="App">
      <DynamicForm
        questionsTree={tree}
        onSubmit={(values) => {
          alert('Submit form ' + JSON.stringify(values));
        }}
      />
    </div>
  );
}

export default App;
