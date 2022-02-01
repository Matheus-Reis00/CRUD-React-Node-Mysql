import Users from "../Model/Users";

class UserRepository {
    async createUser(user: Users) {
        let findUser;

        /*caso seja passado um id a ação será identificada como uma atualização*/
        if (user.hasOwnProperty('id')) {
            findUser = await Users.query().where("id", user.id).first()
        } else {
            findUser = await Users.query().where("mail", user.mail).first()
        }

        if (!findUser) {
            findUser = new Users()
        }

        findUser.name = user.name || findUser.name
        findUser.password = user.password || findUser.password
        findUser.mail = user.mail || findUser.mail
        await findUser.save()

        return findUser
    }

    async deleteUser(user: Users) {
        let finduser = await Users.query().where("id", user.id).first()

        if (finduser) {
            finduser.delete()
        }
    }

    async showUser(UserMail: string) {
        const findUser = await Users.query().where("mail", UserMail).first()

        return findUser
    }
}

export default UserRepository;