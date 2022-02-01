import React, { useState } from 'react';
import './styles.css'

import InputLogin from '../../components/Input-login'
import DefaultButton from '../../components/Default-button';

import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios';

export default function ModalUpdateProduct({ closeButton, updateProduct }) {

    const [productName, setProductName] = useState(updateProduct?.name)
    const [productValue, setProductValue] = useState(updateProduct?.value)
    const [productQuantity, setProductQuantity] = useState(updateProduct?.quantity)

    const [errorMessage, setErrorMessage] = useState('')

    const handleUpdateProduct = async () => {
        if (productName !== updateProduct?.name && productName.length > 0 || productValue !== updateProduct?.value && productValue.length > 0 || productQuantity !== updateProduct?.quantity && productQuantity.length > 0) {
            try {
                await axios.post('http://localhost:5000/product/create', {
                    name: productName,
                    value: productValue,
                    quantity: productQuantity,
                    id: updateProduct?.id
                })
                closeButton()
            } catch (e) {

            }
        }else{
            setErrorMessage('erro ao atualizar produto')
        }
    }

    return (
        <div className='background-modal-user'>
            <div className='close-button'>
                <button onClick={() => closeButton()}><AiOutlineClose /></button>
            </div>
            <div className='container-create-user'>
                <InputLogin
                    inputTitle='Nome'
                    onChangeState={setProductName}
                    titleColor={'#000'}
                    inputValue={productName}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />
                <InputLogin
                    inputType={'number'}
                    inputTitle='Valor'
                    onChangeState={setProductValue}
                    titleColor={'#000'}
                    inputValue={productValue}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />
                <InputLogin
                    inputType={'number'}
                    inputTitle='Quantidade'
                    onChangeState={setProductQuantity}
                    titleColor={'#000'}
                    inputValue={productQuantity}
                    inputColor={'#dedede'}
                    inputBorder={'1px solid #aeaeae'}
                />

                <DefaultButton contentButton={'Atualizar'} actionButton={handleUpdateProduct} />
                <span style={{color: 'red'}}>{errorMessage}</span>
            </div>
        </div>

    );
}
