const jwt = require('jsonwebtoken');

module.exports = async (payload) => {
    // Generate a JWT token
    const token = await jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );

    return token;
}
