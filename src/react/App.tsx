import './index.css';

import { createAnswer, createQuestion } from '@/core/questions';

import { DynamicForm } from './DynamicForm';

const questionRoute = createQuestion(
  'Quelle fillière ?',
  [
    createAnswer('PCSI', { value: 'pcsi' }),
    createAnswer('MPSI', { value: 'mpsi' }),
    createAnswer('PC', { value: 'pc' }),
    createAnswer('PSI', { value: 'psi' }),
  ],
  { key: 'route' },
);

const tree = createQuestion(
  'Vous êtes ?',
  [
    createAnswer('En CPGE', { nextQuestion: questionRoute, value: 'cpge' }),
    createAnswer('Lycéen', {
      value: 'highschool',
      nextQuestion: createQuestion(
        'Envisagez-vous de faire une prépa ?',
        [createAnswer('Oui', { value: 'yes' }), createAnswer('Non', { value: 'no' })],
        { key: 'do-prepa' },
      ),
    }),
  ],
  { key: 'level' },
);

function App() {
  return (
    <div className="flex items-center justify-center mx-auto min-h-screen bg-blue-200">
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
