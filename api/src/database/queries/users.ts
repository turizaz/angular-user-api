import knex from '../index'
const xss = require('xss')
import {IKnexResponse} from './IKnexResponse'

async function get(id, search): Promise<IKnexResponse> {
    if (search) {
        return await knex.raw(`select surname, name, email, id, 
        (select count(*) from users where email = :email ) as total
        from users where email = :email limit 10 offset ${id*10} 
        `, {email: search})
    }
    return await knex.raw(`select surname, name, email, id, (select count(*) from users) as total from users limit 10 offset ${id*10}`)
}
async function save(user: any): Promise<IKnexResponse> {
    return await knex('users').insert({
        name: xss(user.name),
        surname: xss(user.surname),
        email: xss(user.email)
    })
}
async function remove(id) {
    return await knex('users').where({id}).delete()
}

export {
    get,
    remove,
    save
}
