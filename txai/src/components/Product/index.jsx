import React, { Fragment, useState } from 'react';
import './styles.css'

import { FiEdit } from 'react-icons/fi'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { SiVerizon } from 'react-icons/si'
import { AiOutlineClose } from 'react-icons/ai'


import axios from 'axios';

export default function Product({ productName, productValue, ProductQuantity, handleUpdateProduct, handleDeleteProduct, product }) {

    let productInforms = product

    const [confirmDelete, setConfirmDelete] = useState(false)

    return (
        <Fragment>
            <div className='container-product'>
                <div className='product-name'>{productName}</div>
                <div className='product-value'>R$ {productValue}</div>
                <div className='product-quantity'>
                    {ProductQuantity}
                    <button className='edit-product' onClick={() => handleUpdateProduct(productInforms)}>
                        <FiEdit />
                    </button>
                    {confirmDelete ?
                        /*confirmação de deleção do item*/
                        <div className="container-confirm-delete">
                            <button onClick={() => { handleDeleteProduct(productInforms); setConfirmDelete(false) }}>
                                <SiVerizon size='15' />
                            </button>
                            <button onClick={() => setConfirmDelete(false)}>
                                <AiOutlineClose size='15' />
                            </button>
                        </div>
                        :
                        <button className='delete-product' onClick={() => setConfirmDelete(true)}>
                            <MdOutlineDeleteForever size='20' />
                        </button>
                    }
                </div>
            </div>
            <hr />
        </Fragment>
    )
}
