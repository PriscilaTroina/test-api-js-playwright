
export const loginService = (request) => {

    const login = async(user) => {
        return await request.post('/login', {
            data: user
        })
    }

    

    return {
        login
        
    }
}