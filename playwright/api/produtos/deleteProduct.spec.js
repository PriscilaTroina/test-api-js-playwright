import { getUser, getLoginData } from '../../support/factories/user'
import { getProduct } from '../../support/factories/product'
//import { userService } from '../../support/services/user'
import { test } from '../../support/fixtures'
import { expect } from '@playwright/test'


test.describe('DELETE /produtos/{_id}', () => {

    test('deve remover um produto', async ({ user, login, product }) => {

        const userData = getUser()

        const responseCreateUser = await user.createUser(userData)
        expect(responseCreateUser.status()).toBe(201)

        const bodyCreateUser = await responseCreateUser.json();
        const idUser = bodyCreateUser._id;

        const loginData = getLoginData(userData)

        const responseLogin = await login.login(loginData)
        expect(responseLogin.status()).toBe(200)

        const bodyLogin = await responseLogin.json()
        const token = bodyLogin.authorization

        const productData = getProduct()

        const responseCreateProduct = await product.createProduct(token, productData)
        expect(responseCreateProduct.status()).toBe(201)

        const bodyCreateProduct = await responseCreateProduct.json()
        const productId = bodyCreateProduct._id
        
        const responseDeleteProduct = await product.deleteProduct(token, productId)
        expect(responseDeleteProduct.status()).toBe(200)

        const bodyDeleteProduct = await responseDeleteProduct.json()
        expect(bodyDeleteProduct).toHaveProperty('message', 'Registro excluído com sucesso')

        const responseDeleteUser = await user.deleteUser(idUser)
        expect(responseDeleteUser.status()).toBe(200)
    })

    
})