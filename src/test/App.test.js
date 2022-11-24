import { render, screen } from '@testing-library/react';
import App from '../App';

describe("suite de testes que verificam se a pagina renderiza com sucesso", ()=> {
  beforeEach(() => {
    //armazena o historico da sessao
    const currentState = window.history.state;
    //subtitui a url atual pelo '/'
    window.history.replaceState(currentState, '', '/');
  });

  test("verifica se pagina home renderiza com sucesso", () => {
    //redireciona a url atual para a '/home'
    window.history.pushState({}, "Teste da Pagina Home", "/home")

    //renderiza a pagina
    render(<App />)

    //verifica se o test-id esta no documento, se sim a pagina foi renderizada
    const testId = screen.getByTestId("home-page")
    expect(testId).toBeInTheDocument();
  })
})