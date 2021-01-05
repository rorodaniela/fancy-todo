const errorHandler = (err, req, res, next) => {
    if (err) {
        let errMsg
        switch (err.name) {
            case 'SequelizeValidationError':
                errMsg = err.errors.map(err => {
                   return err.message
                })
                res.status(400).json(errMsg)
                break;
            case 'SequelizeUniqueConstraintError':
                errMsg = err.errors.map(err => {
                   return err.message
                })
                res.status(400).json(errMsg)
                break;
            default:
                res.status(500).json({ message: 'Internal Server Error'})
                break;
        }
    }
}

module.exports = errorHandler