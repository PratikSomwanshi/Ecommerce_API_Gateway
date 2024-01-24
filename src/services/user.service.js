const jwt = require("jsonwebtoken");

const { UserRepository } = require("../repository");

const userRepository = new UserRepository();

async function createUser(data) {
    try {
        const response = await userRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function signIn(data) {
    try {
        const response = await userRepository.signIn(data);

        const token = jwt.sign(
            {
                email: response.email,
                id: response._id,
            },
            "shhhhh",
            {
                expiresIn: "1h",
            }
        );

        let res = {};
        res.email = response.email;
        res.token = token;

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function authorization(data) {
    try {
        const valid = jwt.verify(data.token, "shhhhh");

        if (!valid) throw new Error("token expired, please relogin");

        return valid;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    createUser,
    signIn,
    authorization,
};
