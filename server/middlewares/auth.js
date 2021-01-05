const {User} = require('../models')
const {cekToken} = require('../helpers/jwt')

function authentication (req, res, next)  {
    try {
        let decoded = cekToken(req.headers.accesstoken)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then( data => {
            if (!data) {
                res.status(500).json({message: `please login first`})
            }
            else{
                next()
            }
        })
        .catch( err => {
            res.status(500).json({message: err.message})

        })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = {
    authentication
}
