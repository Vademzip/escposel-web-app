const {
    Game,
    Team,
    TeamTournamentStats,
    Player,
    Civilization,
    OneGameInfo,
    PlayerTournamentStats, Tournament, Map
} = require("../models/models");
const ApiError = require("../exceptions/api-error");
const {Op} = require("sequelize");

class GameService {
    async createGame(date, isWin, teamId, players, tournamentId, mapId) {
        const escapePoselTeam = await Team.findOne({where: {name: 'Escape Posel'}})
        const escapePoselId = escapePoselTeam.id
        if (escapePoselId === teamId) {
            throw new ApiError.BadRequest('Нельзя играть против самих себя!..')
        }
        const newGame = await Game.create({date, isWin, TeamId: teamId, TournamentId: tournamentId, MapId: mapId})
        if (tournamentId !== '2') {
            let enemyTeam = await TeamTournamentStats.findOne({where: {team_id: teamId, tournament_id: tournamentId}})
            if (!enemyTeam) {
                enemyTeam = await TeamTournamentStats.create({team_id: teamId, tournament_id: tournamentId})
            }
            let escapePoselTeam = await TeamTournamentStats.findOne({
                where: {
                    team_id: escapePoselId,
                    tournament_id: tournamentId
                }
            })
            if (!escapePoselTeam) {
                escapePoselTeam = await TeamTournamentStats.create({
                    team_id: escapePoselId,
                    tournament_id: tournamentId
                })
            }
            escapePoselTeam.games++
            enemyTeam.games++
            if (isWin) {
                escapePoselTeam.wins++
                enemyTeam.loses++
            } else {
                escapePoselTeam.loses++
                enemyTeam.wins++
            }
            await escapePoselTeam.save()
            await enemyTeam.save()
        }

        players.map(async (player) => {
            const currentPlayer = await Player.findOne({where: {id: player.playerId}})
            const currentCivilization = await Civilization.findOne({where: {id: player.civilizationId}})
            if (!currentPlayer || !currentCivilization) {
                throw ApiError.BadRequest('Данного игрока или цивилизации не существует')
            }
            await OneGameInfo.create({
                game_id: newGame.id,
                player_id: player.playerId,
                civilization_id: player.civilizationId
            })
            let currentPlayerInTournament = await PlayerTournamentStats.findOne({
                where: {
                    player_id: player.playerId,
                    tournament_id: tournamentId
                }
            })
            if (!currentPlayerInTournament) {
                currentPlayerInTournament = await PlayerTournamentStats.create({
                    player_id: player.playerId,
                    tournament_id: tournamentId
                })
            }
            currentPlayerInTournament.games++
            currentPlayer.games++
            currentCivilization.games++
            if (tournamentId !== '2')
                currentPlayer.tournamentGames++
            if (isWin) {
                if (tournamentId !== '2')
                    currentPlayer.tournamentWins++
                currentPlayer.wins++
                currentPlayerInTournament.wins++
                currentCivilization.wins++
            } else {
                if (tournamentId !== '2')
                    currentPlayer.tournamentLoses++
                currentPlayer.loses++
                currentPlayerInTournament.loses++
                currentCivilization.loses++
            }
            await currentPlayer.save()
            await currentPlayerInTournament.save()
            await currentCivilization.save()
        })

        const currentMap = await Map.findOne({where: {id: mapId}})
        currentMap.games++;
        if (isWin) {
            currentMap.wins++
        } else {
            currentMap.loses++
        }
        await currentMap.save()

        return newGame
    }

    async getGamesInfo(officialGameOnly = false, size = null, page = null) {
        const whereClause = officialGameOnly ? {TournamentId: {[Op.ne]: 2}} : {};
        return await Game.findAndCountAll({
            where: whereClause,
            order: [
                ['date', 'DESC']
            ],
            limit: size ? size : null,
            offset: page ? (page - 1) * size : null,
            include: [
                {
                    model: Team,
                    attributes: ['name'],
                },
                {
                    model: Tournament,
                    attributes: ['name', 'id']
                },
                {
                    model: Map,
                    attributes: ['name']
                }
            ],
        })

    }

    async getFullPlayerList() {
        return await OneGameInfo.findAll({
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
    }

    async getOneTournamentGames(id) {
        return await Game.findAll({
            order: [
                ['date', 'DESC']
            ],
            where: {TournamentId: id},
            include: {
                model: Team,
                attributes: ['name']
            }
        })
    }

    async getAllTeamGames(id) {
        const games = await Game.findAll({
            where: {TeamId: id},
            include: {
                model: Tournament,
                attributes: ['name']
            }
        })
        const team = await Team.findOne({where: {id}})
        return {
            games,
            team
        }
    }

    async updateOneGame(id, date, isWin, teamId, tournamentId, mapId) {
        const currentGame = await Game.findOne({where: {id}})
        if (!currentGame) {
            throw ApiError.BadRequest('Игра не найдена!')
        }

        //TODO : Доделать возможность редактировать участников игры

        return await currentGame.update({
            id,
            date,
            isWin,
            TeamId: teamId,
            TournamentId: tournamentId,
            MapId: mapId
        })
    }

    async deleteOneGame(id) {
        const currentGame = await Game.findOne({
            where: {
                id
            }
        });

        if (!currentGame)
            throw ApiError.BadRequest('Игра не найдена!')
        const isTournamentGame = currentGame.TournamentId !== 2
        const thisGamePlayers = await OneGameInfo.findAll({
            where: {
                game_id: id
            }
        });

        await Promise.all(thisGamePlayers.map(async (onePlayer) => {
            const currentPlayer = await Player.findOne({
                where: {
                    id: onePlayer.player_id
                }
            });
            const currentCivilization = await Civilization.findOne({
                where: {
                    id: onePlayer.civilization_id
                }
            });
            if (isTournamentGame)
                currentPlayer.tournamentGames--;
            currentPlayer.games--;
            currentCivilization.games--;
            if (currentGame.isWin) {
                if (isTournamentGame)
                    currentPlayer.tournamentWins--;
                currentPlayer.wins--;
                currentCivilization.wins--;
            } else {
                if (isTournamentGame)
                    currentPlayer.tournamentLoses--;
                currentPlayer.loses--;
                currentCivilization.loses--;
            }

            await currentPlayer.save();
            await currentCivilization.save();
            await onePlayer.destroy();
        }));

        const escapePoselTeam = await Team.findOne({where: {name: 'Escape Posel'}})
        const escapePoselId = escapePoselTeam.id
        const enemyTeam = await TeamTournamentStats.findOne({
            where: {
                team_id: currentGame.TeamId,
                tournament_id: currentGame.TournamentId
            }
        });
        const escapePoselTeamInTournament = await TeamTournamentStats.findOne({
            where: {
                team_id: escapePoselId,
                tournament_id: currentGame.TournamentId
            }
        });

        enemyTeam.games--;
        escapePoselTeamInTournament.games--;
        if (currentGame.isWin) {
            escapePoselTeamInTournament.wins--;
            enemyTeam.loses--;
        } else {
            enemyTeam.wins--;
            escapePoselTeamInTournament.loses--;
        }

        const currentMap = await Map.findOne({where: {id: currentGame.MapId}})
        currentMap.games--
        if (currentGame.isWin)
            currentMap.wins--;
        else
            currentMap.loses--
        await currentMap.save()

        await enemyTeam.save();
        await escapePoselTeamInTournament.save();
        await currentGame.destroy();
    }
}

module.exports = new GameService()