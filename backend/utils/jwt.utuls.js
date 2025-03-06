// generate token function
const generateToken = (user) => {
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m'
    });
    // refresh token
    const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    return { accessToken, refreshToken };
}