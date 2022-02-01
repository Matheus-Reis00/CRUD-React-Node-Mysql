import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import DefaultButton from '../../components/Default-button';
import Product from '../../components/Product';
import './styles.css'

export default function Products({ handleCreateProduct, setUpdateProduct, createProduct, updateProduct }) {

    const [allProducts, setAllProducts] = useState()

    const handleUpdateProduct = async (product) => {
        setUpdateProduct(product)
    }

    async function handleDeleteProduct (productInforms) {
        try {
            await axios.post('http://localhost:5000/product/delete', {
                productInforms
            })
        } catch (e) {

        }
    }

    function renderAllProducts() {
        return allProducts.map(product => {
            return (
                <Product
                    productName={product.name}
                    productValue={product.value}
                    ProductQuantity={product.quantity}
                    product={product}
                    handleDeleteProduct={handleDeleteProduct}
                    handleUpdateProduct={handleUpdateProduct}
                />
            )
        })
    }


    useEffect(async () => {
        const { data } = await axios.post('http://localhost:5000/product/show', {
            mail: localStorage.getItem('mail')
        })
        setAllProducts(data)

    }, [createProduct, updateProduct, handleDeleteProduct] /*sempre que houver qualquer açaõ de criar produtos ou atualizar, atualize a lista*/)

    return (
        <Fragment>
            <div className='container-products'>
                <header>
                    <div>Nome</div>
                    <div>Valor</div>
                    <div>Quantidade</div>
                </header>
                <div className='products'>
                    {allProducts && renderAllProducts()}
                </div>
            </div>
            <footer className='footer-products'>
                <DefaultButton contentButton='Cadastrar +' actionButton={handleCreateProduct} />
            </footer>
        </Fragment>
    )
}
