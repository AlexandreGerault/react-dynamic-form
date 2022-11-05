import { render, screen, fireEvent } from "@testing-library/react";
import { DynamicForm } from "@/react/DynamicForm";
import formTree from "@/tests/fixtures/formTree";
import "@testing-library/jest-dom";
import { test, describe, vi } from 'vitest';

describe("Dynamic Form Component test suite", function () {
  test("it shows the initial question label and answer on mount", async function () {
    const handleSubmit = vi.fn();

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    await screen.findByText(formTree.label);

    expect(screen.getByLabelText("Un homme")).not.toBeNull();
    expect(screen.getByLabelText("Une femme")).not.toBeNull();
    expect(screen.getByLabelText("Autre")).not.toBeNull();
  });

  test("it shows the next question when the user validate an answer", async function () {
    const handleSubmit = vi.fn();

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByLabelText("Un homme"));
    fireEvent.click(screen.getByText("Valider"));

    expect(screen.getByText("Quel est votre âge ?")).not.toBeNull();
  });

  test("it goes back to the previous question when you click on back button", async function () {
    const handleSubmit = vi.fn();

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByLabelText("Un homme"));
    fireEvent.click(screen.getByText("Valider"));

    await screen.findByRole("button[back]");

    fireEvent.click(
      screen.getByRole("button[back]")
    );

    await screen.findByText("Question 1 : Vous êtes")
  });

  test("it cannot go back when it is the first question", async function () {
    const handleSubmit = vi.fn();

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    await screen.findByRole("button[back]");

    expect(screen.getByRole("button[back]")).toBeDisabled();

    fireEvent.click(screen.getByLabelText("Un homme"));

    await screen.findByRole("button[back]");

    expect(screen.getByRole("button[back]")).toBeDisabled();
  });

  test("it calls a callback when it is the end of the form with selected answers", async function () {
    let values = {};
    const handleSubmit = (_values: Record<string, string>) => {
      values = _values;
    };

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByLabelText("Un homme"));
    fireEvent.click(screen.getByText("Valider"));

    fireEvent.click(screen.getByLabelText("Entre 18 et 25 ans"));
    fireEvent.click(screen.getByText("Valider"));

    expect(values).toEqual({
      "Question 1 : Vous êtes": "Un homme",
      "Quel est votre âge ?": "Entre 18 et 25 ans",
    });
  });
});

export {};
