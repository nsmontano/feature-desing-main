import React from "react";
import IMGKodigo from "../Components/img/notfound.png";
import "./style/button.css";

function NotFound(){

    return(
        <div className="notfound">
            <div><img src={IMGKodigo} className="imgNotFound" alt="logo" />   
            <h1 className="letrasNF">Not Found</h1> </div>
        </div>
    )
}

export default NotFound;