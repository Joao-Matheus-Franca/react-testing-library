import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../pages/About';

describe('Testando a página de About', () => {
  test('Testando o Header do componente About', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: /about pokédex/i });
    expect(header).toBeInTheDocument();
  });
  test('Testando os Parágrafos do componente About', () => {
    renderWithRouter(<About />);
    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
  });
  test('Testando a imagem componente About', () => {
    renderWithRouter(<About />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(src);
  });
});
