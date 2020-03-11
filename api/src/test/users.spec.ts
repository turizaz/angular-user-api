const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
import server from '../server'
const sinon = require('sinon')
import * as usersModel from '../database/queries/users'
import {userMock, userCreateRequestMock} from './mocks/userMoks'
chai.use(chaiHttp)
describe('test db', function () {
    afterEach( () =>{sinon.restore()})

    it('get rows from db',  async () => {
        sinon.stub(usersModel, 'get').usingPromise(Promise).resolves({rows: [userMock, userMock]})
        const res = await chai.request(server).get('/users/page')
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.length, 2)
    })

    it('delete',  async () => {
        sinon.stub(usersModel, 'remove').usingPromise(Promise).resolves(1)
        const res = await chai.request(server).delete('/users/1')
        assert.equal(res.statusCode, 200)
    })

    it('create',  async () => {
        sinon.stub(usersModel, 'save').usingPromise(Promise).resolves(1)
        const res = await chai.request(server).post('/users/').send(userCreateRequestMock)
        assert.equal(res.statusCode, 201)
    })
})
