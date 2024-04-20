//functionn which will  generate acess and refresdh token

import jwt from 'jsonwebtoken'

const generateAccessToken = (data) => {

    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    return accessToken;
}

const generateRefreshToken = (data) => {
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
    return refreshToken;
}

export { generateAccessToken, generateRefreshToken };