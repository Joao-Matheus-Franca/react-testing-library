import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente Pokémon', () => {
  test('Tentando os atributos da imagem do pokemon', () => {
    renderWithRouter(<App />);
    const image = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });
  test('Tentando os atributos da imagem de favorito e link para mais detalhes', () => {
    const number = 4;
    localStorage.setItem('favoritePokemonIds', JSON.stringify([number]));

    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoritesLink);

    const favoriteImage = screen
      .getByRole('img', { name: /charmander is marked as favorite/i });
    expect(favoriteImage.src).toBe('http://localhost/star-icon.svg');
    expect(favoriteImage.alt).toBe('Charmander is marked as favorite');

    const typePokemon = screen.getByText('Fire');
    expect(typePokemon).toBeInTheDocument();

    const detailsPokemon = screen.getByText('More details');
    userEvent.click(detailsPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/4');
  });
});
