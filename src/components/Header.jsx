import React from 'react';
import {IconContext} from "react-icons";
import {IoMoonOutline} from "react-icons/io5"

export default function Header() {
    return (
        <IconContext.Provider value={{className: "header__btn__icon"}}>
            <header className="header">
                <h1>Countries info</h1>
                <button className="header__btn"><IoMoonOutline/>Dark mode</button>
            </header>
        </IconContext.Provider>
    )
}
