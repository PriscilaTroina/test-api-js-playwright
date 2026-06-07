import { faker } from '@faker-js/faker';

export const getProduct = () => ({
    nome: faker.commerce.productName(),
    preco: 470,
    descricao: faker.commerce.productName(),
    quantidade: 381
})
