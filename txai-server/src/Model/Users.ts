import Model from "./Model";

class User extends Model{
    static tableName = 'users'

    name: string
    password: string
    mail: string
    isMaster: boolean | number

    static get jsonSchema() {
        return { 
            type: 'object',
            required: ['name'],

            properties: {
                name: {type: 'string'},
                password: {type: 'string'},
                mail: {type: 'string'},
                created_at: {type: 'string'},
                updated_at: {type: 'string'},
                isMaster: {type: 'boolean'}
            }
        }
    }
}

export default User