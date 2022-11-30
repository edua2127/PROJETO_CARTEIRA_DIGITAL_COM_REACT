import { render, screen } from '@testing-library/react';
import App from '../App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from "../redux/store";
import Home from '../pages/Home';
import Login from '../pages/Login';
import MyButton from '../components/login_buttons';
function renderizaPagina(element) {
  render(
    <Provider store={store}>
        <BrowserRouter>
            {element}
        </BrowserRouter>
    </Provider>
  )
}


describe("suite de testes que verificam se a pagina renderiza com sucesso", ()=> {
  it("verifica se a pagina home renderiza com sucesso", () => {
    renderizaPagina(<Home />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("verifica se a pagina login renderiza com sucesso", () => {
    renderizaPagina(<Login />);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("verifica se o botao de login_button renderiza com sucesso", () => {
    renderizaPagina(<MyButton />);
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

})