// @ts-ignore
import React from 'react';
// @ts-ignore
import style from '../styles/EditarPeriodo.module.css';
import {useDispatch, useSelector} from 'react-redux';
// @ts-ignore
import type { RootState } from '../redux/store.ts';
import { despesa } from '../interface/despesa';
// @ts-ignore
import {editaAplicarFiltro, editaDespesasExibidas, editaPeriodoFinal, editaPeriodoInicial} from '../redux/geralSlice.ts';


const EditorPeriodo = () => {
    const dispatch = useDispatch()
    const stateGeral = useSelector((state: RootState) => state)

    function handleAplicarFiltro() {
        dispatch(editaAplicarFiltro(false))
        let filtroDespesasExibidas: despesa[] = [...stateGeral.geral.despesas]
        filtroDespesasExibidas = filtroDespesasExibidas.filter((despesaAtual) => {

            const dataDespesa = new Date(despesaAtual.data)
            const dataInicial = new Date(stateGeral.geral.periodoInicial)
            const dataFinal = new Date(stateGeral.geral.periodoFinal)

            const dataDespesaTime = dataDespesa.getTime()
            const dataInicialTime = dataInicial.getTime()
            const dataFinalTime = dataFinal.getTime()

            return dataDespesaTime >= dataInicialTime && dataDespesaTime <= dataFinalTime
        })
        dispatch(editaDespesasExibidas(filtroDespesasExibidas))
    }

    return (
        <section className={style.home_end_page} data-testid="editor-periodo-test-id">
            <article className={style.home_article_edicao_data}>
                <label>
                    <span className={style.home_texto_data}>Periodo Inicial</span>
                    <input type={"date"} className={style.home_input} data-testid="input-periodo-inicial-test-id"
                           value={stateGeral.geral.periodoInicial.toString()}
                           onChange={(e) => dispatch(editaPeriodoInicial(e.target.value))}/>
                </label>
                <label>
                    <span className={style.home_texto_data}>Periodo Final</span>
                    <input type={"date"} className={style.home_input} data-testid="input-periodo-final-test-id"
                           value={stateGeral.geral.periodoFinal.toString()}
                           onChange={(e) => dispatch(editaPeriodoFinal(e.target.value))}/>
                </label>
                <input type={"submit"} data-testid="input-submit-test-id" className={style.home_input} onClick={handleAplicarFiltro}/>
            </article>
        </section>
    )
}

export default EditorPeriodo