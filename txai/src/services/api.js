import axios from 'axios'

const apiUser = axios.create({
    baseURL: 'http://localhost:5000/user'
})

const apiProduct = axios.create({
    baseURL: 'http://localhost:5000/product'
})

export {apiUser, apiProduct}