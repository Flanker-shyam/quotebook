import React from "react";

function Navbar() {
    return <nav id="navbar" className="row">
        <div id="title" className="col-6">QuotesBook</div>
        <div id="links" className="col-6"><ul>
            <a href ="#"><li>Home</li></a>
           <a href="#"><li>About Us</li></a>
            <a href="#"><li>Contact</li></a>
        </ul></div>
    </nav>
}

export default Navbar;