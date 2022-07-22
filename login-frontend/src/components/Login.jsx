import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const Navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setUserData(prevValues => {
            return {
                ...prevValues,
                [name]: value
            }
        })
    };

    const formSubmission = (event) => {
        event.preventDefault();

        const formdata = new FormData();
        formdata.append("username", userData.username);
        formdata.append("password", userData.password);

        const url = "http://localhost:3001/login";
        fetch(url, {
            method: "POST",
            header: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",

            },
            body: formdata
        }).then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    localStorage.setItem("isLogin", JSON.stringify(true));
                    Navigate("/");
                }
                else {
                    Navigate("/login");
                }
            })

            .catch((err) => {
                console.log(err);
            });
        setUserData({
            username: "",
            password: ""
        });
    };

    function showPassword() {
        var ele = document.getElementById("myPassword");

        if (ele.type === "password") {
            ele.type = "text";
        } else {
            ele.type = "password";
        }
    }

    return <div id="frame" className="row">
        <div id="main-frame" className="col-4">
            <div id="form">
                <div id="header">
                    <h1>Login</h1>
                    <p>Doesn't have an account yet? <a href="/signup">Sign Up</a></p>
                </div>
                <form autoComplete="off">
                    <div id="username">
                        <label>Username</label>
                        <input onChange={handleChange} type="email" name="username" value={userData.username} placeholder="your@email.com" required="required"></input>
                    </div>
                    <div id="password">
                        <label>Password<span><a href="#">Forget Password?</a></span></label>
                        <input onChange={handleChange} type="password" name="password" value={userData.password} placeholder="enter your password" required="required" id="myPassword"></input>
                        <img onClick={showPassword} id="hidden-eye" src="../images/eye.png"></img>
                    </div>
                    <div id="remember">
                        <button id="remember-button" type="checkbox"></button><span>remember me</span>
                    </div>
                    <div id="submit">
                        <button onClick={formSubmission} id="submit-button" type="submit">Login</button>
                    </div>
                    <p>-------------------------------------------------or Login with-------------------------------------------------------</p>
                    <div id="social-login">
                        <a href="#"><button id="google" type=""><img src="../images/google.png"></img>Google</button></a>
                        <a href="#"><button id="facebook" type=""><img src="../images/facebook.png"></img>Facebook</button></a>
                    </div>
                </form>
            </div>
        </div>
        <div id="front-img" className="col-8">
            <img id="main-img" src="../images/programmer.png"></img>
        </div>
    </div>
}

export default Login;