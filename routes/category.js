var express = require('express');

var cors = require('cors')
var app = express();


var router = express.Router();
var mysql = require("mysql");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// create application/json parser
app.use(bodyParser.json());

app.use(cors());

router.get('/', function (req, res, next) {
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
      connection.query("select * from tbl_categories where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.render('category', { categoryDetails: results })
          // res.send(response);
          connection.end();

        }
        else {
          console.log("came in to data does not match");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match."
          }
          res.render('category', { categoryDetails: '' })
          // res.send(response);
        }
        // console.log(response);

      });

    }
  });
});
router.get('/updateCategory/:CategoryId', (req, res) => {

  // res.render('updateCategory',{ categoryDetails: '' });
  var connection = mysql.createConnection({
    // user: 'sa',
    // password: 'mypassword',
    user: 'cerapoda',
    password: '6Ov!rk(3s+TQ',
    host: '209.124.85.125',
    database: 'cerapoda_IMonster'
  });

  connection.connect(function (err) {
    if (err) console.log(err);
    else {
      if (req.params.CategoryId && req.params.CategoryId != 0) {
        console.log("came in select query");
        connection.query("select * from tbl_categories where DeletedDate is null and DeletedBy is null and CategoryId =" + req.params.CategoryId, function (error, results, fields) {
          console.log(error);
          if (results.length > 0) {
            // console.log(JSON.stringify(results));
            console.log("came in to data");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            // res.render('updateCategory', { editData: results[0] });
            res.render('updateCategory', { editData: results[0] });

            // res.send(response);
            connection.end();

          }
          else {
            console.log("came in to data does not match");
            response = {
              StatusCode: 500,
              Message: "Your email or password does not match."
            }
            res.render('updateCategory', { editData: [{ "CategoryId": req.params.CategoryId, "CategoryName": "" }] });
            // res.send(response);
          }

          // console.log(response);

        });

      }
      else {
        console.log("Came in to else tag");
        connection.query("", function (error, results, fields) {
          // let results = [];
          results = ([{ "CategoryId": req.params.CategoryId, "CategoryName": "" }]);
          console.log(results[0]);
          console.log("came in update article for add article");
          console.log(req.body);
          console.log(req.params);
          // res.redirect('http://localhost:3000/article/addArticleDetails/0');
          // res.send("article/addArticleDetails");
          res.render('updateCategory', { editData: results[0] });
        });
      }
    }
  });


});
router.post('/getCategoryDetails', async (req, res) => {
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
      connection.query("select * from tbl_categories where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          // res.send(response);
          connection.end();

        }
        else {
          console.log("came in to data does not match");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match."
          }
          // res.send(response);
        }
        // console.log(response);

      });

    }
  });
});

router.post('/addCategoryDetails/:CategoryId', async (req, res) => {
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
      console.log(req.body);
      console.log(req.params);
      // 

      console.log("came in select query");
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      let todayDate = year + "-" + month + "-" + date;
      connection.query("select CategoryId,CategoryName from tbl_categories where DeletedDate is null and DeletedBy is null and CategoryId  =  " + req.params.CategoryId, function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        console.log(results);
        console.log(req.body);
        console.log(JSON.stringify(req.query));
        if (req.params.CategoryId != 0) {
          if (results.length > 0) {
            connection.query("update tbl_categories set CategoryName = '" + req.body.CategoryName + "' , UpdatedDate = '" + todayDate + "'  where CategoryId = " + req.params.CategoryId)
            // console.log(JSON.stringify(results));
            console.log("came in to data");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            res.redirect('http://localhost:3000/category');
            // res.send(response);
          }

          connection.end();
        }
        else {
          connection.query("Insert into tbl_categories (CategoryName,IsActive, CreatedDate) Values (" + "'" + req.body.CategoryName + "' ," + 1 + ",'" + todayDate + "')")
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          // res.send(response);
          res.redirect('http://localhost:3000/category');
          // console.log(response);
        }
      });

    }
  });
});
router.post('/deleteCategoryDetails', async (rew, res) => {
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
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      let todayDate = year + "-" + month + "-" + date;
      connection.query("select CategoryId,CategoryName from tbl_categories where DeletedDate is null and DeletedBy is null and CategoryId =  " + req.body.CategoryId, function (error, results, fields) {
        if (error) {
          console.log(err);
        }
        else {
          if (results.length > 0) {
            connection.query("update tbl_categories set  DeletedDate='" + todayDate + "' where CategoryId= " + req.body.CategoryId)
            // console.log(JSON.stringify(results));
            console.log("came in to data");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            // res.send(response);
          }
          // console.log(response);
        }
        connection.end();

      });

    }
  });
});

router.post('/getCategoryDetailById', async (req, res) => {
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
      connection.query("select * from tbl_categories where DeletedDate is null and DeletedBy is null and CategoryId =" + req.body.CategoryId, function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          // res.send(response);
          connection.end();

        }
        else {
          console.log("came in to data does not match");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match."
          }
          // res.send(response);
        }
        // console.log(response);

      });

    }
  });
});

module.exports = router;