import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testes do componente Pokemon Details', () => {
  test('Testando o componente', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const name = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    expect(name).toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const summaryText = screen.getByText(/This intelligent Pokémon/i);
    expect(summaryText).toBeInTheDocument();
    const locations = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    expect(locations).toBeInTheDocument();
    const imageLocation = screen.getAllByRole('img', { name: 'Pikachu location' });
    const src01 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const src02 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(imageLocation[0].src).toBe(src01);
    expect(imageLocation[1].src).toBe(src02);
    const label = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
  });
});
