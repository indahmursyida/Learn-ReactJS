import React, { useContext } from "react"
import "./public/css/style.css"
import logo from "./public/img/logo.png"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Layout} from "antd"
import HomePage from './Home'
import About from './About'
import DaftarBuku from './CRUD/DaftarBuku'
import Login from "./CRUD/Login"
const {Content} = Layout
const Routes = () =>{
 

  return (
    <Layout>
      <Router>
      <header>
      <img id="logo" src={logo} alt="logo"/>
      <nav>
        <ul>
        <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/CRUD/DaftarBuku">Daftar Buku</Link>
            </li>
            <li>
              <Link to="/CRUD/Login">Login</Link>
            </li>
        </ul>
      </nav>
    </header>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Content>
            <Switch>  
              <Route exact path="/Home">
                <HomePage />
              </Route>
              <Route exact path="/About">
                <About />
              </Route>
              <Route exact path="/CRUD/DaftarBuku">
                <DaftarBuku/>
              </Route>
              <Route exact path="/CRUD/Login">
                <Login/>
              </Route>
            </Switch>
          </Content>
      </Router>
    </Layout>
  )
}

export default Routes