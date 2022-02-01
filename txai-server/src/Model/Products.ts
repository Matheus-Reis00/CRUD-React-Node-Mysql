import Model from "./Model";

class Product extends Model{
    static tableName = 'products'

    name: string
    value: string
    quantity: string
    id_user: string

    static get jsonSchema() {
        return { 
            type: 'object',
            required: ['name'],

            properties: {
                name: {type: 'string'},
                value: {type: 'string'},
                quantity: {type: 'string'},
                created_at: {type: 'string'},
                updated_at: {type: 'string'},
                id_user: {type: 'number'}
            }
        }
    }
}

export default Product