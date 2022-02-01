import axios from 'axios';
import React from 'react';
import DefaultButton from '../../components/Default-button';
import './styles.css'

export default function ModalDeleteUser({handleDeleteUser, userLogged, handleLogout}) {

    async function handleDeleteProduct () {
        try {
            await axios.post('http://localhost:5000/user/delete', {
                userLogged
            })
            handleLogout()
        } catch (e) {

        }
    }

    return (
        <div className='bg-modal-delete-user'>
            <div className='container-delete-user'>
                <h1>Tem certeza que deseja excluir sua conta ?</h1>
                <div className='delete-user-buttons'>
                    <DefaultButton buttonColor={'green'} contentButton={'Cancelar'} actionButton={handleDeleteUser}/>
                    <DefaultButton buttonColor={'red'} contentButton={'Excluir'} actionButton={handleDeleteProduct}/>
                </div>
            </div>
        </div>
    )
}
