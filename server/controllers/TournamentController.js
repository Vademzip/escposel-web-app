const {Tournament, TeamTournamentStats, Team} = require('../models/models')
const ApiError = require('../exceptions/api-error')
const uuid = require("uuid")
const path = require("path")

class TournamentController {
    async createTournament(req, res, next) {
        const {name} = req.body
        let link = null
        if ('link' in req.body) {
            link = req.body.link
        }
        const isTournamentExisting = await Tournament.findOne({where: {name}})
        if (isTournamentExisting) {
            return res.status(400).send('Турнир уже существует')
            // throw ApiError.BadRequest('Этот игрок уже есть в базе Данных')
        }
        const newTournament = await Tournament.create({name, link: link ? link : null})
        return res.json(newTournament)
    }

    async getAllTournaments(req, res, next) {
        const tournaments = await Tournament.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        return res.json(tournaments)
    }

    async getOneTournamentInfo(req, res) {
        const id = req.params.id
        const tournament = await Tournament.findOne({
            where: {id}
        })
        if (!tournament) {
            return res.json('error') //TODO
        }
        const teams = await TeamTournamentStats.findAll({
                where: {tournament_id: id},
                include: [{
                    model: Team,
                    attributes: ['name', 'id']
                }],
                order: [
                    ['wins', 'DESC'],
                    ['games', 'ASC'],
                ]
            },
        )
        return res.json({
            tournament,
            teams
        })
    }

    async addTeamToTournament(req, res, next) {
        try {
            const {tournament_id, team_id, games, wins} = req.body
            const isTeamExist = await TeamTournamentStats.findOne({where: {team_id, tournament_id}})
            if (isTeamExist) {
                throw ApiError.BadRequest('Данная команда уже принимает участие в данном турнире!')
            }
            const newTeamInTournament = await TeamTournamentStats.create({
                tournament_id,
                team_id,
                games,
                wins,
                loses: games - wins
            })
            return res.json(newTeamInTournament)
        } catch (e) {
            next(e)
        }
    }

    async updateTournamentInfo(req, res, next) {
        try {
            const {id, name, link} = req.body
            const currentTournament = await Tournament.findOne({where: {id}})
            if (!currentTournament) {
                throw ApiError.BadRequest('Данного турнира не существует!')
            }
            await currentTournament.update({id, name, link})
            return res.json('1')
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new TournamentController()