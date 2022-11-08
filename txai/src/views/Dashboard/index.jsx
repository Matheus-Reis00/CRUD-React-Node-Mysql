import React, { useState, useEffect } from 'react';
import './styles.css'

import UserInforms from '../UserInforms'
import Products from '../Products';
import ModalCreateProduct from '../ModalCreateProduct';
import ModalUpdateProduct from '../ModalUpdateProducts';
import axios from 'axios';
import IsMaster from '../IsMaster';

export default function Dashboard() {

  const [userInformsView, setUserInformsView] = useState(false)
  const [productsView, setProductsView] = useState(false)
  const [isMasterView, setIsMasterView] = useState(false)

  const [createProduct, setCreateProduct] = useState(false)
  const [updateProduct, setUpdateProduct] = useState(false)

  const [logged, setLogged] = useState(false)
  const [userLogged, setUserLogged] = useState()

  const handleCreateProduct = () => {
    setCreateProduct(!createProduct)
  }

  const handleUpdateProduct = () => {
    setUpdateProduct(!updateProduct)
  }

  const handleSetView = (buttonIndice) => {
    switch (parseInt(buttonIndice)) {
      case 0:
        setUserInformsView(true)
        setProductsView(false)
        setIsMasterView(false)
        break;
      case 1:
        setUserInformsView(false)
        setProductsView(true)
        setIsMasterView(false)
        break;
      case 2:
        setUserInformsView(false)
        setProductsView(false)
        setIsMasterView(true)
        break;
      default:
        return null

    }
  }
  async function getUserLogged() {
    try {
      /*caso não encontre nada nessa busca ele cai no catch, pois vai dar erro*/
      const { data } = await axios.post(`${process.env.REACT_APP_URL_SERVER}/user/show`, { mail: localStorage.getItem('mail') })
      setUserLogged(data)
      setLogged(true)
    } catch (e) {
      setLogged(false)
    }
  }

  useEffect(async () => {
    getUserLogged()
  }, [])


  return (
    <>
      {logged ? //verifica se o usuário está logado
        <div className='container-dashboard'>

          {/*Modal de criar produto*/}
          {createProduct && <ModalCreateProduct closeButton={handleCreateProduct} />}
          {updateProduct && <ModalUpdateProduct closeButton={handleUpdateProduct} updateProduct={updateProduct} />}

          <header className='sideBar'>
            <h1>{userLogged?.name}</h1>
            <div className='sideBar-buttons'>
              <button className={`${!userLogged.isMaster ? "blocked" : ""} ${isMasterView ? "active" : ""} `} onClick={(e) => userLogged.isMaster && handleSetView(2)}>Admin</button>
              <button className={userInformsView ? 'active' : ''} onClick={(e) => handleSetView(0)}>Configurações</button>
              <button className={productsView ? 'active' : ''} onClick={(e) => handleSetView(1)}>Produtos</button>
            </div>
            <a href="https://www.figma.com/file/KpJmyOCzv6qkE4XEpDYfF3/Untitled?node-id=0%3A1" style={{ color: "white" }}>PROTÓTIPO</a>
          </header>
          <div className='dashboard-content'>
            {isMasterView && <IsMaster/>}
            {userInformsView && <UserInforms userLogged={userLogged} getUserLogged={getUserLogged} />}
            {productsView && <Products createProduct={createProduct} updateProduct={updateProduct} handleCreateProduct={handleCreateProduct} setUpdateProduct={setUpdateProduct} />}

          </div>
        </div>
        :
        null
      }
    </>
  )
}
