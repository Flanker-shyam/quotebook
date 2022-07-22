import React from "react";

function QuoteCard(props)
{
    return <div id="quote-card">
        <div id="image">
            <img src={props.image}></img>
        </div>
        <div id="image-description">
            <p>{props.description}</p>
        </div>
    </div>
}

export default QuoteCard;