const {Team, Player, TeamTournamentStats} = require('../models/models')
const TeamService = require('../service/team-service')

class TeamController {
    async createTeam(req, res, next) {
        try {
            const {name, games, wins} = req.body
            const newTeam = await TeamService.createTeam(name, games, wins)
            return res.json(newTeam)
        } catch (e) {
            next(e)
        }
    }


    async addGameToTeam(req, res, next) {
        try {
            const {teamId, tournamentId, isWin} = req.body
            await TeamService.addGameToTeam(teamId, tournamentId, isWin)
            return res.json('1')
        } catch (e) {
            next(e)
        }
    }

    async changeGamesAmount(req, res, next) {
        try {
            const {teamId, tournamentId, isBigWay} = req.body
            await TeamService.changeGameAmount(teamId, tournamentId, isBigWay)
            return res.json('1')
        } catch (e) {
            next(e)
        }
    }

    async changeWinsAmount(req, res, next) {
        try {
            const {teamId, tournamentId, isBigWay} = req.body
            await TeamService.changeWinsAmount(teamId, tournamentId, isBigWay)
            return res.json('1')
        } catch (e) {
            next(e)
        }
    }

    async changeLossesAmount(req, res, next) {
        try {
            const {teamId, tournamentId, isBigWay} = req.body
            await TeamService.changeLossesAmount(teamId, tournamentId, isBigWay)
            return res.json('1')
        } catch (e) {
            next(e)
        }
    }


    async getAllTeamInfo(req, res, next) {
        const teamList = await Team.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return res.json(teamList)
    }

    async editTeam(req, res, next) {
        const {id} = req.body
        const {name, games, wins} = req.body

        const editingTeam = await Team.findOne({where: {id}})
        await editingTeam.update({
            name, games, wins, loses: games - wins
        })
        return res.json(1)
    }

    async deleteOneTeam(req, res, next) {
        const {id} = req.body
        if (id) {
            const deletedTeam = await Team.destroy({
                where: {
                    id
                }
            })
            return res.json(deletedTeam)
        }
        return res.json('0')
    }

}

module.exports = new TeamController()