const uuid = require("uuid");
const path = require("path");
const {Civilization} = require("../models/models");
const {unlinkSync} = require("fs");


class CivilizationService {
    async addCivilization(name, icon, games = 0, wins = 0) {
        let fileName = uuid.v4() + ".jpg"
        icon.mv(path.resolve(__dirname, '..', 'static', fileName))
        return await Civilization.create({name, wins, loses: games - wins, games, icon: fileName})

    }

    async getAllCivilizations() {
        return await Civilization.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
    }

    async getAllCivilizationSortByWinRate() {
        const civilizationList = await Civilization.findAll({
            order: [
                ['wins', 'DESC'],
                ['games', 'ASC'],
                ['name', 'ASC']
            ],
        })
        const civilizationFullInfo = []

        for (let civilization of civilizationList) {
            if (civilization.wins === 0) {
                civilizationFullInfo.push({
                    id : civilization.id,
                    name : civilization.name,
                    icon : civilization.icon,
                    games : civilization.games,
                    wins : civilization.wins,
                    loses : civilization. loses,
                    winRate: 0
                })
            } else {
                civilizationFullInfo.push({
                    id : civilization.id,
                    name : civilization.name,
                    icon : civilization.icon,
                    games : civilization.games,
                    wins : civilization.wins,
                    loses : civilization. loses,
                    winRate: Math.round(civilization.wins / civilization.games * 100)
                })
            }
        }

        return civilizationFullInfo
    }

    async editCivilization(id, name, icon, games, wins) {
        const editingCivilization = await Civilization.findOne({where: {id}})
        let fileName = editingCivilization.icon;
        if (icon) {
            if (editingCivilization.icon) {
                const iconPath = path.resolve(__dirname, '..', 'static', editingCivilization.icon);
                unlinkSync(iconPath);
            }
            fileName = uuid.v4() + ".jpg"
            await icon.mv(path.resolve(__dirname, '..', 'static', fileName))
        }
        await editingCivilization.update({
            name,
            games,
            wins,
            loses: games - wins,
            icon: fileName
        })
    }

    async deleteOneCivilization(id) {
        const deletedCivilization = await Civilization.findOne({
            where: {
                id
            }
        })
        const iconPath = path.resolve(__dirname, '..', 'static', deletedCivilization.icon);
        unlinkSync(iconPath);
        return await deletedCivilization.destroy()
    }

}

module.exports = new CivilizationService()