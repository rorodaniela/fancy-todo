const axios = require('axios')

class Controller {
    static weather(req, res){
        let currentWeaterUrl = "http://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=c0ee0458a90327d928f95679fbcb1102"
        axios.get(currentWeaterUrl)
        .then( response => {
            // console.log(response.data);
            res.status(200).json(response.data)        
        })
        .catch( err => {
            res.status(500).json(err)  
        })
    }
}

module.exports = Controller