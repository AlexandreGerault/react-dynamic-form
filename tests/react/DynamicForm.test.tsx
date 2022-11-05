import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, test, vi } from 'vitest';

import { DynamicForm } from '@/react/DynamicForm';
import { formTreeWithOptions, formTreeWithoutOptions } from '@/tests/fixtures/formTree';

describe('Dynamic Form Component test suite', function () {
  test('it shows the initial question label and answer on mount', async function () {
    const handleSubmit = vi.fn();

    render(
      <DynamicForm questionsTree={formTreeWithoutOptions} onSubmit={handleSubmit} />,
    );

    await screen.findByText(formTreeWithoutOptions.label);

    expect(screen.getByLabelText('Un homme')).not.toBeNull();
    expect(screen.getByLabelText('Une femme')).not.toBeNull();
    expect(screen.getByLabelText('Autre')).not.toBeNull();
  });

  test('it shows the next question when the user validate an answer', async function () {
    const handleSubmit = vi.fn();

    render(
      <DynamicForm questionsTree={formTreeWithoutOptions} onSubmit={handleSubmit} />,
    );

    fireEvent.click(screen.getByLabelText('Un homme'));
    fireEvent.click(screen.getByText('Valider'));

    expect(screen.getByText('Quel est votre âge ?')).not.toBeNull();
  });

  test('it goes back to the previous question when you click on back button', async function () {
    const handleSubmit = vi.fn();

    render(
      <DynamicForm questionsTree={formTreeWithoutOptions} onSubmit={handleSubmit} />,
    );

    fireEvent.click(screen.getByLabelText('Un homme'));
    fireEvent.click(screen.getByText('Valider'));

    await screen.findByText('Retour');

    fireEvent.click(screen.getByText('Retour'));

    await screen.findByText('Question 1 : Vous êtes');
  });

  test('it cannot go back when it is the first question', async function () {
    const handleSubmit = vi.fn();

    render(
      <DynamicForm questionsTree={formTreeWithoutOptions} onSubmit={handleSubmit} />,
    );

    await screen.findByText('Retour');

    expect(screen.getByText('Retour')).toBeDisabled();

    fireEvent.click(screen.getByLabelText('Un homme'));

    await screen.findByText('Retour');

    expect(screen.getByText('Retour')).toBeDisabled();
  });

  test('it calls a callback when it is the end of the form with selected answers', async function () {
    let values = {};
    const handleSubmit = (_values: Record<string, string>) => {
      values = _values;
    };

    render(
      <DynamicForm questionsTree={formTreeWithoutOptions} onSubmit={handleSubmit} />,
    );

    fireEvent.click(screen.getByLabelText('Un homme'));
    fireEvent.click(screen.getByText('Valider'));

    fireEvent.click(screen.getByLabelText('Entre 18 et 25 ans'));
    fireEvent.click(screen.getByText('Valider'));

    expect(values).toEqual({
      'Question 1 : Vous êtes': 'Un homme',
      'Quel est votre âge ?': 'Entre 18 et 25 ans',
    });
  });
});

describe('Test dynamic form component with options for questions and answers', function () {
  test('it calls a callback when it is the end of the form with selected answers', async function () {
    let values = {};
    const handleSubmit = (_values: Record<string, string>) => {
      values = _values;
    };

    render(<DynamicForm questionsTree={formTreeWithOptions} onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByLabelText('Un homme'));
    fireEvent.click(screen.getByText('Valider'));

    fireEvent.click(screen.getByLabelText('Entre 18 et 25 ans'));
    fireEvent.click(screen.getByText('Valider'));

    expect(values).toEqual({
      gender: 'man',
      age: 'age-18-25',
    });
  });
});

export {};
