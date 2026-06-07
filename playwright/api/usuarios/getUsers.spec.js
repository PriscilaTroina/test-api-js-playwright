
import { test } from '../../support/fixtures'
import { expect } from '@playwright/test'


test.describe('GET /usuarios - listagem', () => {

    test('deve listar os usuários cadastrados', async ({user}) => {

        const response = await user.getUser()
        expect(response.status()).toBe(200)

        const body = await response.json()

        expect(body).toHaveProperty('usuarios')
        expect(body).toHaveProperty('quantidade')
    })
    
})