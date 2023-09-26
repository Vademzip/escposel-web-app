const jwt = require('jsonwebtoken')
const {Tokens} = require('../models/models')

class TokenService {
  generateTokens (payload){
    const accessToken =  jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{
      expiresIn: '1d'
    })

    const refreshToken =  jwt.sign(payload, process.env.JWT_REFRESH_SECRET,{
      expiresIn: '30d'
    })

    return {
      accessToken,
      refreshToken
    }

  }

  async saveToken(userId, refreshToken){
    const tokenData =  await Tokens.findOne({where : {userId}})
    if (tokenData){
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    return await Tokens.create({userId, refreshToken})
  }

  async removeToken(refreshToken){
    return await Tokens.destroy({where: {refreshToken}})
  }

   validateAccessToken (token){
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    }catch (e) {
      return null
    }
  }

  validateRefreshToken (token){
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    }catch (e) {
      return null
    }
  }

  async findToken (refreshToken) {
    return await Tokens.findOne({where : {refreshToken}})
  }

}

module.exports = new TokenService()