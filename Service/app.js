const request = require('request')
const express = require('express')
const data = require('./data.json')

const app = express()

app.get('/', function(req, res){
    try{
        res.send('Hello World')
    }
    catch{
        res.send('Invalid Input')
    }
})

app.get('/search', function(req,res) {
    let url = ''
    if(data.some( result => { return result.name == req.query.name })){
        url = data.find( result => {
            return result.name == req.query.name
        }).description
    }
    if(url.length == 0){
        res.send('No data found')
    }
    else{
        request(url, (error, response, body)=>{
            if(!error && response.statusCode == 200) {
                res.send(JSON.parse(body).description)
            }
            else {
                res.send('error')
            }
        })
    }
})

app.listen(3000)