var express = require('express');

var cors = require('cors')
var app = express();

var router = express.Router();
var mysql = require("mysql");
const multer = require('multer');
var storage =   multer.diskStorage({  
  destination: function (req, file, callback) {  
    callback(null, './public/images/articles/');  
  },  
  filename: function (req, file, callback) {  
    callback(null, file.originalname);  
  }  
});  
var upload = multer({ storage : storage}).single('file');  
console.log(upload);
// const upload = multer({ dest: './public/images/articles/' }).single('file');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// create application/json parser
app.use(bodyParser.json());

app.use(cors());
router.get('/', function (req, res, next) {
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
      console.log("came in select query");
      connection.query("select * from tbl_articles where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.render('article', { articleDetails: results })
          // res.send(response);
        }
        else {
          console.log("came in to data does not match - home");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match."
          }
          res.render('article', { articleDetails: '' })
          // res.send(response);

        }
        connection.end();
        // console.log(response);

      });

    }
  });
});
router.get('/updateArticle/:ArticleId', function (req, res, next) {
  var connection = mysql.createConnection({
    // user: 'sa',
    // password: 'mypassword',
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'skylms'
  });
  console.log("came in update article");
  connection.connect(function (err) {
    if (err) console.log(err);
    else {
      console.log(req.params.ArticleId);
      // console.log(req);
      if (req.params.ArticleId && req.params.ArticleId != 0) {
        console.log("came in select query");
        connection.query("select * from tbl_articles where DeletedDate is null and DeletedBy is null and ArticleId  =" + req.params.ArticleId, function (error, results, fields) {
          console.log(error);
          if (results.length > 0) {
            console.log(JSON.stringify(results));
            console.log("came in to data");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            console.log(results);
            console.log(req.body);
            res.render('updateArticle', { editData: results[0] });
            // console.log(editData);
            // res.send(response);
          }
          else {
           
           
            console.log("came in to data does not match - updateArticle");
            response = {
              StatusCode: 500,
              Message: "Your email or password does not match."
            }
            res.render('updateArticle', { editData:  { ArticleId: req.params.ArticleId, ArticleName : '',Description : '',Image: null}});
           
          }

          connection.end();
          // console.log(response);

        });

      }
      else {
        // console.log("came in update article for add article");
        connection.query("" ,function (error, results, fields){
        // let results = [];
        results = ([{"ArticleId": req.params.ArticleId , "ArticleName" : "","Description" : "","Image": null}]);
        console.log(results[0]);
        console.log("came in update article for add article");
        console.log(req.body);
        console.log(req.params);
        // res.redirect('http://localhost:3000/article/addArticleDetails/0');
        // res.send("article/addArticleDetails");
        res.render('updateArticle', { editData:  results[0]} );
        });
        // connection.end();
       
      }
    }
  });

});
router.post('/getArticleDetails', (req, res) => {
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
      connection.query("select * from tbl_articles where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
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
          console.log("came in to data does not match - getArticleDetails");
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

router.post("/addArticleDetails/:ArticleId", function (req, res, next) {
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
      console.log("came in select query - addArticleDetails");
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();
      // console.log(req.body);
      // console.log(req.params)
      // prints date & time in YYYY-MM-DD format
      let todayDate = year + "-" + month + "-" + date;
      // console.log(req.file);
      console.log("come in upload file");
      upload(req, res, function (err) {
        console.log(req);
        console.log(res);

        if(err) {  
          return res.end("Error uploading file.");  
      }  
      // res.end("File is uploaded successfully!");  
        // if (req.file.filename) {
        //   console.log(req.file);
        //   console.log(req.file.filename);
        //   console.log(JSON.stringify(req.file.filename));
        //   res.send(null);
        //   if (req.params.ArticleId) {

        //   }
        //   else {

        //   }
        // }
      });
      console.log("came into insert data - " +req.params.ArticleId);
     
     
        connection.query("select ArticleId ,ArticleName,Description  from tbl_articles where DeletedDate is null and DeletedBy is null and ArticleId   =  " + req.params.ArticleId, function (error, results, fields) {
          if (error) {
            console.log(err);
            console.log("came in article error -addArticleDetails ")
          }
          if (req.params.ArticleId != 0) {
          // else {
            // console.log(results);
            console.log("update article - addArticleDetails");
            console.log(results.length);
            if (results.length > 0) {
              connection.query("update tbl_articles set ArticleName = '" + req.body.ArticleName + "', Description= '" + req.body.Description + "' , UpdatedDate= '"+ todayDate + "'  where ArticleId  = " + req.params.ArticleId)
              // console.log(JSON.stringify(results));
              console.log("came in to data -addArticleDetails");
              response = {
                StatusCode: 200,
                Message: "Success",
                Responce: results
              }
              // res.send(response);
              res.redirect('http://localhost:3000/article');
            }


            // console.log(response);
          // }
          connection.end();
      }
        
      else {
        console.log(req.body);
        console.log(req.params);
        console.log("came in insert query - addArticleDetails");
        connection.query("Insert into tbl_articles (ArticleName,IsActive, Description,CreatedDate) Values (" + "'" + req.body.ArticleName + "' ," + 1 + ",'" + req.body.Description + "','" + todayDate + "')")
        response = {
          StatusCode: 200,
          Message: "Success",
          Responce: results
        }
        // res.send(response);
        res.redirect('http://localhost:3000/article');
        // console.log(response);
        connection.end();
      }
    });

      
    }
  });
});
router.get('/deleteArticleDetails/:ArticleId', (req, res) => {
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
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      // console.log("Article Id -" + JSON.stringify(req.params));
      // console.log("Article Id -" + JSON.stringify(req.body));
      let todayDate = year + "-" + month + "-" + date;
      connection.query("select ArticleId,ArticleName from tbl_articles where DeletedDate is null and DeletedBy is null and ArticleId =  " + req.params.ArticleId, function (error, results, fields) {
        if (error) {
          console.log(err);
        }
        else {
          if (results.length > 0) {
            connection.query("update tbl_articles set  DeletedDate='" + todayDate + "' where ArticleId= " + req.params.ArticleId)
            // console.log(JSON.stringify(results));
            console.log("came in to data");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            // res.render('' , { articleDetails: '' });
            console.log("came in to redirect");

            res.redirect('http://localhost:3000/article');
            // res.send(response);
            // res.render("article" , { articleDetails: '' });
            // fetch("https://localhost:3000/article");
          }
          connection.end();
          // console.log(response);
        }
      });

    }
  });
});

router.post('/getArticleDetailById', (req, res) => {
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
      connection.query("select * from tbl_articles where DeletedDate is null and DeletedBy is null and ArticleId  =" + req.body.ArticleId, function (error, results, fields) {
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
          console.log("came in to data does not match -getArticleDetailById");
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