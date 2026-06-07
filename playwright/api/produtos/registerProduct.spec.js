import { getUser, getLoginData } from '../../support/factories/user'
import { getProduct } from '../../support/factories/product'
//import { userService } from '../../support/services/user'
import { test } from '../../support/fixtures'
import { expect } from '@playwright/test'


test.describe('POST /produtos', () => {

    test('deve cadastrar um produto com sucesso', async ({ user, login, product }) => {

        const userData = getUser()

        const responseCreateUser = await user.createUser(userData)
        expect(responseCreateUser.status()).toBe(201)

        const bodyCreateUser = await responseCreateUser.json()
        const userId = bodyCreateUser._id


        const loginData = getLoginData(userData)

        const responseLogin = await login.login(loginData)
        expect(responseLogin.status()).toBe(200)

        const bodyLogin = await responseLogin.json()
        const token = bodyLogin.authorization

        const productData = getProduct()

        const responseCreateProduct = await product.createProduct(token, productData)
        expect(responseCreateProduct.status()).toBe(201)

        const bodyCreateProduct = await responseCreateProduct.json()
        expect(bodyCreateProduct).toHaveProperty('message', 'Cadastro realizado com sucesso')
    
        const idProduct = bodyCreateProduct._id


        //Deleta produto pra limpar a base
        const responseDeleteProduct = await product.deleteProduct(token, idProduct)
        expect(responseDeleteProduct.status()).toBe(200)

        //Deleta usuario pra limpar a base
        const responseDeleteUser = await user.deleteUser(userId)
        expect(responseDeleteUser.status()).toBe(200)
    
    })

    test('não deve cadastrar um produto já existente', async ({ user, login, product }) => {

        const userData = getUser()

        const responseCreateUser = await user.createUser(userData)
        expect(responseCreateUser.status()).toBe(201)

        const bodyCreateUser = await responseCreateUser.json()
        const userId = bodyCreateUser._id

        const loginData = getLoginData(userData)

        const responseLogin = await login.login(loginData)
        expect(responseLogin.status()).toBe(200)

        const bodyLogin = await responseLogin.json()
        const token = bodyLogin.authorization

        const productData = getProduct()

        const responseProductPreCondition = await product.createProduct(token, productData)
        expect(responseProductPreCondition.status()).toBe(201)

        const bodyProductPreCondition = await responseProductPreCondition.json()

        const idProduct = bodyProductPreCondition._id 

        const responseCreateProduct = await product.createProduct(token, productData)
        expect(responseCreateProduct.status()).toBe(400)

        const bodyCreateProduct = await responseCreateProduct.json()
        expect(bodyCreateProduct).toHaveProperty('message', 'Já existe produto com esse nome')


        //Deleta produto pra limpar a base
        const responseDeleteProduct = await product.deleteProduct(token, idProduct)
        expect(responseDeleteProduct.status()).toBe(200)

        //Deleta usuario pra limpar a base
        const responseDeleteUser = await user.deleteUser(userId)
        expect(responseDeleteUser.status()).toBe(200)
    })

})