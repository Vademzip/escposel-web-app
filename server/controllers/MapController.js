const {Map} = require('../models/models')
const uuid = require('uuid')
const path = require("path");
const ApiError = require("../exceptions/api-error");

class MapController {
    async getAllMaps(req, res, next) {
        try {
            return res.json(await Map.findAll({
                order: [
                    ['name', 'ASC']
                ]
            }))
        } catch (e) {
            next(e)
        }
    }

    async createMap(req, res, next) {
       try {
           const {name} = req.body
           let icon = null
           if (req.files)
               icon = req.files.icon
           let fileName = null
           const map = await Map.findOne({where : {name}})
           if (map) {
               throw ApiError.BadRequest('Данная карта уже существует')
           }
           if (icon){
               fileName = uuid.v4() + ".jpg"
               await icon.mv(path.resolve(__dirname, '..', 'static', fileName))
           }
           return res.json(await Map.create({name, icon: icon ? fileName : null}))
       }catch (e) {
           next(e)
       }
    }

    async updateMap(req, res) {
        const {id, name} = req.body
        const currentMap = await Map.findOne({where: {id}})
        let icon = null
        if (req.files)
            icon = req.files.icon
        let fileName = uuid.v4() + ".jpg"
        currentMap.name = name
        if (icon) {
            await icon.mv(path.resolve(__dirname, '..', 'static', fileName))
            currentMap.icon = fileName
        }
        await currentMap.save()
        return res.json('1')
    }
}

module.exports = new MapController()