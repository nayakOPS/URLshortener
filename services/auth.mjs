import jwt from jsonwebtoken

const secret_key = "secryyy@123"

function setUser(user){
    // returning the payload and the secret key for the stateless authen
    return jwt.sign({
        _id :user._id,
        email:user.email
    },secret_key)
}

function getUser(token){
    if(!token){
        return null
    }
    // verify the user token got from the token, verifying using our owen secretkey
    return jwt.verify(token, secret_key)
}

export { setUser, getUser };