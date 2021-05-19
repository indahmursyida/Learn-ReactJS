import React from "react"
import {DaftarBukuProvider} from "./DaftarBukuContext"
import DaftarBukuList from "./DaftarBukuList"
import DaftarBukuForm from "./DaftarBukuForm"
import Search from "./Search"
import "../public/css/style.css"
import "./DaftarBuku.css"

const DaftarBuku = () =>{
  return(
    <>
      <DaftarBukuProvider>
        <Search/>
        <DaftarBukuList/>
        <DaftarBukuForm/>
      </DaftarBukuProvider>
      {/* <Login/> */}
    </>
  )
}

export default DaftarBuku