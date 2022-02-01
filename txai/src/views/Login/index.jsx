import React, { useState } from 'react';
import './styles.css'
import { useHistory } from 'react-router';
import axios from 'axios';

import LoadingScreen from '../../components/Loading-screen';
import InputLogin from '../../components/Input-login';
import DefaultButton from '../../components/Default-button';
import ModalCreateUser from '../ModalCreateUser';

export default function Login() {

    const [createUser, setCreateUser] = useState(false)
    const [user, setUser] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [loading, setLoading] = useState(false)

    const handleModalCreateUser = () => {
        setCreateUser(!createUser)
    }

    const history = useHistory()

    const handleLogin = async () => {
        setLoading(true)

        const password = userPassword.toString()

        if (user.length > 0 && password.length > 0) {

            try {
                const { data: userDataBase } = await axios.post('http://localhost:5000/user/show', { mail: user })
                console.log(userDataBase)
                if (userDataBase) {
                    if (userDataBase.password === userPassword.toString()) {
                        localStorage.setItem('mail', userDataBase.mail)
                        localStorage.setItem('id', userDataBase.id)
                        history.push('/dashboard')
                        setLoading(false)
                    } else {
                        setErrorMessage('senha incorreta')
                        setLoading(false)
                    }
                }

            } catch (e) {
                setErrorMessage('usuário inexistente')
                setLoading(false)
            }

        } else {
            setErrorMessage('preencha os campos')
            setLoading(false)
        }
    }
    return (
        <div className='container-login'>
            {/*loading de processamento de função*/}
            {loading && <LoadingScreen />}

            {/*modal de criar usuário*/}
            {createUser && <ModalCreateUser closeButton={handleModalCreateUser} />}
            <div className='login-content'>
                <div className='login'>
                    <InputLogin inputTitle={'Usuário'} onChangeState={setUser} />
                    <InputLogin inputTitle={'Senha'} onChangeState={setUserPassword} />
                    <DefaultButton contentButton={'Acessar'} buttonColor={"#332b48"} actionButton={handleLogin} />
                    <span className='error-message'>{errorMessage}</span>
                    <DefaultButton contentButton='Criar' actionButton={handleModalCreateUser} />
                </div>
            </div>
        </div>
    )
}
