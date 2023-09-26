const {
    OneGameInfo,
    Game,
    Player,
    Team,
    Civilization,
    Tournament,
    Map
} = require('../models/models')
const ApiError = require('../exceptions/api-error')
const GameService = require('../service/game-service')

class GameController {
    async createGame(req, res, next) {
        try {
            const {date, isWin, teamId, players, tournamentId, mapId} = req.body
            if (!date || isWin === undefined || !teamId || !players || !tournamentId || !mapId)
                throw ApiError.BadRequest('Введены не все данные')
            if (players.length !== 4) {
                throw ApiError.BadRequest('Список игроков составлен не правильно')
            }
            const newGame = await GameService.createGame(date, isWin, teamId, players, tournamentId, mapId)
            return res.json(newGame)
        } catch (e) {
            next(e)
        }
    }

    async getGamesInfo(req, res, next) {
        try {
            let page = null
            let size = null
            let officialGameOnly = false
            if (req.query.page && req.query.size) {
                page = req.query.page
                size = req.query.size
            }

            if ('officialGameOnly' in req.query) {
                officialGameOnly = req.query['officialGameOnly'] === 'true'
            }

            const gameList = await GameService.getGamesInfo(officialGameOnly, size, page)

            return res.json({
                gameList
            })
        } catch (e) {
            next(e)
        }
    }

    async getFullGamesInfo(req, res, next) {
        try {
            let page = null
            let size = null
            let officialGameOnly = false
            if (req.query.page && req.query.size) {
                page = req.query.page
                size = req.query.size
            }
            if ('officialGameOnly' in req.query) {
                officialGameOnly = req.query['officialGameOnly'] === 'true'
            }
            const gameList = await GameService.getGamesInfo(officialGameOnly, size, page)
            const playersList = await GameService.getFullPlayerList()
            return res.json({
                gameList,
                playersList
            })
        } catch (e) {
            next(e)
        }
    }

    async getOneTournamentGames(req, res, next) {
        try {
            const id = req.params.id
            if (!id) {
                throw ApiError.BadRequest('Отсутствует ID турнира')
            }
            const gameList = await GameService.getOneTournamentGames(id)
            return res.json(gameList)
        } catch (e) {
            next(e)
        }
    }

    async getAllTeamGames(req, res) {
        try {
            const id = req.params.id
            if (!id) {
                throw ApiError.BadRequest('Отсутствует ID команды')
            }
            const {team, games} = GameService.getAllTeamGames(id)
            return res.json({
                team,
                games
            })
        } catch (e) {
            next(e)
        }

    }

    async getOneGame(req, res, next) {
        try {
            const id = req.params.id
            const game = await Game.findOne(
                {
                    where: {id},
                    include: [
                        {
                            model: Team,
                            attributes: ['name'],
                        },
                        {
                            model: Tournament,
                            attributes: ['name']
                        },
                        {
                            model: Map,
                            attributes: ['name']
                        }
                    ]
                }
            )
            if (!game)
                throw ApiError.BadRequest('Игра не найдена')

            const players = await OneGameInfo.findAll({
                where: {game_id: id},
                include: [
                    {
                        model: Player,
                        attributes: ['nickname']
                    },
                    {
                        model: Civilization,
                        attributes: ['name', 'icon']
                    }
                ]
            })

            return res.json({
                game,
                players
            })
        } catch (e) {
            next(e)
        }

    }


    async updateOneGame(req, res, next) {
        try {
            const {id, date, isWin, teamId, tournamentId, mapId} = req.body
            const updatedGame = await GameService.updateOneGame(id, date, isWin, teamId, tournamentId, mapId)
            return res.json(updatedGame)
        } catch (e) {
            next(e)
        }
    }

    async deleteOneGame(req, res, next) {
        try {
            const {id} = req.body;
            if (!id) {
                throw ApiError.BadRequest('Отсутствует идентификатор игры')
            }
            await GameService.deleteOneGame(id)
            return res.json('1')
        } catch (e) {
            next(e)
        }
    }

}


module.exports = new GameController()