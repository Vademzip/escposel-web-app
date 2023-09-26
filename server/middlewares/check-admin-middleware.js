const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')
const {User} = require('../models/models')
module.exports = async function (req, res, next) {
    try {
        const userId = res.locals.id
        const currentUser = await User.findOne({where: {id: userId}})
        if (currentUser.role === 'ADMIN')
            next()
        else
            return next(ApiError.UnauthorizedError())
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}