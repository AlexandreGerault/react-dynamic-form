# React dynamic form

A react library to build dynamic step forms. Create an object describing your form and be ready to go!
## Features

- Create a step by step form
- Allow dynamic form path


## Documentation

### Simple example

To create a dynamic step by step form, you have to:

1. Create an object representing your form;
2. Create a handler function that will execute when the form ends;
3. Create a component to render your form.

To create an object representing the steps, you can write a plain Javascript 
object or use the factory functions.

```javascript
// Factory functions
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
        [
          createAnswer('Oui', { value: 'yes', nextQuestion: questionRoute }),
          createAnswer('Non', { value: 'no' }),
        ],
        { key: 'do-prepa' },
      ),
    }),
  ],
  { key: 'level' },
);

// Plain object
const tree = {
  label: 'Vous êtes ?',
  answers: [
    {
      label: 'En CPGE',
      options: {
        value: 'cpge',
        nextQuestion: {
          label: 'Quelle fillière ?',
          answers: [
            { label: 'PCSI', options: { value: 'pcsi' } },
            { label: 'MPSI', options: { value: 'mpsi' } },
            { label: 'PC', options: { value: 'pc' } },
            { label: 'PSI', options: { value: 'psi' } },
          ],
        },
      },
    },
    {
      label: 'Lycéen',
      options: {
        nextQuestion: {
          label: 'Envisagez-vous de faire une prépa ?',
          answers: [
            { label: 'Oui', options: { value: 'yes' } },
            { label: 'Non', options: { value: 'no' } },
          ],
          options: {
            key: 'do-prepa',
          },
        },
        value: 'highschool',
      },
    },
  ],
  options: {
    key: 'level',
  },
};
```

As you can read above, the factory functions allow you to avoid repeating yourself when repeating the same question.

Then you can create a component that will create a form with the given questions, using the `useStepForm` hook. You can look at the `DynamicForm` component as an example:

```tsx
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
              onChange={() => selectAnswer(answer)}
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
          Back
        </button>
        <button type="submit" className="rounded bg-purple-500 text-white px-3 py-2">
          Submit
        </button>
      </div>
    </form>
  );
}

```

Then, the last thing you have to do is to use this component with a submit handler function, like so

```tsx
function App() {
  return (
    <div className="flex items-center justify-center mx-auto min-h-screen bg-blue-200">
      <DynamicForm
        questionsTree={tree}
        onSubmit={(values) => {
          fetch('http://localhost?' + new UrlSearchParams(values))
        }}
      />
    </div>
  );
}
```

## Installation

Just type
```sh
npm install  @alexandregerault/react-dynamic-form@0.1.0
```
Or if you use yarn
```sh
yarn add  @alexandregerault/react-dynamic-form@0.1.0
```
## Running Tests

To run tests, run the following command (you must have cloned the project)

```bash
  yarn vitest
```


## Run Locally

Clone the project

```bash
git clone https://github.com/AlexandreGerault/react-dynamic-form
```

Install the dependencies

```bash
cd react-dynamic-form
yarn
```

And then you can start the dev environment with
```bash
 yarn dev
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

