import React from 'react'
import { render, screen } from '@testing-library/react';

import App from './App'

describe('Component principal', () => {
  describe('Quando eu abro o app do banco', () => {
    it('O nome do banco', () => {
      //Esse render vai simular o render do react para poder carregar o component
      render(<App />);

      //screen serve para falar que vai procurar no component que foi rederizado pelo teste
      //getByText vai fazer uma busca no screen pelo testo passado
      //toBeInTheDocument verifica no documento se o que foi procurado existe
      expect(screen.getByText('ByteBank')).toBeInTheDocument();
    });

    it('O saldo é exibido', () => {
      render(<App />);
      expect(screen.getByText('Saldo:')).toBeInTheDocument();
    });

    it('O botão de realizar operação deve ser exibido', () => {
      render(<App />);
      expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    });
  })    
})

