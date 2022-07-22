import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import QuoteCard from "./Quotecard";

function Quotes() {

    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [fetchedImages, setFetchedImages] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    var currStatus;
    useEffect(() => {
        currStatus = JSON.parse(localStorage.getItem("isLogin"));
    }, []);

    useEffect(() => {
        if (currStatus) {
            setIsLoggedIn(currStatus);
        }
        console.log(isLoggedIn);
    });

    const Navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:3001/quotes")
            .then(response => response.json())
            .then(body => { setFetchedImages(body); })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function hanldeImageChange(event) {
        setImage(event.target.files[0]);
    }

    function onQuoteSubmit(event) {

        if (isLoggedIn) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("description", description);
            const url = "http://localhost:3001/quotes";

            fetch(url, {
                method: "POST",
                header: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                },
                body: formData
            })
                .then(response => {
                    response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(err => {
                    console.log(err);
                })

            setDescription("");
            setImage("");
        }
        else {
            Navigate("/login");
        }
    }

    function toLoginPage() {
        localStorage.setItem("isLogin", JSON.stringify(false));
        Navigate("/login");
    }
    function toSignUpPage() {
        Navigate("/signup");
    }

    var logOut = <button onClick={toLoginPage} className=" btn3 button-hover btn btn-success btn-sm">Logout</button>
    var logIn = <button onClick={toLoginPage} className="btn1 btn btn-outline-success btn-lg">Login</button>
    var signUp = <button onClick={toSignUpPage} className=" btn2 button-hover btn btn-success btn-lg">Get Started</button>

    return <div id="main-body" className="row">
        <div id="content" className="row">
            <div id="user-input" className="col-4">
                <div id="quote-heading">
                    <h1>Let's collect your Quotations.</h1>
                    <p>and your creativity...</p>
                </div>
                <form onSubmit={onQuoteSubmit} id="quotes-form" encType="multipart/form-data">
                    <div id="quotes-img">
                        <label>Add your image</label>
                        <input className="upload-file" onChange={hanldeImageChange} type="file" accept=".jpg, .jpeg, .png, .webp" name="quote" ></input>
                    </div>
                    <div id="quote-description">
                        <label>A litle description will be awesome.</label>
                        <input onChange={handleDescriptionChange} type="text" name="quote-description" value={description} placeholder="Describe"></input>
                    </div>
                    <div id="quote-submit">
                        <button type="submit">Add to collection</button>
                    </div>
                </form>
            </div>
            <div id="interface" className="col-8">
                <img className="interface-img" src="../images/note.png"></img>
                {isLoggedIn ? "" : logIn}
                {isLoggedIn ? logOut : signUp}
                <div id="interface-content">
                    <p>Creative minds always have something in their minds, and when they present, they present their thoughts creatively.</p>
                    <p>Join the Humreaders and let us share our creativity together.</p>
                </div>
            </div>
            <div id="show-images" className="row">

                {fetchedImages.map((element) => {
                    return (
                        <div id="card" className="col-3">
                            <QuoteCard
                                key={element._id}
                                image={element.imageUrl}
                                description={element.description}
                            />
                        </div>
                    )
                })}

            </div>
        </div>
    </div>
}

export default Quotes;

// {isLoggedIn?"Logout":"Login"}

// {isLoggedIn?"" : }