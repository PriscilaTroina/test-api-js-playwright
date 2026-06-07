import { getUser, getLoginData } from '../../support/factories/user'
//import { userService } from '../../support/services/user'
import { test } from '../../support/fixtures'
import { expect } from '@playwright/test'


test.describe('POST /login', () => {
    

    test('deve logar com sucesso', async ({login, user}) => {

        const userData = getUser()

        const responsePreCondition = await user.createUser(userData)
        expect(responsePreCondition.status()).toBe(201)

        const bodyCreateUser = await responsePreCondition.json()
        const idUser = bodyCreateUser._id
    

        const loginData = getLoginData(userData)

        const response = await login.login(loginData)
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body).toHaveProperty('message', 'Login realizado com sucesso')
        expect(body.authorization).toBeTruthy()

        //Deleta usuário para limpar a base
        const responseDeleteUser = await user.deleteUser(idUser)
        expect(responseDeleteUser.status()).toBe(200)

    })  

    test('não deve logar com e-mail vazio', async ({login}) => {

        const loginData = {
            email: '',
            password: 'teste'
        }

        const response = await login.login(loginData)
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('email', 'email não pode ficar em branco')

    })

    test('não deve logar com senha vazia', async ({login}) => {

        const loginData = {
            email: 'priscila.troina@teste.com',
            password: ''
        }

        const response = await login.login(loginData)
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('password', 'password não pode ficar em branco')

    })
})