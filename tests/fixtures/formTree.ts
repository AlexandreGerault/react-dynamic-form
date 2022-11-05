import { createAnswer, createQuestion } from '@/core/questions';

const ageQuestion = createQuestion('Quel est votre âge ?', [
  createAnswer('Moins de 18 ans'),
  createAnswer('Entre 18 et 25 ans'),
  createAnswer('Entre 25 et 35 ans'),
  createAnswer('Entre 35 et 50 ans'),
]);

const formTree = createQuestion('Question 1 : Vous êtes', [
  createAnswer('Un homme', ageQuestion),
  createAnswer('Une femme', ageQuestion),
  createAnswer('Autre', ageQuestion),
]);

export default formTree;
