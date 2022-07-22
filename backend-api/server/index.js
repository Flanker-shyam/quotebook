const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const bcrypt = require('bcrypt');
var cors = require('cors');
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/usersDB", function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connection on 27017 is successfull");
    }
});

const usersSchema = ({
    username: String,
    password: String
});

const User = new mongoose.model("User", usersSchema);

const imageScheme = ({
    imageUrl: String,
    description: String
});

const Image = new mongoose.model("Image", imageScheme);

app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err);
        } else {
            const newUser = new User({
                username: req.body.username,
                password: hash
            });

            newUser.save(err => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ code: "100" });
                }
            });
        }
    });
})

app.post("/login", (req, res) => {

    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (!err) {
            if (foundUser) {
                bcrypt.compare(req.body.password, foundUser.password, function (err, result) {
                    if (!err) {
                        if (result === true) {
                            res.json({ message: "success" });
                            return;
                        } else {
                            res.json({ message: "failure" });
                            return;
                        }
                    } else {
                        console.log(err);
                    }
                });
            }
            else {
                res.json({ message: "failure" });
                return;
            }
        }
        else {
            console.log(err);
        }
    });

});

app.post("/quotes", function (req, res) {
    const uploadedFile = req.files.image;
    const description = req.body.description;

    const path = "/home/flanker/Desktop/webDevelopment/login-signup-react/login-frontend/public/files/" + uploadedFile.name;
    const pathToSave = "../files/"+ uploadedFile.name;
    uploadedFile.mv(path, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("uploaded success");
        }
    });

    const newImage = new Image({
        imageUrl: pathToSave,
        description: description
    })
    newImage.save(err => {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            return res.send({ status: "Success", path: path });
        }
    });
});

app.get("/quotes", function(req,res){
    Image.find({}, function(err, foundImages){
        if(err){
            console.log(err);
        }
        else{
            res.send(foundImages);
        }
    })
});

app.listen(3001, (err) => {
    if (err) {
        console.log(err);
    }

    else {
        console.log("connection established successfully");
    }
});
