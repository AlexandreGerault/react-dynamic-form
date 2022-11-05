import { describe, expect, test } from 'vitest';

import { createAnswer, createQuestion } from '@/core/questions';

describe('Test question creation', function () {
  test('test a question can have many answers', function () {
    const question = createQuestion('Est-ce correct ?', [
      createAnswer('Oui'),
      createAnswer('Neutre'),
      createAnswer('Non'),
    ]);
    expect(question.answers.length).toBe(3);
  });

  test('a question cannot have less than 2 answers', function () {
    expect(() => createQuestion('Est-ce correct ?', [createAnswer('Oui')])).toThrow(
      'A question must have at least 2 answers',
    );
  });
});

describe('Test answer creation', function () {
  test('an answer can have a next question', function () {
    const question = createQuestion('Est-ce correct ?', [
      createAnswer('Oui'),
      createAnswer('Non'),
    ]);

    const answer = createAnswer('Je suis lycéen', { nextQuestion: question });

    expect(answer.options?.nextQuestion).toBe(question);
  });

  test('two asnwers can lead to the same next question', function () {
    const question = createQuestion('Est-ce correct ?', [
      createAnswer('Oui'),
      createAnswer('Non'),
    ]);

    const answerA = createAnswer('Je suis lycéen', { nextQuestion: question });
    const answerB = createAnswer('Je suis en CPGE', { nextQuestion: question });

    expect(answerA.options?.nextQuestion).toBe(question);
    expect(answerB.options?.nextQuestion).toBe(question);
  });
});

export {};
