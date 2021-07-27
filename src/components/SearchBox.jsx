import React from 'react';
import { useState } from 'react';
import {IconContext} from "react-icons";
import {IoMdSearch  } from "react-icons/io"

export default function SearchBox() {
    const [query, setQuery] = useState("");

    return (
        <IconContext.Provider value={{className: "search-box__icon"}}>
            <div className="search-box">
                <IoMdSearch/>
                <input 
                className="search-box__input" 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for a country..."
                />
            </div>
        </IconContext.Provider>
    )
}
