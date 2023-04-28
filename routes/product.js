var express = require('express');

var cors = require('cors')
var app = express();

var router = express.Router();
var mysql = require("mysql");
var productDetails;

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/images/products/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('file');

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
      connection.query("select * from tbl_products where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data - product");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.render('product', { productDetails: results })
          // res.status(200).json(response);
          connection.end();
        }
        else {
          console.log("came in to data does not match - product");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match. - product"
          }
          res.render('product', { productDetails: '' })
          // res.status(500).json(response);

        }
        // console.log(response);

      });

    }
  });
});
router.get('/updateProduct/:ProductId', function (req, res, next) {
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
      if (req.params.ProductId && req.params.ProductId != 0) {
        console.log("came in select query - updateProduct");
        connection.query("select * from tbl_products where DeletedDate is null and DeletedBy is null and ProductId =" + req.params.ProductId, function (error, results, fields) {
          console.log(error);
          if (results.length > 0) {
            // console.log(JSON.stringify(results));
            console.log("came in to data - updateProduct");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            res.render('updateProduct', { editData: results[0] });
            // res.status(200).json(response);
          }
          else {
            connection.query("", function (error, results, fields) {
              // let results = [];
              results = ([{ "ProductId": req.params.ProductId, "ProductName": "", "Description": "", "Title": "", "CategoryId": null, "TagId": null, "Image": null }]);
              console.log(results[0]);
              console.log("came in update article for add article - updateProduct");
              console.log(req.body);
              console.log(req.params);
              // res.redirect('http://localhost:3000/article/addArticleDetails/0');
              // res.send("article/addArticleDetails");
              res.render('updateProduct', { editData: results[0] });
            });
          }

          connection.end();
          // console.log(response);

        });

      }
      else {
        connection.query("", function (error, results, fields) {
          // let results = [];
          results = ([{ "ProductId": req.params.ProductId, "ProductName": "", "Description": "", "Title": "", "CategoryId": null, "TagId": null, "Image": null }]);
          console.log(results[0]);
          console.log("came in update article for add article - updateProduct");
          console.log(req.body);
          console.log(req.params);
          // res.redirect('http://localhost:3000/article/addArticleDetails/0');
          // res.send("article/addArticleDetails");
          res.render('updateProduct', { editData: results[0] });
        });
        connection.end();
      }
    }
  });

});
router.post('/getProductDetails', (req, res) => {
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
      console.log("came in select query - updateProduct");
      connection.query("select * from tbl_products where DeletedDate is null and DeletedBy is null ", function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data - updateProduct");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          res.render('product', { productDetails: results });
          // res.send(response);
          // res.status(200).json(response);

        }
        else {
          console.log("came in to data does not match - updateProduct");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match. - updateProduct"
          }
          res.render('product', { productDetails: '' });
          // res.status(500).json(response);

        }
        connection.end();
        // console.log(response);

      });

    }
  });
});

router.post('/addProductDetails/:ProductId', (req, res) => {
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
      console.log("came in select query - addProductDetails");
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      let todayDate = year + "-" + month + "-" + date;
      upload(req, res, function (err) {
        // console.log(req);
        // console.log(res);

        if (err) {
          return res.end("Error uploading file. - addProductDetails");
        }
      });
      console.log(JSON.stringify(req.body) + " - addProductDetails");
      console.log(JSON.stringify(req.params) + " - addProductDetails");

      connection.query("select ProductId,ProductName from tbl_products where DeletedDate is null and DeletedBy is null and ProductId =  " + req.params.ProductId, function (error, results, fields) {
        if (error) {
          console.log(error  + "- addProductDetails");
          // console.log(results + "- addProductDetails");
        }
        else {
          if (results.length > 0) {
            connection.query("update tbl_products set ProductName = '" + req.body.ProductName + "' , Title = '" + req.body.Title + "' , Description = '" + req.body.Description + "' , CategoryId = " + req.body.CategoryId + ", TagId = " + req.body.TagId + ", Prices= '" + req.body.Prices + "', Images = '" + req.body.Images + "', UpdatedDate='" + todayDate + "' where ProductId= " + req.params.ProductId)
            // console.log(JSON.stringify(results));
            console.log("came in to data - addProductDetails");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            res.redirect('http://localhost:3000/product');
          }
          else {
            connection.query("Insert into tbl_products (ProductName,Title,Description,CategoryId,TagId,Prices, Images, CreatedDate) Values (" + "'" + req.body.ProductName + "' ," + "'" + req.body.Title + "' ," + "'" + req.body.Description + "' ," + req.body.CategoryId + "," + req.body.TagId + "," + req.body.Prices + ",'" + req.body.Images + "','" + todayDate + "')")
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            res.redirect('http://localhost:3000/product');
          }
          connection.end();
          // console.log(response);
        }
      });

    }
  });
});
router.get('/deleteProductDetails/:ProductId', (req, res) => {
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
      console.log("came in select query - deleteProductDetails");
      let ts = Date.now();

      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

      // prints date & time in YYYY-MM-DD format
      let todayDate = year + "-" + month + "-" + date;
      connection.query("select ProductId,ProductName from tbl_products where DeletedDate is null and DeletedBy is null and ProductId =  " + req.params.ProductId, function (error, results, fields) {
        if (error) {
          console.log(err);
        }
        else {
          if (results.length > 0) {
            connection.query("update tbl_products set  DeletedDate='" + todayDate + "' where ProductId= " + req.params.ProductId)
            // console.log(JSON.stringify(results));
            console.log("came in to data  - deleteProductDetails");
            response = {
              StatusCode: 200,
              Message: "Success",
              Responce: results
            }
            res.redirect('http://localhost:3000/product');
            // res.send(response);
          }
          connection.end();
          // console.log(response);
        }
      });

    }
  });
});

router.post('/getProductDetailsById', (req, res) => {
  console.log("come in get function - getProductDetailsById");
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
      console.log("came in select query - getProductDetailsById");
      connection.query("select * from tbl_products where DeletedDate is null and DeletedBy is null and ProductId =" + req.body.ProductId, function (error, results, fields) {
        console.log(error);
        if (results.length > 0) {
          // console.log(JSON.stringify(results));
          console.log("came in to data - getProductDetailsById");
          response = {
            StatusCode: 200,
            Message: "Success",
            Responce: results
          }
          // res.send(response);
        }
        else {
          console.log("came in to data does not match - getProductDetailsById");
          response = {
            StatusCode: 500,
            Message: "Your email or password does not match. - getProductDetailsById"
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