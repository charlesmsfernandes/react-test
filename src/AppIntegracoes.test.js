import React from "react";
import { render, screen } from "@testing-library/react";

import { listaTransacoes } from "./api";
import App from "./App"

jest.mock('./api');

describe('Requisiçoes para API', () => {
  it('Exibir lista de transações para através da API', async () => {
    render(<App />);

    listaTransacoes.mockResolvedValue([
      {
        "valor": 10,
        "transacao": "saque",
        "data": "10/04/2022",
        "id": 1
      },
      {
        "valor": 20,
        "transacao": "deposito",
        "data": "10/04/2022",
        "id": 2
      }
    ]);

    expect(await screen.findByText('saque')).toBeInTheDocument();

    expect(screen.getByTestId('transacoes').children.length).toBe(2)
  })
});