// @ts-ignore
import React, { useState } from "react"
// @ts-ignore
import style from '../styles/login.module.css'
import TextField from "@mui/material/TextField"
import MyButton from "../components/login_buttons"
import { useNavigate } from "react-router-dom"


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

                    {validoEmail === 'true' ? <TextField className={style.login_input}
                    id="email" label="Email" 
                    value={email} type="email"
                    variant="standard"
                    data-testid="email-login"
                    onChange={(e) => setEmail(e.target.value) }
                    /> : <TextField className={style.login_input} error
                                    helperText="Email Invalido!"
                                    id="email" label="Email"
                                    value={email} type="email"
                                    variant="standard"
                                    onChange={(e) => setEmail(e.target.value) }
                    />}

                    {validoSenha === 'true' ? <TextField className={style.login_input}
                    id="senha" label="Senha" 
                    value={password} type="password"
                    variant="standard"
                    data-testid="senha-login"
                    onChange={(e) => setPassword(e.target.value) }
                    /> : <TextField className={style.login_input} error
                                    helperText="Senha Invalida!"
                                    value={password} type="password" label="Senha"
                                    variant="standard"
                                    onChange={(e) => setPassword(e.target.value) }
                    />}

                    <section className={style.login_buttons}>
                        <MyButton handleEvent={handleCadastro}>Cadastrar</MyButton>
                        <MyButton handleEvent={useLogin}>Entrar</MyButton>
                    </section>
                </section>
            </main>
        </div>
  )
}

export default Login;