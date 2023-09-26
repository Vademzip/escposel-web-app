const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, password, login, firstName, img) {
        const isEmailExist = await User.findOne({where: {email}})
        if (isEmailExist) {
            throw ApiError.BadRequest('Пользователь с данным адресом электронной почты уже существует!', 'duplicate_email')
        }
        const isLoginExist = await User.findOne({where: {login}})
        if (isLoginExist) {
            throw ApiError.BadRequest('Данный логин уже занят!', 'duplicate_login')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const newUser = await User.create({
            email,
            password: hashPassword,
            login,
            firstName,
            img: img ? img : null,
            activationLink
        })
        await mailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const userDto = new UserDto(newUser)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}})

        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }

        user.isActivated = true;
        await user.save()

    }

    async login(email, password) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw ApiError.BadRequest('Такого пользователя не существует')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Некорректный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        return await User.findAll()
    }
}

module.exports = new UserService()
