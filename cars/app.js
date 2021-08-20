const express = require('express')
const data = require('./data.json')
const app = express()

app.get('/', function (req, res) {
    try{
        res.send('Hello World!')
    }
    catch{
        res.send('Invalid Input')
    }
})

const fetch = (data_arr, name)=> {
    return new Promise(function(resolve, reject) {
        data_arr.forEach(element => {
            if(element.name === name) {
                resolve(element)
            }
        })
        reject('No data found')
    })
}

app.get('/search', function(req, res) {
    fetch(data, req.query.name)
    .then(value => {
        res.send(value)
    })
    .catch(err => {
        res.sendStatus(404)
    })
})

app.listen(8082)