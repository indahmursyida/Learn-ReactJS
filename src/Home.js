import React, {useContext, useState, useEffect} from "react"
import axios from "axios"
import "./public/css/style.css"
import logo from "./public/img/logo.png"
import {DaftarBukuProvider} from "./DaftarBukuContext"
import DaftarBukuList from "./DaftarBukuList"

const Header = () =>{
    return(
        <>
        <header>
      <img id="logo" src={logo} alt="logo"/>
      <nav>
        <ul>
          <li><a href="index.html">Home </a> </li>
          <li><a href="about.html">About </a> </li>
          <li><a href="contact.html">Contact </a> </li>
        </ul>
      </nav>
    </header>
        </>
    )
}
const Footer = ()=>{
    return(
        <>
        <footer>
      <h5>copyright &copy; 2020 by Sanbercode</h5>
    </footer>
        </>
    )
}
const Body = ()=>{
    
    return(
        <>
        <DaftarBukuProvider>
        <DaftarBukuList/>
        </DaftarBukuProvider>
        </>
    )
}

const HomePage = ()=>{
    return(
        <>
        <Body/>
        <Footer/>
        </>
    )
}

export default HomePage

