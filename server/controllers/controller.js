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
            res.status(200).json(showData)
        })
        .catch(err => {
            res.status(500).json({message: `internal server error`})
        })
    }

    static editToDo(req, res){
        res.send("success")
    }

    static deleteToDo(req, res){
        res.send("success")
    }
}

module.exports = Controller