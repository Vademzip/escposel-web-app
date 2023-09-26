const {Player, OneGameInfo, Game, Team, Civilization, Tournament} = require('../models/models')
const ApiError = require('../exceptions/api-error')
const PlayerService = require('../service/player-service')

class PlayerController {

    async getAllPlayers(req, res, next) {
        try {
            const players = await PlayerService.getAllPlayers()
            return res.json(players)
        }catch (e) {
            next(e)
        }
    }

    async createPlayer(req, res, next) {
        try {
            const {nickname, games, wins} = req.body
            const newPlayer = PlayerService.createPlayer(nickname, games, wins)
            return res.json(newPlayer)
        } catch (e) {
            next(e)
        }
    }

    async editPlayer(req, res, next) {
        try {
            const {id} = req.body
            const {nickname, games, wins} = req.body
            await PlayerService.updatePlayer(id, nickname, games, wins)
            return res.json(1)
        } catch (e) {
            next(e)
        }
    }

    async deleteOnePlayer(req, res, next) {
        try {
            const {id} = req.body
            if (!id)
                throw ApiError.BadRequest('Отсутствует идентификатор')
            const deletedPlayer = PlayerService.deletePlayer(id)
            return res.json(deletedPlayer)
        } catch (e) {
            next(e)
        }
    }

    async getOnePlayerInfo(req, res, next) {
        try {
            const id = req.params.id
            let officialGameOnly = false
            if ('officialGameOnly' in req.query) {
                officialGameOnly = req.query['officialGameOnly'] === 'true'
            }
            const {player, gameHistory, civilizationArray} = await PlayerService.getOnePlayerInfo(id,officialGameOnly)
            return res.json({
                player,
                gameHistory,
                civilizationsTop: civilizationArray.slice(0, 3)
            })
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new PlayerController()