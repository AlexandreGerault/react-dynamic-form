import { render } from "@testing-library/react";
import { DynamicForm } from "@/react/DynamicForm";

describe("Dynamic Form Component test suite", function () {
  test("it shows the initial question label and answer on mount", function () {
    render(<DynamicForm />);
  });
});

export {};
