import {fireEvent, render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import {store} from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import Login from '../pages/Login';


function renderizaPagina(element) {
    render(
        <Provider store={store}>
            <BrowserRouter>
                {element}
            </BrowserRouter>
        </Provider>
    )
}

describe("basic login elements testing switch", () => {

    it("should see if the login fields exist", () => {
        renderizaPagina(<Login/>)
        expect(screen.getByTestId("email-login")).toBeInTheDocument();
        expect(screen.getByTestId("senha-login")).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /entrar/i})).toBeInTheDocument();
    })

})