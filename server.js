var express = require("express")
var app = express();
var cors = require('cors')
const mysql = require('mysql')
var http = require('http').createServer(app);
var bodyParser = require('body-parser')
const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/getTopicData',function(req,res){
    console.log(req.body)
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fronttechbase'
    })

    connection.connect()

    connection.query('SELECT * from topics', function (err, rows, fields) {
        if (err) throw err

        //console.log('The solution is: ', rows[0])
        for(let i = 0;i<rows.length;i++){
            
            if(rows[i].belongs_to==req.body.name){
                res.send(JSON.stringify(rows[i]))
                
            }
        }
    })

    connection.end()
})


http.listen(port, function () {
  console.log(`listening on ${port}`);
});

