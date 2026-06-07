import { test as baseTest } from '@playwright/test'
import { userService } from '../../support/services/user'
import { loginService} from '../../support/services/login'
import { productService } from '../services/product'

const test = baseTest.extend({

    user: async ({request}, use) => {
        const user = userService(request)  
        await use(user)  
    },

    login: async ({request}, use) => { 
        const login = loginService(request)  
        await use(login)  
    },

    product: async ({request}, use) => {
        const product = productService(request)
        await use(product)
    }


})


export { test }