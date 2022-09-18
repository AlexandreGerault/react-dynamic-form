import { render, screen, fireEvent } from "@testing-library/react";
import { DynamicForm } from "@/react/DynamicForm";
import formTree from "@/tests/fixtures/formTree";
import "@testing-library/jest-dom";

describe("Dynamic Form Component test suite", function () {
  test("it shows the initial question label and answer on mount", async function () {
    const handleSubmit = jest.fn();

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    await screen.findByText(formTree.label);

    expect(screen.getByLabelText("Un homme")).not.toBeNull();
    expect(screen.getByLabelText("Une femme")).not.toBeNull();
    expect(screen.getByLabelText("Autre")).not.toBeNull();
  });

  test("it shows the next question when the user validate an answer", async function () {
    const handleSubmit = jest.fn();

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByLabelText("Un homme"));
    fireEvent.click(screen.getByText("Valider"));

    expect(screen.getByText("Quel est votre âge ?")).not.toBeNull();
  });

  test("it calls a callback when it is the end of the form", async function () {
    const handleSubmit = jest.fn();

    render(<DynamicForm questionsTree={formTree} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByLabelText("Un homme"));
    fireEvent.click(screen.getByText("Valider"));

    fireEvent.click(screen.getByLabelText("Entre 18 et 25 ans"));
    fireEvent.click(screen.getByText("Valider"));

    expect(handleSubmit).toHaveBeenCalled();
  });
});

export {};
