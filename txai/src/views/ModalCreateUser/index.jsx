import React, { useState } from 'react';
import './styles.css'

import InputLogin from '../../components/Input-login'
import DefaultButton from '../../components/Default-button';

import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios';

export default function ModalCreateUser({ closeButton }) {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userRepeatPassword, setUserRepeatPassword] = useState('')
    const [userMail, setUserMail] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    async function createUserInDatabase() {
        if (userName.length > 0 && userPassword.length > 0 && userMail.length > 0 && userMail.length > 0) {
            if (userPassword === userRepeatPassword) {
                try {
                    await axios.post(`${process.env.REACT_APP_URL_SERVER}/user/create`, {
                        name: userName,
                        password: userPassword,
                        mail: userMail,
                        isMaster: false
                    })
                    closeButton()
                } catch (e) {
                    console.log(e)
                }
            } else {
                setErrorMessage('As senhas não coincidem')
            }
        } else {
            setErrorMessage('Preencha todas as informações')
        }
    }

    return (
        <div className='background-modal-user'>
            <div className='close-button'>
                <button onClick={() => closeButton()}><AiOutlineClose /></button>
            </div>
            <div className='container-create-user'>
                <InputLogin inputTitle='Nome'
                    onChangeState={setUserName}
                    titleColor={'#000'}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />
                <InputLogin inputTitle='Senha'
                    onChangeState={setUserPassword}
                    titleColor={'#000'}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />
                <InputLogin inputTitle='Repita a senha'
                    onChangeState={setUserRepeatPassword}
                    titleColor={'#000'}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />
                <InputLogin inputTitle='Email'
                    onChangeState={setUserMail}
                    titleColor={'#000'}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />

                <DefaultButton contentButton={'Criar'} actionButton={createUserInDatabase} />
                <span className='error-create-user'>{errorMessage}</span>
            </div>
        </div>

    );
}
