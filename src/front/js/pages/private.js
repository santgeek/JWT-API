import React, { useState, useEffect, useContext, Component } from "react";
import { Link } from "react-router-dom";
import privateBackground from "../../img/privatesection.png"

export const Private = () => {

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <h1 className="mb-4">You are in a private section!</h1>
            <img src={privateBackground} className="mb-3 w-50" alt="background private image" />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};
