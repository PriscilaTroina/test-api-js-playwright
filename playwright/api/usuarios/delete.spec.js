import { getUser } from '../../support/factories/user'
//import { userService } from '../../support/services/user'
import { test } from '../../support/fixtures'
import { expect } from '@playwright/test'


test.describe('DELETE /usuarios', () => {

    
    test('deve remover um usuário', async ({user}) => {

        const userData = getUser()

        const responsePreCondition = await user.createUser(userData)
        expect(responsePreCondition.status()).toBe(201)

        const bodyPreCondition = await responsePreCondition.json()
        const idUser = bodyPreCondition._id

        const response = await user.deleteUser(idUser)
        expect(response.status()).toBe(200)  
        
        const body = await response.json()
        expect(body).toHaveProperty('message', 'Registro excluído com sucesso')
    })

    
    test('não deve realizar remoção ao passar um id inválido', async ({user}) => {

        const response = await user.deleteUser('teste')
        expect(response.status()).toBe(200)
        
        const body = await response.json()
        expect(body).toHaveProperty('message', 'Nenhum registro excluído')
        expect(body).not.toHaveProperty('_id')
    })

})