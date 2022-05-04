import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Conta from "./Conta";

describe('Componente de conta', () => {
  it('Exibir o saldo da conta como valor monetário', () => {
    render(<Conta saldo={1000} />);
    const saldo = screen.getByTestId('saldo-conta');

    expect(saldo.textContent).toBe('R$ 1000');
  })

  it('Chama a função de realizar transação, quando o botão é clicado', () => {
    const funRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funRealizarTransacao}/>);

    fireEvent.click(screen.getByText('Realizar operação'))

    expect(funRealizarTransacao).toHaveBeenCalled();
  })

  it('O snapshot do component deve permanecert sempre o mesmo', () => { 
    const funRealizarTransacao = jest.fn();
    const {container} = render(<Conta saldo={1000} realizarTransacao={funRealizarTransacao} />)

    expect(container.firstChild).toMatchSnapshot();
    })  
});