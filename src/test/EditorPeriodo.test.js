
import {fireEvent, render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import {store} from "../redux/store";
// @ts-ignore
import EditorPeriodo from "../components/EditorPeriodo.tsx"
function renderizaPagina(element) {
    render(
        <Provider store={store}>
            <BrowserRouter>
                {element}
            </BrowserRouter>
        </Provider>
    )
}


describe("testes do componente editarPeriodo", () => {

    it("deve renderizar o componente", () => {
        renderizaPagina(<EditorPeriodo/>)
        expect(screen.getByTestId("editor-periodo-test-id")).toBeInTheDocument();
    })

    it("interação com o componente", () => {
        renderizaPagina(<EditorPeriodo/>)
        const inputPeriodoInicial = screen.getByTestId("input-periodo-inicial-test-id");
        const inputPeriodoFinal = screen.getByTestId("input-periodo-final-test-id");
        const inputSubmit = screen.getByTestId("input-submit-test-id");

        expect(inputPeriodoInicial).toBeInTheDocument();
        expect(inputPeriodoFinal).toBeInTheDocument();
        expect(inputSubmit).toBeInTheDocument();

        fireEvent.change(inputPeriodoInicial, {target: {value: "2021-01-01"}});
        fireEvent.change(inputPeriodoFinal, {target: {value: "2021-01-31"}});
        fireEvent.click(inputSubmit);
    })
})