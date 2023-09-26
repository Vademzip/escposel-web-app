const {Team, TeamTournamentStats} = require("../models/models");
const ApiError = require("../exceptions/api-error");

class TeamService {
    async createTeam(name, games, wins) {
        const isTeamExisting = await Team.findOne({where: {name}})
        if (isTeamExisting) {
            throw ApiError.BadRequest('Команда с таким названием уже существует')
        }
        return await Team.create({name, games, wins, loses: games - wins})
    }

    async addGameToTeam(teamId, tournamentId, isWin) {
        const currentTeam = await TeamTournamentStats.findOne({
            where: {
                team_id: teamId,
                tournament_id: tournamentId
            }
        })
        if (!currentTeam)
            throw ApiError.BadRequest('Данной команды не существует!')
        currentTeam.games++
        if (isWin)
            currentTeam.wins++
        else
            currentTeam.loses++
        await currentTeam.save()
    }

    async changeGameAmount(teamId, tournamentId, isBigWay) {
        const currentTeam = await TeamTournamentStats.findOne({
            where: {
                team_id: teamId,
                tournament_id: tournamentId
            }
        })
        if (!currentTeam)
            throw ApiError.BadRequest('Данной команды не существует!')
        if (isBigWay) {
            currentTeam.games++
        } else {
            currentTeam.games--
        }
        await currentTeam.save()
    }

    async changeWinsAmount(teamId, tournamentId, isBigWay) {
        const currentTeam = await TeamTournamentStats.findOne({
            where: {
                team_id: teamId,
                tournament_id: tournamentId
            }
        })
        if (!currentTeam)
            throw ApiError.BadRequest('Данной команды не существует!')
        if (isBigWay) {
            currentTeam.wins++
        } else {
            currentTeam.wins--
        }
        await currentTeam.save()
    }

    async changeLossesAmount(teamId, tournamentId, isBigWay) {
        const currentTeam = await TeamTournamentStats.findOne({
            where: {
                team_id: teamId,
                tournament_id: tournamentId
            }
        })
        if (!currentTeam)
            throw ApiError.BadRequest('Данной команды не существует!')
        if (isBigWay) {
            currentTeam.loses++
        } else {
            currentTeam.loses--
        }
        await currentTeam.save()
    }

}

module.exports = new TeamService()