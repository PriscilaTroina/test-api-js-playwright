

export const userService = (request) => {

    const createUser = async(user) => {
        return await request.post('/usuarios', {
            data: user
        })
    }

    const getUser = async() => {
        return await request.get('/usuarios')
    }

    const getUserID = async (id) => {
        return await request.get(`/usuarios/${id}`)
    }

    const deleteUser = async (id) => {
        return await request.delete(`/usuarios/${id}`)
    }

    return {
        createUser,
        getUser,
        getUserID,
        deleteUser
    }
}