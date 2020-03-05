import * as usersModel from '../database/queries/users';

export function validate({name, email, surname}) {
    if(name.match(/^[A-Z][a-z0-9_-]{3,19}/)
    && surname.match(/[a-zA-Z]/)
    && email.match(/^\S+@\S+\.\S+$/)) {
        return {name, email, surname}
    } else {
        throw new Error('Invalid data')
    }
}
export function save(user) {
    return usersModel.save(user)
}
export function get(id, search) {
    return usersModel.get(id, search)
}
export function remove(id) {
    return usersModel.remove(id)
}
