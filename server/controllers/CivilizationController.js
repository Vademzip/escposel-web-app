const {Civilization, Team} = require('../models/models')
const ApiError = require('../exceptions/api-error')
const CivilizationService = require('../service/civilization-service')

class CivilizationController {
    async addCivilization(req, res, next) {
        try {
            if (!req.files || !'icon' in req.files) {
                return  ApiError.BadRequest('Отсутствует иконка!')
            }

            const {name, wins, games} = req.body
            const {icon} = req.files

            const isCivilizationExisting = await Civilization.findOne({where: {name}})
            if (isCivilizationExisting) {
                throw ApiError.BadRequest('Эта цивилизация уже добавлена в БД')
            }
            const newCivilization = await CivilizationService.addCivilization(name, icon, games, wins)
            return res.json(newCivilization)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async getAllCivilizations(req, res, next) {
        try {
            const civilizationList = await CivilizationService.getAllCivilizations()
            return res.json(civilizationList)
        } catch (e) {
            next(e)
        }
    }

    async getAllCivilizationsSortByWinRate(req, res, next) {
        try {
            const civilizationList = await CivilizationService.getAllCivilizationSortByWinRate()
            return res.json(civilizationList)
        } catch (e) {
            next(e)
        }
    }

    async editCivilization(req, res, next) {
        try {
            const {id, name, wins, games} = req.body
            if (!id || !name || !wins || !games) {
                throw ApiError.BadRequest('Присутствует не вся необходимая информация')
            }
            let icon = null
            if (req.files) {
                icon = req.files.icon
            }
            await CivilizationService.editCivilization(id, name, icon, games, wins)
            return res.json(1)

        } catch (e) {
            next(e)
        }
    }
    async deleteOneCivilization(req, res, next) {
        const {id} = req.body
        if (id){
            const deletedCivilization = await CivilizationService.deleteOneCivilization(id)
            return res.json(deletedCivilization)
        }
        return res.json('0')
    }
}

module.exports = new CivilizationController()