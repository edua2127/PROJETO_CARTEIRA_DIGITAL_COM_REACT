// @ts-ignore
import React, { useState } from "react"
// @ts-ignore
import style from '../styles/login.module.css'
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
const Login = () => {
    function validateEmail(email: string) {
        var filter = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
        return String(email).search(filter) != -1;
    }
    function validatePassword(password: string) {
        var filter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return String(password).search(filter) != -1;
    }

    function validadeFilds(email: string ,password: string){
        let valid = true;
        console.clear()

        if(!validateEmail(email)){
            valid = false;
            console.log("email incorreto")
            setValidoEmail('false')
        }
        if(!validatePassword(password)){

            valid = false;
            console.log("senha incorreta")
            setValidoSenha('false')
        }

        console.log(valid);

        return valid;
    }

    function useLogin(){
        if(validadeFilds(email, password)){
            //router.push('/home');
            navigate('/home')
        }
    }

    function handleCadastro(){
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [validoEmail, setValidoEmail] = useState('true');
    const [validoSenha, setValidoSenha] = useState('true');


  return (
    <div data-testid="login-page">
            <main className={style.login_back}>
                <section className={style.login_center}>
                    <h1 className={style.login_logo}>WALLE</h1>
                    <article className={style.login_article}>
                        <label>
                            {validoEmail === 'true' ? <p className={style.login_label}>Email</p> : <p className={style.login_label_error}>Email inválido</p>}
                            <input data-testid="email-login" className={style.login_input} type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </label>
                        <label>
                            {validoSenha === 'true' ? <p className={style.login_label}>Senha</p> : <p className={style.login_label_error}>Senha inválida</p>}
                            <input data-testid="senha-login" className={style.login_input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                    </article>
                    <article className={style.login_buttons}>
                        <Button variant="outlined" onClick={handleCadastro}>Cadastrar</Button>
                        <Button variant="outlined" data-testid="button-login" size="large" onClick={useLogin}>Entrar</Button>
                    </article>
                </section>
            </main>
        </div>
  )
}

export default Login;