var Note = require('../models/Note.js')
var Article = require('../models/Article.js')
var request = require("request")
var cheerio = require("cheerio")


module.exports = function(app, db){

    app.post('/scrape',function(req, res){
        console.log("in scrape")
        
        request("https://arstechnica.com/", function(error, response, html){
            var $ = cheerio.load(html)
            var elements = $("article header").nextAll()
            
            console.log("cheerio"+elements.length)
            
        })
    })

    app.get('/articles', function(req, res){

        Article.find({saved: false}, function(err, data){
            if(err){
                console.log(err)
            }
            else{
                res.json(data)
            }
        })
    })

    app.get('/saved', function(req, res){
        Article.find({saved: true}, function(err, data){
            if(err){
                console.log(err)
            }
            else{
                res.json(data)
            }
        })
    })

    app.post('/save/:id', function(req,res){
        Article.update({"_id":req.params.id}, {$set: {"saved": true}}, function(err, data){
            if(err){
                console.log(err)
            }
            else{
                res.redirect("/articles")
            }
        })
    })

    app.post('/delete/:id', function(req,res){
        Article.find({"_id":req.params.id}).remove(function(err, data){
            if(err){
                console.log(err)
            }
            else {
                res.redirect("/saved")
            }
            
        })
        
    })

}