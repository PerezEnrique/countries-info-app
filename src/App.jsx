import React from "react";
import Header from "./components/Header.jsx";
import "./assets/styles/style.scss";
import SearchBox from "./components/SearchBox.jsx";

export default function App(){
    return(
        <React.Fragment>
            <Header/>
            <SearchBox/>
        </React.Fragment>
    )
}