var express = require('express');
var app = express();
var router = express.Router();
// var bodyParser = require('body-parser');
// var cors = require('cors');

// create application/x-www-form-urlencoded parser
// app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
// app.use(bodyParser.json());
// console.log("come in get function");
// app.use(cors());
// app.use('/api', router); 

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("come in get function");
  res.render('index.ejs', { title: 'Express1' });

});
module.exports = router;