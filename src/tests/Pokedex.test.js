import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Pokédex', () => {
  test('Testando o Header do componente', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(header).toBeInTheDocument();
  });

  test('Testando o botão de próximo pokémon', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();

    const pokemon = screen.getAllByRole('img', { name: /pikachu sprite/i });
    expect(pokemon[0].alt).toBe('Pikachu sprite');

    userEvent.click(button);

    expect(pokemon[0].alt).toBe('Charmander sprite');

    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);

    expect(pokemon[0].alt).toBe('Pikachu sprite');

    expect(pokemon.length).toBe(1);
  });

  test('Testando os botões de filtro do componente', () => {
    renderWithRouter(<App />);

    const number = 7;

    const filters = screen.getAllByTestId(/pokemon-type-button/i);

    const eletricFilter = screen.getByRole('button', { name: /electric/i });
    const fireFilter = screen.getByRole('button', { name: /fire/i });
    const bugFilter = screen.getByRole('button', { name: /bug/i });
    const poisonFilter = screen.getByRole('button', { name: /poison/i });
    const psychicFilter = screen.getByRole('button', { name: /psychic/i });
    const normalFilter = screen.getByRole('button', { name: /normal/i });
    const dragonFilter = screen.getByRole('button', { name: /dragon/i });

    const filtersArray = [eletricFilter, fireFilter, bugFilter, poisonFilter,
      psychicFilter, normalFilter, dragonFilter];

    expect(filters.length).toBe(number);

    filtersArray.forEach((e) => expect(e).toBeInTheDocument());

    userEvent.click(eletricFilter);

    const pokemonEletric = screen.getAllByText(/electric/i);
    expect(pokemonEletric.length).toBe(2);

    const allButton = screen.getByText(/all/i);
    expect(allButton).not.toBeDisabled();

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(allButton);
    expect(button).not.toBeDisabled();
  });
});
