import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import mockData from './mockData';

const orbitalPeriod = 'orbital_period';
const columnFilter = 'column-filter';
const valueFilter = 'value-filter';
const comparisonFilter = 'comparison-filter';

describe('testa o fetch e as aplicações', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
  });
  afterEach(() => jest.clearAllMocks());

  test('testa se há um filtro de Nome', async () => {
    render(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();
    userEvent.type(nameFilter, 'oo');
    const oneName = await screen.findByRole('cell', { oneName: /Tatooine/i });
    expect(oneName).toBeInTheDocument();
  });

  test('testa a requisição da API', async () => {
    render(<App />);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/planets',
    );
    expect(await screen.findByRole('table')).toBeInTheDocument();
  });

  test('testa se há um button que filtra os seletores', async () => {
    render(<App />);
    const filterColumn = screen.getByTestId(columnFilter);
    const filterComparison = screen.getByTestId(comparisonFilter);
    const value = screen.getByTestId(valueFilter);
    userEvent.type(filterColumn, 'population');
    userEvent.type(filterComparison, 'maior que');
    userEvent.type(value, '0');
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);
  });

  test('testa se há um seletor menor que', async () => {
    render(<App />);
    const endor = await screen.findByRole('cell', { name: /Endor/i });
    const column = screen.getByTestId(columnFilter);
    const operator = screen.getByTestId(comparisonFilter);
    const number = screen.getByTestId(valueFilter);
    userEvent.selectOptions(column, orbitalPeriod);
    userEvent.selectOptions(operator, 'menor que');
    userEvent.type(number, '310');
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);
    const tatooine = await screen.findByRole('cell', { name: /Tatooine/i });
    expect(tatooine).toBeInTheDocument();
    expect(endor).not.toBeVisible();
  });

  test('testa se há um seletor maior que', async () => {
    render(<App />);
    const alderaan = await screen.findByRole('cell', { name: /Alderaan/i });
    const filterColumn = screen.getByTestId(columnFilter);
    const operator = screen.getByTestId(comparisonFilter);
    const value = screen.getByTestId(valueFilter);
    userEvent.selectOptions(filterColumn, orbitalPeriod);
    userEvent.type(operator, 'maior que');
    userEvent.type(value, '400');
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);
    const endor = await screen.findByRole('cell', { name: /Endor/i });
    expect(endor).toBeInTheDocument();
    expect(alderaan).not.toBeInTheDocument();
  });

  test('testa se há um seletor menor que', async () => {
    render(<App />);
    const endor = await screen.findByRole('cell', { name: /Endor/i });
    const column = screen.getByTestId(columnFilter);
    const operator = screen.getByTestId(comparisonFilter);
    const number = screen.getByTestId(valueFilter);
    userEvent.selectOptions(column, orbitalPeriod);
    userEvent.selectOptions(operator, 'igual a');
    userEvent.type(number, '364');
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);
    const alderaan = await screen.findByRole('cell', { name: /Alderaan/i });
    expect(alderaan).toBeInTheDocument();
    expect(endor).not.toBeVisible();
  });

  test('testa se há um botão que deleta os filtros', async () => {
    render(<App />);
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);
    const remove = screen.getAllByRole('button', { name: /Delete/i });
    expect(remove[0]).toBeInTheDocument();
    userEvent.click(remove[0]);
    expect(remove[0]).not.toBeVisible();
  });

  test('testa se há um botão que deleta todos os filtros', async () => {
    render(<App />);
    const buttonFilter = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(buttonFilter);
    const removeAll = await screen.findByTestId('button-remove-filters');
    expect(removeAll).toBeInTheDocument();
    userEvent.click(removeAll);
    expect(await screen.findByRole('table')).toBeInTheDocument();
  });
});