import React from "react"
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header"
import Section from "./Section"
import Footer from "./Footer"


const Main = () =>{
  return(
    <>
      <Router>
        <div style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/pattern.jpg)`, paddingBottom: '20px'}}>
          <Header/>
          <Section/>
          <Footer/>
        </div>     
      </Router>
    </>
  )
}

export default Main