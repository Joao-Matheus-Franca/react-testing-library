import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando os Links da barra de navegação', () => {
  test('Testando a presença dos Links na página', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritesLink).toBeInTheDocument();
  });

  test('Testando redirecionamento do Link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testando redirecionamento do Link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testando redirecionamento do Link Favorites Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testando redirecionamento para página padrão de erro 404', () => {
    const { history } = renderWithRouter(<App />);
    act(() => { history.push('/erro404'); });

    const error = screen.getByRole('heading', { name: /page requested not found/i });

    expect(error).toBeInTheDocument();
  });
});
