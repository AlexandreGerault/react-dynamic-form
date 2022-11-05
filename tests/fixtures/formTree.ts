import { createAnswer, createQuestion } from '@/core/questions';

function createFormWithoutOptions() {
  const ageQuestion = createQuestion('Quel est votre âge ?', [
    createAnswer('Moins de 18 ans'),
    createAnswer('Entre 18 et 25 ans'),
    createAnswer('Entre 25 et 35 ans'),
    createAnswer('Entre 35 et 50 ans'),
  ]);

  return createQuestion('Question 1 : Vous êtes', [
    createAnswer('Un homme', { nextQuestion: ageQuestion }),
    createAnswer('Une femme', { nextQuestion: ageQuestion }),
    createAnswer('Autre', { nextQuestion: ageQuestion }),
  ]);
}

function createFormWithOptions() {
  const ageQuestion = createQuestion(
    'Quel est votre âge ?',
    [
      createAnswer('Moins de 18 ans', { value: 'age-minus-18' }),
      createAnswer('Entre 18 et 25 ans', { value: 'age-18-25' }),
      createAnswer('Entre 25 et 35 ans', { value: 'age-25-35' }),
      createAnswer('Entre 35 et 50 ans', { value: 'age-35-50' }),
    ],
    { key: 'age' },
  );

  return createQuestion(
    'Question 1 : Vous êtes',
    [
      createAnswer('Un homme', { value: 'man', nextQuestion: ageQuestion }),
      createAnswer('Une femme', { value: 'woman', nextQuestion: ageQuestion }),
      createAnswer('Autre', { value: 'other', nextQuestion: ageQuestion }),
    ],
    { key: 'gender' },
  );
}

const formTreeWithoutOptions = createFormWithoutOptions();

const formTreeWithOptions = createFormWithOptions();

export { formTreeWithOptions, formTreeWithoutOptions };
