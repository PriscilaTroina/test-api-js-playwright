//Importando o getUser do arquivo user.js de factories para conseguir criar a massa
import { getUser } from '../../support/factories/user'
//Importanto test customizado 
import { test } from '../../support/fixtures'
import { expect } from '@playwright/test'


test.describe('POST /usuarios', () => {

    let userData

    test.beforeEach(() => {
        userData = getUser();
    })

    test('deve cadastrar usuário com sucesso', async ({ user }) => {

        const response = await user.createUser(userData)
        expect(response.status()).toBe(201)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Cadastro realizado com sucesso')
        expect(body).toHaveProperty('_id')
        const idUser = body._id

        //Deletando usuario pra limpar a base
        const responseDeleteUser = await user.deleteUser(idUser)
        expect(responseDeleteUser.status()).toBe(200)
    })

    test('não deve permitir cadastro de usuário com e-mail repetido', async ({ user }) => {

        const responsePreCondition = await user.createUser(userData)
        expect(responsePreCondition.status()).toBe(201)

        const bodyPreCondition = await responsePreCondition.json();
        const userId = bodyPreCondition._id;

        const response = await user.createUser(userData)
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Este email já está sendo usado')

        //Deletando usuario pra limpar a base
        const responseDeleteUser = await user.deleteUser(userId)
        expect(responseDeleteUser.status()).toBe(200)
    })

    test('não deve permitir cadastro de usuário com e-mail vazio', async ({ user }) => {

        const invalidUserData = { ...getUser(), email: '' }

        const response = await user.createUser(invalidUserData)
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('email', 'email não pode ficar em branco')

    })





})