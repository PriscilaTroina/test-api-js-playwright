import { faker } from '@faker-js/faker';

export const getUser = () => ({
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: "true"
})

export const getLoginData = (user) => {
    return {
        email: user.email,
        password: user.password
    }
}
