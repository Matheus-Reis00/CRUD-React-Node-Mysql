import {Model as ModelObjetion} from 'objection'

const Knex = require('knex');

const knexClient = Knex({
    client: 'mysql2',
    connection:  {
        host : process.env.MYSQL_HOST,
        port : process.env.MYSQL_PORT,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE
    },
});

ModelObjetion.knex(knexClient);

abstract class Model extends ModelObjetion {                                                                                                                                                                                                                                                        
    id: number;
    updated_at: Date;
    created_at: Date;

    static idColumn = 'id';

    get exists(): boolean {
        return !!this.id;
    }

    static async find(id) {
        //@ts-ignore
        return await this.query().findById(id)
    }

    async save() {
        this.updated_at = new Date();
        this.created_at =  !this.created_at || !this.exists ? new Date() : this.created_at;

        if (!this.exists) {
            return await this.$query().insert();
        } else {
            return await this.$query().update();
        }
    }

    async delete() {
        if (this.id) {
            return await this.$query().delete();
        }

        return false;
    }
}

export default Model;
