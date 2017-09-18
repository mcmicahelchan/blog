var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/PuzzleBlog')
var logedUser = 'nobody';
var logedType = 'user';
var userSchema = new mongoose.Schema({
  user: {type:String,unique: true},
  phone: String,
  email: String,
  pass: String,
  type: String
});

var userModel = mongoose.model("user",userSchema);

var blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  body: String,
  date: {type:Date, default: Date.now},
  comment: Array,
  hidden: String
});

var blogModel = mongoose.model("blog",blogSchema);

// view engine setup
app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views ')));
app.use('/', index);
app.use('/users', users);





//server
app.post("/api/registpost",createUser);
function createUser(req,res){
  var select = req.body.select;
  var user = req.body.user;
  var email = req.body.email;
  var phone = req.body.phone;
  var pass = req.body.pass;
  console.log(select);
  var newuser = new userModel;
  newuser.user = user;
  newuser.email = email;
  newuser.phone = phone;
  newuser.pass = pass;
  newuser.type = select;

    newuser.save(function(err,saveduser){
      if(err)
      {
        console.log(err);
        res.sendStatus(400);
      }
        logedUser = user;
        logedType=select;
        res.json(saveduser);
    });

}
app.get("/api/check/:user",checkUser);
function checkUser(req,res){
    var user = req.params.user;
    userModel.findOne({user:user},function(err,findObj) {
        if (err) {
            res.send("0");
        }

        if (findObj) {
            res.send("1");
        }
        else
        {
            res.send("0");
        }
    });

}
app.post("/api/login",loginUser);
function loginUser(req,res) {
  var user = req.body.user;
  var pass = req.body.pass;

  userModel.findOne({user: user}, function (err, findObj) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (!findObj) {
      return res.status(404).send();
    }
    if (findObj.pass == pass) {
        logedUser=findObj.user;
        logedType=findObj.type;
        console.log('yes');
        res.json(findObj);

    }
    else {
      console.log('no');
      res.sendStatus(400);
      //res.sendStatus(500);
    }
  });
}

app.post("/api/blogpost",createBlog);
function createBlog(req,res){
   var title=req.body.title;
   var body=req.body.body;
   var newblog = new blogModel;
  newblog.author = logedUser;
  newblog.title = title;
  newblog.body = body;
    newblog.hidden = false;
  var arr = [];
  newblog.comment = arr;
  newblog.save(function(err,savedblog){
    if(err)
    {
      console.log(err);
      res.sendStatus(400);
    }

    res.json(savedblog);
  });

}

app.get("/api/blog",getAll);
function getAll(req,res)
{
    blogModel
        .find()
        .then(function(data){
                console.log(data);
                res.send(data);
            },function(err){
                console.log(err);
                res.sendStatus(400);}
        );
}

app.get("/api/logeduser",getLoged);
function getLoged(req,res)
{
    res.send(logedUser);
}
app.delete("/api/blog/:id",deletePost);
function deletePost(req,res)
{
    var blogid = req.params.id;
    console.log(blogid);
    blogModel.remove({_id : blogid}, function(error){
        if(error) {
            console.log(error);
            return res.sendStatus(400);
        } else {
            console.log('delete ok!');
            return res.sendStatus(200);
        }
    });

}

app.get("/api/blogedit/:id",editBlog);
function editBlog(req,res){
    var id = req.params.id;
    blogModel
        .findById({_id:id})
        .then(function(post){
            res.json(post);
        },function(){
            res.sendStatus(400);
        });
}

app.put("/api/comment/:id",delComment);
function delComment(req,res){
    var id = req.params.id;
    blogModel
        .update({_id:id},{
            comment:req.body
        })
        .then(function(){
            res.sendStatus(200);
        },function(){
            res.sendStatus(400);
        });
}

app.put("/api/blogedit/:id",putEditBlog);
function putEditBlog(req,res){
    var id = req.params.id;
    blogModel
        .update({_id:id},{
            title:req.body.title,
            body:req.body.body
        })
        .then(function(){
            res.sendStatus(200);
        },function(){
            res.sendStatus(400);
        });
}

app.get("/api/blogdetail/:id",blogDetail);
function blogDetail(req,res){
    var id = req.params.id;
    blogModel
        .findById({_id:id})
        .then(function(post){
            res.json(post);
        },function(){
            res.sendStatus(400);
        });

}

app.get("/api/commentc/:id/:neirong",fuck);
function fuck(req,res){
    var id = req.params.id;
    var neirong=req.params.neirong;
    console.log(neirong);
    blogModel
        .findById({_id:id})
        .then(function(post){
            var comment = post.comment;
            var newcomment = {"author":logedUser,"body":neirong,"hidden":"false"};
            comment.push(newcomment);
            console.log(comment);
            blogModel
                .update({_id:id},{
                    comment:comment
                })
                .then(function(){
                    res.sendStatus(200);
                },function(){
                    res.sendStatus(400);
                });
        },function(){
            res.sendStatus(400);
        });
    
}


app.get("/api/comment/:id",blogComment);
function blogComment(req,res){
    var id = req.params.id;
    blogModel
        .findById({_id:id})
        .then(function(post){
            res.json(post.comment);
        },function(){
            res.sendStatus(400);
        });

}

app.get("/api/type",getType);
function getType(req,res){
    res.send(logedType);
}

app.put("/api/blockpost/:id",blockPost);
function blockPost(req,res){
    var id = req.params.id;
    blogModel
        .update({_id:id},{
            hidden:"true"
        })
        .then(function(){
            res.sendStatus(200);
        },function(){
            res.sendStatus(400);
        });



}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});







// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
