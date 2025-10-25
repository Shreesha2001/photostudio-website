require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const userRouter =  require("../REST API/api/users/user.router");
const path = require('path'); 
var session =require('express-session');
var flush =require('connect-flash');


var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use("/api/users", userRouter);
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '/views')));
app.use(session({
    secret:'secret',

    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false
}));
app.use(flush());

app.set('view engine', 'ejs');
//app.use(express.static(__dirname + '/views'));
app.get('/',(req,res)=> {
    res.render("index.ejs")
})

app.get("/",(req,res)=> {
   

    res.json({
        success : 1,
        message : "Rest api is working "

    });
});

app.get("/booknow",(req,res)=>{

    res.render("booknow.ejs",{message:request.flash('message')});

})



var con = require('./connection');
const { request } = require("http");
//const express = require("express");
//const app = express();


app.post('/booknow',function(req,res){
var name = req.body.a1;
var phtgrp = req.body.a2;

var email = req.body.a3;
var ocasin= req.body.a5;
var phno = req.body.a4;

var bkdate  = req.body.a55;
var nodays = req.body.a44;
 
var loc = req.body.a7;



con.connect(function(error){
     if(error) throw error;
     var sql = "insert into booknow values('"+phtgrp+"','"+name+"','"+email+"','"+phno+"','"+loc+"','"+ocasin+"','"+bkdate+"','"+nodays+"')";
     con.query(sql,function(error,result){
     if(!error){
        request.flash('message','Booked Successfully');
        res.redirect('/')
     }
     else{ 
     res.send("You must register first ");
    //  res.send('Done'+result.insertId);
     }
     }); 
});
});

// app.listen(process.env.APP_PORT,() => {
//     console.log("Server is running",process.env.APP_PORT);
// });
// require("dotenv").config();
// var con = require('./connection');
// const express = require("express");
// const app = express();
// const cors = require('cors');
// const userRouter =  require("../REST API/api/users/user.router");
// const path = require('path'); 
// var session =require('express-session');
// var flash =require('connect-flash');


// var bodyParser = require('body-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:true }));
// app.use("/api/users", userRouter);
// app.use(cors())
// app.use(express.json())
// app.use(express.static(path.join(__dirname, '/views')));
// app.use(session({
//     secret:'secret',

//     cookie:{maxAge:60000},
//     resave:false,
//     saveUninitialized:false
// }));
// app.use(flash());

// app.set('view engine', 'ejs');
// //app.use(express.static(__dirname + '/views'));
// app.get('/',(req,res)=> {
//     res.render("index.ejs")
// })

// app.get("/",(req,res)=> {
   

//     res.json({
//         success : 1,
//         message : "Rest api is working "

//     });
// });

// app.get("/booknow",(req,res)=>{

//     res.render("booknow.ejs",{message:req.flash('message')});

// })




// app.post('/booknow',function(req,res){
//     var name = req.body.a1;
//     var phtgrp = req.body.a2;
//     var email = req.body.a3;
//     var ocasin= req.body.a5;
//     var phno = req.body.a4;
//     var bkdate  = req.body.a55;
//     var nodays = req.body.a44;
//     var loc = req.body.a7;

//     con.connect(function(error){
//          if(error) {
//             res.send("My Sql error");
//          }
//          else
//          {
//          var sql = "insert into booknow values('"+phtgrp+"','"+name+"','"+email+"','"+phno+"','"+loc+"','"+ocasin+"','"+bkdate+"','"+nodays+"')";
//          }
//          con.query(sql,function(error,result){
//             if(!error){
//                 req.flash('message','Booked Successfully');
//                 res.redirect('/');
//             }
//             else{ 
//                 res.send("You must register first ");
//             }
//          }); 
//     });

app.listen(process.env.APP_PORT,() => {
    console.log("Server is running",process.env.APP_PORT);
});
