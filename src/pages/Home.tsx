// @ts-ignore
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

// @ts-ignore
import style from '../styles/home.module.css'
import {despesa} from '../interface/despesa'

// @ts-ignore
import type {RootState} from '../redux/store.ts'

// @ts-ignore
import { editaAtualizaValorDolar, editaDataAtualDoFiltro, editaAplicarFiltro} from '../redux/geralSlice.ts';

// @ts-ignore
import {editaDescricao, editaDataDaDespesa, editaMoeda, editaTag, editaValor, editaValorDolar, } from '../redux/geralSlice.ts';

// @ts-ignore
import {editaDespesas, editaDespesasExibidas, editaMetodoDePagamento,  editaValorTotal} from '../redux/geralSlice';
// @ts-ignore
import EditorPeriodo from '../components/EditorPeriodo.tsx';


const Home = () => {

    let DateType: Date = new Date(Date.now())
    const dispatch = useDispatch()
    const stateGeral = useSelector((state: RootState) => state)


    React.useEffect(() => {
        filtroPelaDataAtual()
    }, [stateGeral.geral.dataAtualDoFiltro])


    React.useEffect(() => {
        atualizaValorDolaApi()
    }, [stateGeral.geral.atualizaValorDolar])


    React.useEffect(() => {
        calculoDoValorTotal()
    }, [stateGeral.geral.despesasExibidas])


    React.useEffect(() => {
        atualizaAsDespesasExibidas()
    }, [stateGeral.geral.despesas])

    function aumentarMesAtual() {
        const novaData = new Date(stateGeral.geral.dataAtualDoFiltro.getFullYear(),
            stateGeral.geral.dataAtualDoFiltro.getMonth() + 1, stateGeral.geral.dataAtualDoFiltro.getDay())
        dispatch(editaDataAtualDoFiltro(novaData))
    }

    function diminuirMesAtual() {
        const novaData = new Date(stateGeral.geral.dataAtualDoFiltro.getFullYear(),
            stateGeral.geral.dataAtualDoFiltro.getMonth() - 1, stateGeral.geral.dataAtualDoFiltro.getDay())
        dispatch(editaDataAtualDoFiltro(novaData))
    }

    function filtroPelaDataAtual() {
        let novaDespesasExibidas: despesa[] = [...stateGeral.geral.despesas]
        novaDespesasExibidas = novaDespesasExibidas.filter((despesaAtual) => {
            let dataDaDespesaAtual = new Date(despesaAtual.data)
            dataDaDespesaAtual.setDate(dataDaDespesaAtual.getDate() + 1)
            const dataAtualDoFiltro = new Date(stateGeral.geral.dataAtualDoFiltro)

            return dataDaDespesaAtual.getMonth() === dataAtualDoFiltro.getMonth()
                && dataDaDespesaAtual.getFullYear() === dataAtualDoFiltro.getFullYear()
        })
        dispatch(editaDespesasExibidas(novaDespesasExibidas))
    }

    const atualizaValorDolaApi = async () => {
        try {
            const res = await fetch('https://economia.awesomeapi.com.br/json/all')
            const json = await res.json()
            dispatch(editaValorDolar(parseFloat(json.USD.bid)))
        } catch (error) {
            console.log('erro ao carregar o valor do dolar ' + error)
        }
    }

    function calculoDoValorTotal() {
        const despesaExibidasLocal: despesa[] = stateGeral.geral.despesasExibidas
        let valorTotalAtual = 0
        despesaExibidasLocal.map((despesaAtual) => {
            let valorEmReal = parseFloat(despesaAtual.valor.toString())

            if (despesaAtual.moeda === 'DOLAR') {
                valorEmReal = despesaAtual.valor * stateGeral.geral.valorDolar
            }
            valorTotalAtual += valorEmReal
        })
        dispatch(editaValorTotal(valorTotalAtual.toFixed(2)))
    }

    function cadastrarDespesa() {

        //cria um novo objeto despesa
        const novaDespesa: despesa = criaUmaDespesaComOsDadosDoEditor()

        //limpa os states que compoem a despesa
        limpaOsCamposDeDespesa()

        //guarda a nova despesa no redux state
        dispatch(editaDespesas([...stateGeral.geral.despesas, novaDespesa]))

        //atualiza o valor do dolar para calcular o valor total das despesas
        atualizaValorDolar()
    }

    function atualizaAsDespesasExibidas() {
        dispatch(editaDespesasExibidas(stateGeral.geral.despesas))
    }

    function atualizaValorDolar() {
        dispatch(editaAtualizaValorDolar(true))
    }

    function criaUmaDespesaComOsDadosDoEditor(): despesa {
        return {
            valor: stateGeral.geral.valor,
            metodoDePagamento: stateGeral.geral.metodoDePagamento,
            moeda: stateGeral.geral.moeda,
            tag: stateGeral.geral.tag,
            descricao: stateGeral.geral.descricao,
            data: stateGeral.geral.dataDaDespesa,
        }
    }

    function limpaOsCamposDeDespesa() {
        dispatch(editaValor(0))
        dispatch(editaDescricao(""))
        dispatch(editaMoeda(""))
        dispatch(editaTag(""))
        dispatch(editaDataDaDespesa(DateType))
        dispatch(editaMetodoDePagamento(""))
    }

    function handleChangeAplicarFiltro() {
        dispatch(editaAplicarFiltro(true))
    }

    return (
        <div data-testid='home-page'>
            <header>
                <h1 className={style.home_logo}>Walle</h1>
            </header>
            <main>
                <section className={style.home_section}>
                    <article className={style.home_article}>
                        <input data-testid="home-page-input-valor" type="number" className={style.home_input}
                               placeholder={"Valor"}
                               value={stateGeral.geral.valor}
                               onChange={(e) => dispatch(editaValor(e.target.value))}/>
                        <select data-testid="home-page-select-moeda" className={style.home_input}
                                placeholder={"Moeda"}
                                value={stateGeral.geral.moeda}
                                onChange={(e) => dispatch(editaMoeda(e.target.value))}>

                            <option value="BRL">REAL</option>
                            <option value="DOLAR">DOLAR</option>
                        </select>
                        <select data-testid="home-page-select-metodoDePagamento" className={style.home_input}
                                placeholder={"Metodo de Pagamento"}
                                value={stateGeral.geral.metodoDePagamento}
                                onChange={(e) => dispatch(editaMetodoDePagamento(e.target.value))}>
                            <option value="DINHEIRO">Dinheiro</option>
                            <option value="CARTÃO DE DÉBITO">Cartão de débito</option>
                            <option value="CARTÃO DE CRÉDITO">Cartão de crédito</option>
                        </select>
                        <select data-testid="home-page-select-tag" className={style.home_input} placeholder={"Tag"}
                                value={stateGeral.geral.tag} onChange={(e) => dispatch(editaTag(e.target.value))}>
                            <option value="ALIMENTAÇÃO">Alimentação</option>
                            <option value="LAZER">Lazer</option>
                            <option value="TRABALHO">Trabalho</option>
                            <option value="TRANSPORTE">Transporte</option>
                            <option value="SAÚDE">Saúde</option>
                        </select>
                        <input data-testid="home-page-input-dataDaDespesa" type="date" className={style.home_input}
                               placeholder={"data da despesa"}
                               value={stateGeral.geral.dataDaDespesa.toString()}
                               onChange={(e) => dispatch(editaDataDaDespesa(e.target.value))}/>

                    </article>
                    <article className={style.home_article}>
                        <input data-testid="home-page-input-descricao" type={"text"}
                               className={style.home_input_descricao} placeholder={"Descrição"}
                               value={stateGeral.geral.descricao}
                               onChange={(e) => dispatch(editaDescricao(e.target.value))}/>
                        <input data-testid="home-page-button-submit" type={"submit"} className={style.home_input}
                               onClick={cadastrarDespesa}
                               value={"+ adicionar"}/>
                    </article>
                </section>
                <section className={style.home_section}>
                    <article>
                        <table className={style.home_table}>
                            <thead>
                            <tr>
                                <th className={style.home_table_td_th}>Valor</th>
                                <th className={style.home_table_td_th}>Moeda</th>
                                <th className={style.home_table_td_th}>Data da Despesa</th>
                                <th className={style.home_table_td_th}>Metodo de Pagamento</th>
                                <th className={style.home_table_td_th}>Tag</th>
                                <th className={style.home_table_td_th}>Descricao</th>
                            </tr>
                            </thead>
                            <tbody className={style.home_table_body} data-testid="home-page-tbody">

                            {stateGeral.geral.despesas.length > 0 && stateGeral.geral.despesasExibidas.map((item: despesa, index: number) => {
                                let data = new Date(item.data.getFullYear(), item.data.getMonth(), item.data.getDate())
                                data.setDate(data.getDate() + 1)
                                const dataFormatada = '' + data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()
                                return (
                                    <tr key={index} className={style.home_table_tr}>
                                        <td>{item.valor}</td>
                                        <td>{item.moeda}</td>
                                        <td>{dataFormatada} </td>
                                        <td>{item.metodoDePagamento}</td>
                                        <td>{item.tag}</td>
                                        <td>{item.descricao}</td>
                                    </tr>)
                            })}

                            </tbody>
                        </table>
                    </article>
                </section>
                <section className={style.home_end_page}>
                    <article className={style.home_article_edicao_data}>
                        <button className={style.home_button} onClick={diminuirMesAtual}>mês anterior</button>

                        <h1 className={style.home_texto_data}>{stateGeral.geral.dataAtualDoFiltro.getMonth() + 1} /
                            {stateGeral.geral.dataAtualDoFiltro.getFullYear()}</h1>
                        <button onClick={aumentarMesAtual} className={style.home_button}>próximo mês</button>
                        <button onClick={handleChangeAplicarFiltro} className={style.home_button}>editar período
                        </button>
                    </article>
                    <article>
                        <h1 className={style.home_texto_data}>R$ {stateGeral.geral.valorTotal}</h1>
                    </article>
                </section>
                {stateGeral.geral.aplicarFiltro && <EditorPeriodo/>}
            </main>
        </div>
    )
}

export default Home
