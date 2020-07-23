var express = require("express")
var app = express();
var cors = require('cors')
const mysql = require('mysql')
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
const jwt = require("express-jwt")
const jsonwebtoken = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const config = require("./config")
const port = 3001

app.use(cors({origin:true,credentials:true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser(config.cookieSecret))

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fronttechbase'
})

app.use(function(req,res, next){
    console.log(req.signedCookies)
    if(req.signedCookies.token==undefined){
        
    }else{
        
        let token = jsonwebtoken.verify(req.signedCookies.token, config.jwtSecret)
        if(token){
            res.cookie("token", jsonwebtoken.sign({user:token.user, admin: token.admin},config.jwtSecret,{ expiresIn: '5m' }),{
                maxAge: 1000 * 60 * 5, // would expire after 5 minutes
                httpOnly: true, // The cookie only accessible by the web server
                signed: true // Indicates if the cookie should be signed
            })
        }
    }

    next();
})

function protected(req,res,next){
    let token=false
    if(req.signedCookies.token)
        token = jsonwebtoken.verify(req.signedCookies.token, config.jwtSecret)
    if(token){
        req.token = token
        next()
    }else{
        res.send([{status:"Unauthorized"}])
    }
}

app.post('/getTopicData', function(req,res){ 
    console.log(req.body)

    connection.query(`SELECT * from topics WHERE topics.belongs_to='${req.body.name}'`, function (err, rows, fields) {
        if (err) throw err
        else {
            let dataToSend = []
            for (let i = 0; i < rows.length; i++) {
                dataToSend.push(rows[i])
            }
            res.send(JSON.stringify(dataToSend))
        }

    })
})

app.post("/register",function(req,res){
    //connection.connect()
    var username = req.body.username
    var password = req.body.password


//     bcrypt.hash(password, 10, function(err, hash) {
//         connection.query(`INSERT INTO users VALUES(null,'${username}','${hash}',0)`, function (err,result) {
//             if (err) throw err
//             res.send(result)
//         })
//     });

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt)
    console.log(username,salt,hash)

    //connection.end()
})

app.post("/login",function(req,res){ 
    if(!req.body.username && !req.body.password) {res.send(JSON.stringify({success:false}));return}
    connection.connect(function(err){
        connection.query(`SELECT * from users WHERE username='${req.body.username}'`, function (err, rows, fields) {
            if (err) throw err
            
            bcrypt.compare(req.body.password,rows[0].password,function(err,result){
                if(err){throw err}
                if(result){
                    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                    res.header( 'Access-Control-Allow-Credentials',true);
                    res.cookie("token", jsonwebtoken.sign({user:req.body.username, admin: rows[0].admin},config.jwtSecret,{ expiresIn: '5m' }),{
                        maxAge: 1000 * 60 * 5, // would expire after 5 minutes
                        httpOnly: true, // The cookie only accessible by the web server
                        signed: true // Indicates if the cookie should be signed
                    })
                    res.send(JSON.stringify({success:true}))
                    return
                }else{
                    res.send(JSON.stringify({success:false}))
                    return
                }
            })
        })
    })
})

app.post("/logout", function(req,res){
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header( 'Access-Control-Allow-Credentials',true);
    res.clearCookie("token")
    res.send({})
})


http.listen(port, function () {
  console.log(`listening on ${port}`);
});

