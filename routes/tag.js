var express = require('express');

var cors = require('cors')
var app = express();

var router = express.Router();
var mysql = require("mysql");
var ejs = require('ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// create application/json parser
app.use(bodyParser.json());

app.use(cors());

router.get('/', function (req, res, next) {
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
      connection.query("select * from tbl_tags where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.render('tag', { tagDetails: results })
          // res.send(response);

        }
        else {
          console.log("came in to data does not match");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match."
          }
          res.render('tag', { tagDetails: {} })
          // res.send(response);
        }
        // console.log(response);
        connection.end();

      });

    }
  });
});

router.get('/updateTag/:TagId', async function (req, res) {
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

  // console.log(req.body);
  // console.log(req.params);
  connection.connect(function (err) {
    if (err) console.log(err);
    else {
      if (req.params.TagId && req.params.TagId != 0) {
        console.log("came in select query with tag ID");
        connection.query("select * from tbl_tags where DeletedDate is null and DeletedBy is null and TagId =" + req.params.TagId, function (error, results, fields) {
          console.log(error);
          if (results.length > 0) {
            // console.log(JSON.stringify(results));
            console.log("came in to data");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            console.log(results);
            res.render('updateTag', { editData: results[0] });
            // res.send(response);
            connection.end();


          }
          else {
            console.log("Came in to else tag");
            connection.query("", function (error, results, fields) {
              // let results = [];
              results = ([{ "TagId": req.params.TagId, "TagName": "" }]);
              console.log(results[0]);
              console.log("came in update article for add article");
              console.log(req.body);
              console.log(req.params);
              // res.redirect('http://localhost:3000/article/addArticleDetails/0');
              // res.send("article/addArticleDetails");
              res.render('updateTag', { editData: results[0] });
            });
            // res.send(response);
          }

          // ,{ editData: {} }
          // ejs.renderFile('views/updateTag.ejs' , { editData: {} });
          // console.log(__dirname);
          // res.send("<div class='user-detail'><form  method='get'><label>Tag Name</label><input type='text' placeholder='Enter Full Name' name='tagName' required value=<%(typeof editData!='undefined')? editData.tagName:''%>><button type='submit'>Submit</button></form></div>");
          // res.sendFile("updateTag.ejs"  );
          //         // res.send(response);
          //       }
          //       // console.log(response);

        });
      }
      else {
        console.log("Came in to else tag");
        connection.query("", function (error, results, fields) {
          // let results = [];
          results = ([{ "TagId": req.params.TagId, "TagName": "" }]);
          console.log(results[0]);
          console.log("came in update article for add article");
          console.log(req.body);
          console.log(req.params);
          // res.redirect('http://localhost:3000/article/addArticleDetails/0');
          // res.send("article/addArticleDetails");
          res.render('updateTag', { editData: results[0] });
        });
      }

    }
    });

});
router.post('/getTagDetails', async (req, res) => {
  console.log("come in get function");
  var connection = mysql.createConnection({
    // user: 'sa',
    // password: 'mypassword',
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'skylms'
  });

  connection.connect(function (err) {
    if (err) console.log(err);
    else {
      console.log("came in select query");
      connection.query("select * from tbl_tags where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
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

router.post('/addTagDetails/:TagId', async (req, res) => {
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
      console.log("came in select query - addTagDetails");
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      let todayDate = year + "-" + month + "-" + date;
      connection.query("select TagId,TagName from tbl_tags where DeletedDate is null and DeletedBy is null and TagId  =  " + req.params.TagId, function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        console.log(req.params);
        console.log(req.body);
        console.log(results);

        if (req.params.TagId != 0) {
          connection.query("update tbl_tags set TagName = '" + req.body.TagName + "'  where TagId = " + req.params.TagId)
          // console.log(JSON.stringify(results));
          console.log("came in to update data - addTagDetails");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.redirect('http://localhost:3000/tag');
        }
        else {
          console.log("came in to add data - addTagDetails");

          connection.query("Insert into tbl_tags (TagName,IsActive, CreatedDate) Values (" + "'" + req.body.TagName + "' ," + 1 + ",'"+ todayDate + "')")
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.redirect('http://localhost:3000/tag');
          connection.end();
          // console.log(response);
        }
      });

    }
  });
});
router.post('/deleteProductDetails', async (rew, res) => {
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
      connection.query("select TagId,TagName from tbl_tags where DeletedDate is null and DeletedBy is null and TagId =  " + req.body.TagId, function (error, results, fields) {
        if (error) {
          console.log(err);
        }
        else {
          if (results.length > 0) {
            connection.query("update tbl_tags set  DeletedDate='" + todayDate + "' where TagId= " + req.body.TagId)
            // console.log(JSON.stringify(results));
            console.log("came in to data");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            // res.send(response);
          }
          connection.end();
          // console.log(response);
        }
      });

    }
  });
});

router.post('/getProductDetailsById', async (req, res) => {
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
      connection.query("select * from tbl_tags where DeletedDate is null and DeletedBy is null and TagId =" + req.body.TagId, function (error, results, fields) {
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
        }
        else {
          console.log("came in to data does not match");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match."
          }
          // res.send(response);
        }
        connection.end();
        // console.log(response);

      });

    }
  });
});

module.exports = router;