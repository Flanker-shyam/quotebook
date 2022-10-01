import React from "react";
import { useNavigate } from "react-router-dom";

function SignUpConfirm()
{

    const Navigate = useNavigate();
    const handleClick = ()=>
    {
        Navigate("/login");
    }
    return(
    <div id="signup-done">
        <h1 className = "confirmation-h1">
            SignUp successful
        </h1>
        <img className="interface-img" src="../images/affection.png"></img>
        <div>
        <p>Thankyou for the registration. Kindly Login to continue.</p>
        </div>
        <button className=" btn3 button-hover btn btn-success btn-sm" onClick={handleClick}>Go to Login</button>
    </div>
    )
}

export default SignUpConfirm;