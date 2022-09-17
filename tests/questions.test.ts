import { createAnswer, createQuestion } from "../src/core/questions";

describe("Test question creation", function () {
  test("test a question can have many answers", function () {
    const question = createQuestion("Est-ce correct ?", [
      createAnswer("Oui"),
      createAnswer("Neutre"),
      createAnswer("Non"),
    ]);
    expect(question.answers.length).toBe(3);
  });

  test("a question cannot have less than 2 answers", function () {
    expect(() =>
      createQuestion("Est-ce correct ?", [createAnswer("Oui")])
    ).toThrow("A question must have at least 2 answers");
  });
});

test("an answer can have a next question", function () {
  const question = createQuestion("Est-ce correct ?", [
    createAnswer("Oui"),
    createAnswer("Non"),
  ]);

  const answer = createAnswer("Je suis lycéen", { ...question });

  expect(answer.nextQuestion).toEqual(question);
});

export {};
