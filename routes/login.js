
var express = require('express');

var cors = require('cors')
var router = express.Router();
var mysql = require("mysql");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

app.use(cors());
// app.use('/api', router);
// router.use((req,res,next)=>{
//     console.log('middleware');
//     next();
//   });

router.post('/getLoginDetails', async (req, res) => {
  console.log("come in get function");
  var connection = mysql.createConnection({
    // user: 'sa',
    // password: 'mypassword',
    // user: 'root',
    // password: '',
    // host: 'localhost',
    // database: 'skylms'
    user: 'cerapoda',
    password: '6Ov!rk(3s+TQ',
    host: '209.124.85.125',
    database: 'cerapoda_IMonster'
  });

  connection.connect(function (err) {
    if (err) console.log(err);
    else {
      console.log("came in select query");
      console.log(JSON.stringify(req.body));
      console.log(JSON.stringify(req.params));
      console.log(JSON.stringify(req.query));
      console.log(JSON.stringify(req.email));
      connection.query("select * from tbl_users where Email='" + req.body.email + "' and Password= '" + req.body.password + "'", function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.send(response);
        }
        else {
          console.log("came in to data does not match");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match."
          }
          res.send(response);
        }
        connection.end();
        // console.log(response);

      });

    }
  });
});

router.route('/registerUser').post((req, res) => {
  console.log("Came in register")
  var response = {};
  var connection = mysql.createConnection({
    // user: 'root',
    // password: '',
    // host: 'localhost',
    // database: 'skylms'
    user: 'cerapoda',
    password: '6Ov!rk(3s+TQ',
    host: '209.124.85.125',
    database: 'cerapoda_IMonster'

  });
  connection.connect(function (err) {
    if (err)
      console.log(err);
    else {
      console.log("came in register select ");
      connection.query("select * from tbl_users where Email='" + req.body.email + "'", function (error, results, fields) {
        // console.log(results);
        if (results && results.length > 0) {

          response = {
            StatusCode: 200,
            Message: "Your record is already exist. please login to continue."
          }
          // connection.end();
          res.send(response);
        }
        else {
          // console.log(JSON.stringify(req.body));
          console.log("came in register insert");
          connection.query("Insert into tbl_users (UserName,Email,Password,RoleId) values('" + req.body.userName + "','" + req.body.email + "','" + req.body.password + "'," + 1 + ")", function (error, results, fields) {
            console.log(error);
            if (results) {
              response = {
                StatusCode: 200,
                Message: "Success",
                Responce: results
              }
              // connection.end();
              res.send(response);

            }
          });
        }
        console.log(response);
        // return response;
        connection.end();
      })
    }
  });

});
module.exports = router;