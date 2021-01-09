const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class Controller {
    static register(req, res){
        console.log(req.body.email, req.body.password, "<<<<<<<");
        let newData = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newData)
        .then(data => {
            let showData = {
                id: data.id,
                email: data.email
            }
            res.status(201).json(showData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    }

    static login(req, res){
        let dataInputed = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: dataInputed.email
            }
        })
        .then(data => {
            if (!data) {
                res.status(401).json({message: `invalid email or password`})
            }

            let match = comparePassword(dataInputed.password, data.password)
            
            if (match) {
                const payload = {
                    id: data.id,
                    email: data.email
                }
                const access_token = generateToken(payload)
                return res.status(200).json({ 
                    access_token: access_token 
                })
            } else{
                res.status(401).json({message: `invalid email or password`})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = Controller