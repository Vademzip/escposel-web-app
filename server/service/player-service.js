const {Player, Game, Team, Tournament, Civilization, OneGameInfo} = require("../models/models");
const ApiError = require("../exceptions/api-error");

class PlayerService {

    async getAllPlayers() {
        return await Player.findAll({
            order: [
                ['nickname', 'ASC']
            ]
        })
    }

    async getOnePlayerInfo(id, officialGameOnly) {
        const civilizationStats = {};
        const whereClause = officialGameOnly
            ? [
                {
                    model: Game,
                    attributes: ['isWin', 'date'],
                    include: [
                        {
                            model: Team,
                            attributes: ['name']
                        },
                        {
                            model: Tournament,
                            attributes: ['id']
                        }
                    ]
                },
                {
                    model: Civilization,
                    attributes: ['name', 'icon']
                },
            ]
            : [
                {
                    model: Game,
                    attributes: ['isWin', 'date'],
                    include: [
                        {
                            model: Team,
                            attributes: ['name']
                        }
                    ]
                },
                {
                    model: Civilization,
                    attributes: ['name', 'icon']
                }
            ]

        const player = await Player.findOne({
            where: {id}
        })
        if (!player) {
            throw new ApiError.BadRequest('Данного игрока не существует')//TODO
        }
        let gameHistory = await OneGameInfo.findAll(
            {
                where: {player_id: id},
                include: whereClause
            }
        )

        if (officialGameOnly) {
            gameHistory = gameHistory.filter(game => game.Game.Tournament.id !== 2)
        }

        for (const game of gameHistory) {
            const civilizationName = game.Civilization.name;
            if (!civilizationStats[civilizationName]) {
                civilizationStats[civilizationName] = {
                    name: civilizationName,
                    icon: game.Civilization.icon,
                    games: 0,
                    wins: 0,
                };
            }

            civilizationStats[civilizationName].games++;
            if (game.Game.isWin)
                civilizationStats[civilizationName].wins++;
        }
        const civilizationArray = (Object.values(civilizationStats));

        for (const civilization of civilizationArray) {
            civilization.winsPercent = Math.round((civilization.wins / civilization.games) * 100)
        }

        civilizationArray.sort((a, b) => b.winsPercent - a.winsPercent);
        return {
            player,
            gameHistory,
            civilizationArray
        }
    }

    async createPlayer(nickname, games, wins, tournamentGames, tournamentWins) {
        const isPlayerExisting = await Player.findOne({where: {nickname}})
        if (isPlayerExisting) {
            throw ApiError.BadRequest('Этот игрок уже есть в базе Данных')
        }
        return await Player.create({
            nickname,
            games,
            wins,
            loses: games - wins,
            tournamentWins,
            tournamentloses: tournamentGames - tournamentWins
        })
    }

    async updatePlayer(id, nickname, games, wins) {
        const editingPlayer = await Player.findOne({where: {id}})
        if (!editingPlayer) {
            throw new ApiError.BadRequest('Данный игрок не найден!')
        }
        await editingPlayer.update({
            nickname, games, wins, loses: games - wins
        })
    }

    async deletePlayer(id) {
        return await Player.destroy({
            where: {
                id
            }
        })
    }

}

module.exports = new PlayerService()