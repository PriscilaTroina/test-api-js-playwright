import { getUser } from '../../support/factories/user'
//import { userService } from '../../support/services/user'
import { test } from '../../support/fixtures'
import { expect } from '@playwright/test'


test.describe('GET /usuarios', () => {

    test('deve buscar um usuário por ID', async ({user}) => {

        const newUser = getUser()

        const responsePreCondition = await user.createUser(newUser)
        expect(responsePreCondition.status()).toBe(201)

        const bodyPreCondition = await responsePreCondition.json()
        const idUser = bodyPreCondition._id
        
        const response = await user.getUserID(idUser)
        expect(response.status()).toBe(200)

        const body = await response.json()
        expect(body.nome).toBe(newUser.nome)
        expect(body.email).toBe(newUser.email)
        expect(body.password).toBe(newUser.password)

        //Deletando usuario para limpar a base
        const responseDeleteUser = await user.deleteUser(idUser)
        expect(responseDeleteUser.status()).toBe(200)
    })
    
    test('não deve retornar usuário ao passar um id inválido', async ({user}) => {

        const response = await user.getUserID('idInvalido')
        expect(response.status()).toBe(400)

        const body = await response.json()
        expect(body).toHaveProperty('id', 'id deve ter exatamente 16 caracteres alfanuméricos')
    })

})