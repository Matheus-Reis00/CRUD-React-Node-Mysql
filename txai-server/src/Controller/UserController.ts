import { Request, Response } from "express";
import UserRepository from "../Repositories/UserRepository";
const express = require('express');
const router = express.Router();
const userRepository = new UserRepository();

class UserController {
    constructor() {

        router.post('/show', this.getUser)
        router.post('/showall', this.getAllUsers)
        router.post('/create', this.postUser)
        router.post('/delete', this.deleteUser)
    }
    async getUser(req: Request, res: Response) {
        try{
            const user = await userRepository.showUser(req.body.mail)
            if(!user){
                res.status(400).send('usuário não encontrado')
            }
            res.send(user)
        }catch(e){
            res.status(400).send('erro ao buscar')
        }
    }
    async getAllUsers(req: Request, res: Response) {
        try{
            const users = await userRepository.allUsers()
            if(!users){
                res.status(400).send('usuário não encontrado')
            }
            res.send(users)
        }catch(e){
            res.status(400).send('erro ao buscar')
        }
    }

    /*atualiza ou cria caso seja inexistente*/
    async postUser(req: Request, res: Response){
        try{
            const user = await userRepository.createUser(req.body)
            res.status(200).send(user)
        }catch(e){
            res.status(400).send('não foi possível criar o usuário')
        }
    }

    async deleteUser(req: Request, res: Response){
        try {
            console.log(req.body)
            const userDeleted = userRepository.deleteUser(req.body.userLogged)
            res.status(200).send(userDeleted)
        } catch (error) {
            res.status(400).send('não foi possível deletar o usuário')
        }
    }
}
new UserController();
export default router;