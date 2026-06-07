

export const productService = (request) => {

    const createProduct = async (token, product) => {
        return await request.post(`/produtos/`, {
            headers: {
                Authorization: token
            },
            data: product
        })
    }

    const deleteProduct = async (token, id) => {
        return await request.delete(`/produtos/${id}`, {
            headers: {
                Authorization: token
            }
        })
    }


    return {
        createProduct,
        deleteProduct
    }
}


