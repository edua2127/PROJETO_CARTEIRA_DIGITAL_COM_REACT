import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";

function renderizaPagina(element) {
  render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
}

describe("suite de testes da pagina home", () => {
  it("verifica se os elementos da pagina home renderizam com sucesso", () => {
    renderizaPagina(<Home />);
    expect(screen.getByTestId("home-page-input-valor")).toBeInTheDocument();
    expect(screen.getByTestId("home-page-select-moeda")).toBeInTheDocument();
    expect(
      screen.getByTestId("home-page-select-metodoDePagamento")
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-page-select-tag")).toBeInTheDocument();
    expect(
      screen.getByTestId("home-page-input-dataDaDespesa")
    ).toBeInTheDocument();
    expect(screen.getByTestId("home-page-input-descricao")).toBeInTheDocument();
    expect(screen.getByTestId("home-page-button-submit")).toBeInTheDocument();
  });

  it("verifica se os valores dos inputs mudam conforme o usuario digita", () => {
    renderizaPagina(<Home />);
    const inputValor = screen.getByTestId("home-page-input-valor");
    const inputDescricao = screen.getByTestId("home-page-input-descricao");
    const inputTag = screen.getByTestId("home-page-select-tag");
    const inputMetodoDePagamento = screen.getByTestId(
      "home-page-select-metodoDePagamento"
    );
    const inputMoeda = screen.getByTestId("home-page-select-moeda");

    expect(inputValor.value).toBe("0");
    expect(inputDescricao.value).toBe("");
    expect(inputTag.value).toBe("ALIMENTAÇÃO");
    expect(inputMetodoDePagamento.value).toBe("DINHEIRO");
    expect(inputMoeda.value).toBe("BRL");

    fireEvent.change(inputValor, { target: { value: 100 } });
    fireEvent.change(inputDescricao, { target: { value: "teste" } });
    fireEvent.change(inputTag, { target: { value: "LAZER" } });
    fireEvent.change(inputMetodoDePagamento, {
      target: { value: "CARTÃO DE DÉBITO" },
    });
    fireEvent.change(inputMoeda, { target: { value: "DOLAR" } });

    expect(inputValor).toHaveValue(100);
    expect(inputDescricao).toHaveValue("teste");
    expect(inputTag).toHaveValue("LAZER");
    expect(inputMetodoDePagamento).toHaveValue("CARTÃO DE DÉBITO");
    expect(inputMoeda).toHaveValue("DOLAR");
  });

  it("verifica se os campos sào limpos após cadastrar uma despesa", () => {
    renderizaPagina(<Home />);
    const inputValor = screen.getByTestId("home-page-input-valor");
    const inputDescricao = screen.getByTestId("home-page-input-descricao");
    const inputTag = screen.getByTestId("home-page-select-tag");
    const inputMetodoDePagamento = screen.getByTestId(
      "home-page-select-metodoDePagamento"
    );
    const inputMoeda = screen.getByTestId("home-page-select-moeda");
    const inputButton = screen.getByTestId("home-page-button-submit");

    fireEvent.change(inputValor, { target: { value: 100 } });
    fireEvent.change(inputDescricao, { target: { value: "teste" } });
    fireEvent.change(inputTag, { target: { value: "LAZER" } });
    fireEvent.change(inputMetodoDePagamento, {
      target: { value: "CARTÃO DE DÉBITO" },
    });
    fireEvent.change(inputMoeda, { target: { value: "DOLAR" } });

    fireEvent.click(inputButton);

    expect(inputValor).toHaveValue(0);
    expect(inputDescricao).toHaveValue("");
    expect(inputTag).toHaveValue("ALIMENTAÇÃO");
    expect(inputMetodoDePagamento).toHaveValue("DINHEIRO");
    expect(inputMoeda).toHaveValue("BRL");
  });

  it("simula a ação de cadastrar uma despesa", () => {
    renderizaPagina(<Home />);

    const corpoDaTabela = screen.getByTestId("home-page-tbody");
    const inputValor = screen.getByTestId("home-page-input-valor");
    const inputDescricao = screen.getByTestId("home-page-input-descricao");
    const inputTag = screen.getByTestId("home-page-select-tag");
    const inputMetodoDePagamento = screen.getByTestId(
      "home-page-select-metodoDePagamento"
    );
    const inputMoeda = screen.getByTestId("home-page-select-moeda");
    const inputButton = screen.getByTestId("home-page-button-submit");

    fireEvent.change(inputValor, { target: { value: 100 } });
    fireEvent.change(inputDescricao, { target: { value: "teste" } });
    fireEvent.change(inputTag, { target: { value: "LAZER" } });
    fireEvent.change(inputMetodoDePagamento, {
      target: { value: "CARTÃO DE DÉBITO" },
    });
    fireEvent.change(inputMoeda, { target: { value: "DOLAR" } });

    fireEvent.click(inputButton);

    expect(corpoDaTabela).toHaveTextContent("100");
  });
});
