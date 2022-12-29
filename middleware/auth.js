const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
            const userId = decodeToken.userId
            req.auth = {
                userId: userId
            }
        } else {
            res.status(500).json({
                message: 'No credentials send'
            })
        }
        next()
    } catch (error) {
        res.status(401).json({ error })
    }
}