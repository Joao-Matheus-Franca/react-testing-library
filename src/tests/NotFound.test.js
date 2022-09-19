import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testando o componente Not Found', () => {
  test('Testando o header do componente', () => {
    renderWithRouter(<NotFound />);
    const header = screen.getByRole('heading', { name: /page requested not found/i });
    expect(header).toBeInTheDocument();
  });
  test('testando a imagem do componente', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(src);
  });
});
