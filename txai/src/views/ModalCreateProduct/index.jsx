import React, { useEffect, useState } from 'react';
import './styles.css'

import InputLogin from '../../components/Input-login'
import DefaultButton from '../../components/Default-button';

import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios';

export default function ModalCreateProduct({ closeButton }) {
    const [productName, setProductName] = useState('')
    const [productValue, setProductValue] = useState('')
    const [productQuantity, setProductQuantity] = useState('')

    const [allProducts, setAllProducts] = useState()

    const [errorMessage, setErrorMessage] = useState('')

    const handleCreateProduct = async () => {
        if (productName.length > 0 && productValue.length > 0 && productQuantity.length > 0) {
            const verifyDuplicateExists = allProducts?.filter(product => product.name == productName)
            if (verifyDuplicateExists?.length === 0) {
                try {
                console.log('entrou')
                    await axios.post('http://localhost:5000/product/create', {
                        name: productName,
                        value: productValue,
                        quantity: productQuantity,
                        id_user: localStorage.getItem('id')
                    })
                    closeButton()
                } catch (e) {
                    console.log(e)
                }
            } else {
                setErrorMessage('nome de produto ja existe')
            }
        } else {
            setErrorMessage('preencha todas as informações')
        }
    }

    useEffect(async () => {
        const { data } = await axios.post('http://localhost:5000/product/show', {
            mail: localStorage.getItem('mail')
        })
        setAllProducts(data)
    }, [])

    return (
        <div className='background-modal-user'>
            <div className='close-button'>
                <button onClick={() => closeButton()}><AiOutlineClose /></button>
            </div>
            <div className='container-create-user'>
                <InputLogin inputTitle='Nome'
                    onChangeState={setProductName}
                    titleColor={'#000'}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />
                <InputLogin inputTitle='Valor'
                    onChangeState={setProductValue}
                    titleColor={'#000'}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />
                <InputLogin inputTitle='Quantidade'
                    onChangeState={setProductQuantity}
                    titleColor={'#000'}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />

                <DefaultButton contentButton={'Criar'} actionButton={handleCreateProduct} />
                <span style={{color: 'red'}}>{errorMessage}</span>
            </div>
        </div>

    );
}
