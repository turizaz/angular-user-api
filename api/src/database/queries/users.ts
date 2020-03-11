import knex from "../index";
const xss = require("xss")
import {IKnexResponse} from "./IKnexResponse";

export interface IUserInterface {
    name: string;
    surname: string;
    email: string;
}

const perPage = 10;

async function get(id, search): Promise<IKnexResponse<IUserInterface>> {
    if (search) {
        return await knex.raw(`select surname, name, email, id,
        (select count(*) from users where email = :email ) as total
        from users where email = :email limit ${perPage} offset :offset
        `, {email: search, offset: id * perPage});
    }
    return await knex.raw(`select surname, name, email, id, (select count(*) from users) as total
                    from users limit ${perPage} offset :offset`, {offset: id * perPage});
}
async function save(user: any): Promise<number> {
    return knex("users").insert({
        email: xss(user.email),
        name: xss(user.name),
        surname: xss(user.surname),
    });
}
async function remove(id): Promise<number> {
    return knex("users").where({id}).delete();
}

export {
    get,
    remove,
    save
}
