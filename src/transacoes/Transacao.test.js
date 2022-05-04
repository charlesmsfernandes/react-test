import React from "react";
import { render } from "@testing-library/react";
import Transacao from "./Transacao";

describe("Component de transação do extrato", () => {
  it('O snapshot do component deve permanecert sempre o mesmo', () => { 
    const {container} = render(<Transacao data="02/05/2022" tipo="saque" valor="20.00" />)

    expect(container.firstChild).toMatchSnapshot();
   })
})