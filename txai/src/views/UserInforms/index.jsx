import React, { Fragment, useState } from 'react';
import './styles.css'

import DefaultButton from '../../components/Default-button';
import InputInforms from '../../components/input-informs';
import axios from 'axios';
import { useHistory } from 'react-router';
import ModalDeleteUser from '../ModalDeleteUser';

export default function UserInforms({ userLogged, getUserLogged }) {

    const history = useHistory()

    const [userNameUpdated, setUserNameUpdated] = useState(userLogged?.name)
    const [passwordUpdated, setPasswordUpdated] = useState('')
    const [passwordUpdatedRepeat, setPasswordUpdatedRepeat] = useState('')
    const [mailUpdated, setMailUpdated] = useState(userLogged?.mail)

    const [errorMessage, setErrorMessage] = useState('')

    const [deleteUser, setDeleteUser] = useState(false)

    const handleUpdateUser = async () => {
        /*caso alguma informaçao preenchida seja diferente das informações do usuário, atualize*/
        /*caso alguma informação seja vazia o servidor irá entender que é pra ignorar e atualizar somente oque foi solicitado*/
        if (userNameUpdated !== userLogged?.name || passwordUpdated.length > 0 || mailUpdated !== userLogged?.mail) {
            if (passwordUpdated === passwordUpdatedRepeat) {
                const userUpdated = await axios.post('http://localhost:5000/user/create', {
                    name: userNameUpdated,
                    password: passwordUpdated,
                    mail: mailUpdated,
                    id: localStorage.getItem('id')
                })
                /*atualiza o usuário logado*/
                localStorage.setItem('mail', mailUpdated)
                getUserLogged()
                setErrorMessage('Atualizado com sucesso!')
            } else {
                setErrorMessage("As senhas não coincidem")
            }
        } else {
            setErrorMessage('Nenhuma atualização para ser feita')
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        history.goBack()
    }

    const handleDeleteUser = () => {
        setDeleteUser(!deleteUser)
    }

    return (
        <Fragment>
            {deleteUser && <ModalDeleteUser handleDeleteUser={handleDeleteUser} userLogged={userLogged} handleLogout={handleLogout}/>}
            <div className='container-user-informs'>
                <InputInforms
                    titleLabel={'Usuário:'}
                    onChangeState={setUserNameUpdated}
                    value={userNameUpdated}
                />
                <hr />

                <div className='password-container'>
                    <InputInforms
                        titleLabel={'Nova senha:'}
                        onChangeState={setPasswordUpdated}
                    />
                    <InputInforms
                        titleLabel={'Repita a Nova senha:'}
                        onChangeState={setPasswordUpdatedRepeat}
                    />
                </div>

                <hr />

                <InputInforms
                    titleLabel={'Email:'}
                    onChangeState={setMailUpdated}
                    value={mailUpdated}
                />
            </div>
            <span className='errorMessage'>{errorMessage}</span>
            <footer className='footer-user-informs'>
                <div className='left-buttons'>
                    <DefaultButton contentButton='Logout' actionButton={handleLogout} />
                    <DefaultButton contentButton='Excluir' actionButton={handleDeleteUser} />

                </div>
                <DefaultButton contentButton='Salvar' actionButton={handleUpdateUser} />
            </footer>
        </Fragment>
    );
}
