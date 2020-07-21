var express = require("express")
var app = express();
var cors = require('cors')
const mysql = require('mysql')
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
const bcrypt = require("bcrypt")
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fronttechbase'
})

app.post('/getTopicData',function(req,res){ 
    console.log(req.body)

    connection.connect(function(err){
        connection.query(`SELECT * from topics WHERE belongs_to = '${req.body.name}'`, function (err, rows, fields) {
            if (err) throw err
    
            //console.log('The solution is: ', rows[0])
            // for(let i = 0;i<rows.length;i++){
                
    
            //     console.log(rows[i],rows[i].belongs_to)
            //     if(rows[i].belongs_to==req.body.name){
            //         res.send(JSON.stringify(rows[i]))
                    
            //     }
            // }
    
            res.send(JSON.stringify(rows))
        })
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
    console.log("/login")
    connection.connect(function(err){
        connection.query(`SELECT * from users WHERE username='${req.body.username}'`, function (err, rows, fields) {
            if (err) throw err
            
            bcrypt.compare(req.body.password,rows[0].password,function(err,result){
                if(err){throw err}
                if(result){
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


http.listen(port, function () {
  console.log(`listening on ${port}`);
});

