import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testando o projeto Star Wars', () => {
  test('testa se existe uma barra de pesquisa', () => {
    render(<App />);
    const input = screen.getByText(/Pesquisar/i);
    userEvent.type(input, 'Endor');
    expect(input).toBeInTheDocument();
  });

  test('testa se há o nome star wars impresso na tela', () => {
    render(<App />);
    const text = screen.getByText(/Star Wars/i);
    expect(text).toBeInTheDocument();
  });

  test('testa se existe o valor 0', () => {
    render(<App />);
    const text = screen.getByTestId('value-filter');
    expect(text).toBeInTheDocument();
  });

  test('testa se há um select de Operador', () => {
    render(<App />);
    const inputOperator = screen.getByTestId('comparison-filter');
    expect(inputOperator).toHaveValue('maior que');
  });

  test('testa se há um select de Coluna', () => {
    render(<App />);
    const inputColumn = screen.getByTestId('column-filter');
    expect(inputColumn).toHaveValue('population');
  });

  test('Verificar se existe um botão clicavel na tela', () => {
    render(<App />);

    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    expect(buttonFilter).toBeInTheDocument();
  });
});
