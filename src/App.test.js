import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App'

describe('Component principal', () => {
  //Teste do component
  describe('Quando eu abro o app do banco', () => {
    it('O nome do banco', async () => {
      //Esse render vai simular o render do react para poder carregar o component
      render(<App />);

      //screen serve para falar que vai procurar no component que foi rederizado pelo teste
      //getByText vai fazer uma busca no screen pelo testo passado
      //toBeInTheDocument verifica no documento se o que foi procurado existe
      expect(await screen.findByText('ByteBank')).toBeInTheDocument();
      //expect(screen.getByText('ByteBank')).toBeInTheDocument();
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

  //teste de uma função
  describe('Quando eu realizo uma transação', () => {
    it('que é um saque, o valor do saldo vai diminuir', () => {
      const valores = {
        transacao: 'saque',
        valor: 50
      }

      const novoSaldo = calcularNovoSaldo(valores, 150)
      expect(novoSaldo).toBe(100);
    })

    it('que é um saque, a transação deve ser realizada', () => {
      const {
        getByText,
        getByLabelText,
        getByTestId
      } = render(<App />);
  
      //pega o elemento que tem esse texto
      const saldo = getByText('R$ 1000');
      //pega o elemento que tem esse texto como label
      const transacao = getByLabelText('Saque');
      //pega o elemento que tem esse testId
      const valor = getByTestId('valor');
      const botaoTransacao = getByText('Realizar operação');
  
      expect(saldo.textContent).toBe('R$ 1000');
      fireEvent.click(transacao, {target: {value: 'saque'}});
      fireEvent.change(valor, {target: {value: 10}});
      fireEvent.click(botaoTransacao);
      expect(saldo.textContent).toBe('R$ 990');

    })

    //outra forma de escrever o teste acima é usando o screen ao invés do destructuring
    it('que é um saque, a transação deve ser realizada', () => {
      render(<App />);
  
      //pega o elemento que tem esse texto
      const saldo = screen.getByText('R$ 1000');
      //pega o elemento que tem esse texto como label
      const transacao = screen.getByLabelText('Saque');
      //pega o elemento que tem esse testId
      const valor = screen.getByTestId('valor');
      const botaoTransacao = screen.getByText('Realizar operação');
  
      expect(saldo.textContent).toBe('R$ 1000');
      fireEvent.click(transacao, {target: {value: 'saque'}});
      fireEvent.change(valor, {target: {value: 10}});
      fireEvent.click(botaoTransacao);
      expect(saldo.textContent).toBe('R$ 990');

    })    
    
  })
})

