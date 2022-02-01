import { Request, Response } from "express";
import ProductRepository from "../Repositories/ProductRepository";
import UserRepository from "../Repositories/UserRepository";
const express = require('express');
const router = express.Router();
const productRepository = new ProductRepository();
const userRepository = new UserRepository();

class productController {
    constructor() {
        /*url a callback*/
        router.post('/show', this.getAllProductsFromUser)
        router.post('/create', this.postProduct)
        router.post('/delete', this.deleteProduct)
    }
    async getAllProductsFromUser(req: Request, res: Response) {
        try {
            const loggedUser = await userRepository.showUser(req.body.mail)

            /*todos os produtos do usuário logado*/
            const allProducts = await productRepository.showUserProducts(loggedUser)
            if (!allProducts) {
                res.status(404).send('produtos não encontrados')
            }

            res.send(allProducts)
        } catch (e) {
            res.status(400).send('erro ao buscar')
        }
    }

    /*atualiza ou cria caso seja inexistente*/
    async postProduct(req: Request, res: Response) {
        try {
            const product = productRepository.createProduct(req.body)
            res.status(200).send(product)
        } catch (error) {
            res.status(400).send('não foi possível criar o produto')
        }
    }

    async deleteProduct(req: Request, res: Response){
        try {
            const productDeleted = productRepository.deleteProduct(req.body.productInforms)
            res.status(200).send(productDeleted)
        } catch (error) {
            res.status(400).send('não foi possível deletar o produto')
        }
    }
}
new productController();
export default router;