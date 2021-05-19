import React, { useState } from "react"
import "./DaftarBuku.css"

const Login = () =>{
    const [state , setState] = useState({
        username : "",
        password : ""
    })
    const handleChange = (event) =>{
        let typeOfInput = event.target.name
    
        switch (typeOfInput){
          case "username":
          {
            setState({...state, username: event.target.value});
            break
          }
          case "password":
          {
            setState({...state, password: event.target.value});
            break
          }
        default:
          {break;}
        }
      }
    const handleSubmit= (e) => {
        e.preventDefault();
        if(state.password === "admin" && state.username === "admin") {
            alert("bener");
        } else {
            alert('Passwords or Username do not match');
        }
    }
  return(
    <>
      <form onSubmit={handleSubmit}>
      <label>
        Username
      </label>
      <input value={state.username} onChange={handleChange} type="text" />
      <label>
        Password
      </label>
      <input type="password" value={state.password} onChange={handleChange}/>
      <div>
        <button type="submit">Submit</button>
      </div>
      </form>
    </>
  )
}

export default Login