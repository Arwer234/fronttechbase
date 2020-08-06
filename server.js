var express = require("express")
var app = express();
var cors = require('cors')
const mysql = require('mysql')
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
const port = 3001

app.use(cors({origin:true,credentials:true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fronttechbase'
})

var sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,
    clearExpired: true,
    checkExpirationInterval: 1000*60*10,
    schema: {
        tableName: 'USERS_SESSIONS',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);


app.use(session({
    secret: "secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    name:"session",
    cookie:{
        maxAge:1000*60*20,
        secure:false
    }
}));

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header( 'Access-Control-Allow-Credentials',true);
    next()
})

app.post('/getTopicData',function(req,res){ 
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
    //alibaba
    //connection.end()
})

app.post("/login",function(req,res){ 
    console.log("/login")
    connection.connect(function(err){
        if(req.body.username){
            connection.query(`SELECT * from users WHERE username='${req.body.username}'`, function (err, rows, fields) {
                if (err) throw err
                
                bcrypt.compare(req.body.password,rows[0].password,function(err,result){
                    if(err){throw err}
                    if(result){
                        req.session.username=req.body.username
                        req.session.admin=rows[0].admin==1 ? true:false
                        res.send(JSON.stringify({status:"success"}))
                        return
                    }else{
                        res.send(JSON.stringify({status:"failed"}))
                        return
                    }
                })
            })
        }else{
            res.send(JSON.stringify({status:"failed"}))
        }
    })
})

app.post("/authorize",function(req,res){ 
    if(req.session.admin){
        res.send({authorized:true})
    }else{
        res.send({authorized:false})
    }
})

app.post("/addArticle", function(req,res){
    if(req.session.admin){
        let name = req.body.name
        let cat = req.body.cat
        let data = req.body.data
        connection.connect(function(err){
            connection.query(`INSERT INTO topics VALUES(null,'${name}','${cat}','${data}')`, function (err, rows, fields) {
                if (err) throw err
                res.send({status:success})
            })
        })
        
    }else{
        res.send({authorized:false})
    }
})

app.post("/getArticles",function(req,res){
    connection.query(`SELECT * from topics`, function (err, rows, fields) {
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


http.listen(port, function () {
  console.log(`listening on ${port}`);
});

