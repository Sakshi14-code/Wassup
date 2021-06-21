let express = require("express");
let http = require("http");
let mongoose = require("mongoose");
let admin = require("firebase-admin");
let cors = require("cors");
let app = express();
let server = http.Server(app);

const dotenv = require('dotenv').config();

var serviceAccount = require("./service.json");

const { response } = require("express");

const { database } = require("firebase-admin");

const sockets = new Map();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

mongoose.connect(
  process.env.MONGO_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//User Schema
let User = mongoose.model("User", {
  name: { type: String },
  phone: { type: String, unique: true },
  firebaseId: { type: String, unique: true },
});

// let Messages = mongoose.model("Messages", {
//   message: {type: String},
//   sender: {type: String},
//   reciever: {type: String},
// })

const port = 8000;

//New standard for body parser, express's own parser 
app.use(express.json());
app.use(cors());

//function returned by express.json() which contains 3 values req, res and next
// app.use(function(req, res, next){
//   console.log("printing at middleware");
//   next();
// })

app.get("/", function (req, res) {
  res.send("Hello world");
});

app.get("/users/", function (req, res) {
  User.find().then(function(response){
    res.send(response);
  })
});

app.post("/users/", function (req, res) {
  console.log(req.body);

  //object destructuring
  let { name, phone } = req.body;

  //New user from info of req.body
  let user = User.create({ name, phone });

  //async state  
  user.then(function (out) {
    res.send(out);
  });
});

server.listen(port, function () {
  console.log(`Example app listening at http://localhost:${port}`);
});


io.use(function (socket, next) {
  if (socket.request.headers.authorization) {
    let authorization = socket.request.headers.authorization;
    let token = authorization.slice(7);
    admin
      .auth()
      .verifyIdToken(token)
      .then(function (user) {
        sockets.set(user.uid, socket);

        //first find whether we have a user id corresponding to the firebase id
        User.find({ firebaseId: user.uid }).then(function (output) {
          //if user is not there we create a new user
          if (output.length == 0) {
            admin
              .auth()
              .getUser(user.uid)
              .then((userRecord) => {
                User.create({
                  firebaseId: user.uid,
                  name: userRecord.displayName,
                  phone: user.firebase.identities.phone[0],
                });
              })
              .catch((error) => {
                console.log("Error fetching user data:", error);
              });
          } else {
            console.log(output);
          }
        });
        socket.user = user;
        next();
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    socket.close();
  }
});

io.on("connection", function (socket) {
  socket.on("message", function (payload) {
    payload.sender = socket.user.uid;

    if(payload.reciever && sockets.has(payload.reciever)){
      let rsoc = sockets.get(payload.reciever);
      console.log("found");
      rsoc.emit("message", payload);
    }

    console.log(payload);
  });
});
