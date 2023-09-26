const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const uuid = require("uuid");
const path = require("path");
const {User} = require("../models/models");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Некорректные данные', errors.array()))
      }
      const {email, password, login, firstName} = req.body
      let img = null
      if (req.files && 'img' in req.files)
        img = req.files.img
      let fileName = null
      if (img){
        fileName = uuid.v4() + ".jpg"
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
      }


      // const {email, password} = req.body
      const userData = await userService.registration(email, password, login, firstName, fileName ? fileName : null)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async refreshToken(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async getUserImage (req, res, next) {
    try {
      const id = req.params.id
      const user = await User.findOne({where : {id}})
      if (!user) {
        return res.json('error') //TODO: исправить обработку ошибок
      }
      if (!user.img){
        return res.json(null)
      }else{
        return res.json(user.img)
      }
    } catch (e) {
      next(e)
    }
  }

}

module.exports = new UserController()