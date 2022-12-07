import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

function renderizaPagina(element) {
  render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
}

describe("basic login elements testing switch", () => {
  it("should see if the login fields exist", () => {
    renderizaPagina(<Login />);
    expect(screen.getByTestId("email-login")).toBeInTheDocument();
    expect(screen.getByTestId("senha-login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("simula a ação de login", () => {
    renderizaPagina(<Login />);
    const inputEmail = screen.getByTestId("email-login");
    const inputSenha = screen.getByTestId("senha-login");
    const button = screen.getByTestId("button-login");

    fireEvent.change(inputEmail, { target: { value: "eduardo123@gmail.com" } });
    fireEvent.change(inputSenha, { target: { value: "Edu456789#$%%1234" } });
    fireEvent.click(button);
    expect(window.location.pathname).toBe("/home");
  });
});
