import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Testando a página de pokémons favoritos', () => {
  test('Testando a página sem pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFoundMessage = screen.getByText(/no favorite pokemon found/i);
    expect(noFoundMessage).toBeInTheDocument();
  });
  test('Testando a página com pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoritesList = localStorage.getItem('favoritePokemonIds');

    if (favoritesList === null) {
      const noFoundMessage = screen.getByText(/no favorite pokemon found/i);
      expect(noFoundMessage).toBeInTheDocument();
    }
    if (favoritesList) {
      const favoritesCards = screen.getAllByRole('link', { name: /more details/i });
      expect(favoritesCards.length).toBe(favoritesList.length);
    }
  });
});
