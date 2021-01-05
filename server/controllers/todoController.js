const {Todo} = require('../models')
class Controller {
    static showToDo(req, res){
        Todo.findAll({
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: `internal server error`})
        })
    }

    static addToDo(req, res){
        let newData = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date
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
            console.log(err);
            res.status(500).json({message: `internal server error`})
        })
    }

    static getById(req, res){
        let id = +req.params.id
        Todo.findAll({
            where: {
                id: id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"]}
        })
        .then(data => {
            res.status(200).json(data[0])
        })
        .catch(err => {
            res.status(404).json({message: `error not found`})
        })
    }

    static editToDo(req, res){
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
            res.status(500).json({message: `internal server error`})
        })
    }

    static markToDo(req, res){
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
            res.status(500).json({message: `internal server error`})
        })
    }

    static deleteToDo(req, res){
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
            res.status(500).json({message: `internal server error`})
        })
    }
}

module.exports = Controller