const {Todo} = require('../models')

class Controller {
    static showToDo(req, res, next){
        Todo.findAll({
            where: {
                userID: +req.user.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static addToDo(req, res, next){
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            userID: +req.user.id
        }
        Todo.create(newData)
        .then(data => {
            let showData = {
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            }
            res.status(201).json(showData)
        })
        .catch(err => {
            next(err)
        })
    }

    static getById(req, res, next){
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
            let showData = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            }
            res.status(200).json(showData)
        })
        .catch(err => {
            res.status(404).json({message: `error not found`})
        })
    }

    static editToDo(req, res, next){
        let condition  = {
            where: {
                id: +req.params.id
            }
        }
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(newData, condition)
        .then(data => {
            return Todo.findByPk(+req.params.id)
        })
        .then(data  => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static markToDo(req, res, next){
        let condition  = {
            where: {
                id: +req.params.id
            }
        }
        let newData = {
            status: req.body.status
        }
        Todo.update(newData, condition)
        .then(data => {
            return Todo.findByPk(+req.params.id)
        })
        .then(data  => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteToDo(req, res, next){
        let condition = {
            where: {
                id: +req.params.id
            }
        }
        Todo.destroy(condition)
        .then(data  => {
            res.status(200).json({message: `todo success to delete`})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller