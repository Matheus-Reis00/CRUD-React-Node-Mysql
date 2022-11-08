import axios from 'axios'

const apiUser = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/user`
})

const apiProduct = axios.create({
    baseURL: `${process.env.REACT_APP_URL_SERVER}/product`
})

export {apiUser, apiProduct}