


var express = require('express');
var router = express.Router();
const path = require('path');
var fs = require('fs');

// Create an Express app
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname)));

/* GET home page. */
router.get('/', function (req, res) {
  fs.readdir("./uploads",{withFileTypes:true}, function (err, files) {
    // Synchronous read after synchronous res.render
    console.log(files);
    res.render("index",{files:files})
  });
});
app.use('/', router);

router.get("/file/:filename",function(req,res){
  fs.readdir("./uploads",{withFileTypes:true}, function (err, files) {
    // Synchronous read after synchronous res.render
    fs.readFile('./uploads/${req.param.filename}',"utf-8",function(err,data){
      res.render("opened",{files: files,filename:req.params.filename,filename,filedata:data});
    })
  });
  });
 
app.use('/file/:filename',router);

router.get('/filecreate', function (req, res) {
  fs.watchFile('uploads/${req.query.filename}', function (err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("back");
    }
  });
});
app.use('/filecreate', router);


router.post("/filechange/:filename",function(req,res){
    fs.writeFile('./uploads/${req.param.filename}',req.body.filedata,function(err){
            res.readdir("back");
    });
});
app.use('/filechange/:filename',router);

router.get('/foldercreate', function (req, res) {
  fs.mkdir(`uploads/${req.query.foldername}`, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect("back");
    }
  });
});
app.use('/foldercreate', router)


app.listen(3000);
module.exports = router;


