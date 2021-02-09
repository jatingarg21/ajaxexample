const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


//Create connection with mysql

const db = mysql.createConnection({
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'employee'
});

//Connect with db

db.connect((err) => {
      if(err){
            throw err;
            console.log('Database Error', err);
      }
      else{
            console.log('Mysql connected...');
      }
})

const app = express();

//app.use(bodyParser.urlencoded({extended : true}));

app.use(bodyParser.json());


app.use(function(req,res,next){
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type, Accept");
      next();
  })
app.listen('4200', () => {
      console.log('Server started on port 4200');
})


app.get('/', (req, res) => {
        res.send('Employee server started');
})

app.get('/employees', function (req, res) {
    //console.log(req);
    db.query('select * from details', function (error, results, fields) {
       if (error)
       {
           console.log(error);
       }
       else
       {
           console.log('SQL Result', results);
           let obj ={
               status : 200,
               error : false,
               response : results
           };
           res.send(obj);
       }
     });
 });

 app.post('/employees', function (req, res) {
    let postData  = [req.body.name,req.body.department,req.body.emailid];
    //let postData =req.body;
    console.log(postData);
    db.query("INSERT INTO details (name,department,emailid) Values (?,?,?)", postData, function (error, results, fields) {
        if (error)
       {
           console.log(error);
       }
       else
       {
           res.send('Employee Inserted');
       }
     });
 });


