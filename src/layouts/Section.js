import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import About from "../pages/About"
import Home from "../pages/Home"
import Books from "../pages/Books"
import Login from "../pages/Login"
import {UserContext} from "../context/UserContext"


const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
    <section >
      <Switch>
        <Route exact path="/" user={user} component={Home}/>
        <Route exact path="/about" user={user} component={About}/>
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <PrivateRoute exact path="/books" user={user} component={Books}/>
      </Switch>
    </section>
  )
}

export default Section