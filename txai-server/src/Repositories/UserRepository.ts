import Users from "../Model/Users";

class UserRepository {
    async createUser(user: Users) {
        let findUser;
        /*caso seja passado um id a ação será identificada como uma atualização*/
        if (user.hasOwnProperty('id')) {
            findUser = await Users.query().where("id", user.id).first()
        } else {
            console.log("nada", findUser)
            findUser = await Users.query().where("mail", user.mail).first()
        }

        if (!findUser) {
            findUser = new Users()
        }

        findUser.name = user.name || findUser.name
        findUser.password = user.password || findUser.password
        findUser.mail = user.mail || findUser.mail
        if (typeof user.isMaster === "undefined") {
            findUser.isMaster = findUser.isMaster
        } else {
            findUser.isMaster = user.isMaster ? 1 : 0
        }
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

        let findUser = await Users.query().where("mail", UserMail).first()
        findUser.isMaster = findUser.isMaster === 1

        return findUser
    }

    async allUsers() {

        let findUser = await Users.query()

        return findUser
    }
}

export default UserRepository;