import React, {useContext, useState, useEffect} from "react"
import axios from "axios"
import {DaftarBukuContext} from "./DaftarBukuContext"

const DaftarBukuForm = () =>{
  const [daftarBuku, setDaftarBuku] = useContext(DaftarBukuContext)
  const [input, setInput] = useState({id: "",
    title: "", 
    description: "", 
    review: "",
    release_year: 2020,
    totalPage: 0,
    price: 0,
    image_url: "" })

  useEffect(()=>{
    if (daftarBuku.statusForm === "changeToEdit"){
      // cara 1 ambil data dari daftarBuku yg di inisialisasi di awal (bukan api baru)
      // let dataBuku = daftarBuku.lists.find(x=> x.id === daftarBuku.selectedId)
      // setInput({name: dataBuku.name, price: dataBuku.price, weight: dataBuku.weight})
      // setDaftarBuku({...daftarBuku, statusForm: "edit"})
      
      // cara 2 ambil data dari api baru                  
      axios.get(`http://backendexample.sanbercloud.com/api/books/${daftarBuku.selectedId}`)
      .then(res => {
        let dataBuku = res.data
        setInput({id: dataBuku.id,
          title: dataBuku.title, 
          description: dataBuku.description, 
          review: dataBuku.review,
          release_year: dataBuku.release_year,
          totalPage: dataBuku.totalPage,
          price: dataBuku.price,
          image_url: dataBuku.image_url })
        setDaftarBuku({...daftarBuku, statusForm: "edit"})
      })
      
    }
  },[daftarBuku, setDaftarBuku])

  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "title":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "description":
      {
        setInput({...input, description: event.target.value});
        break
      }
      case "review":
      {
        setInput({...input, review: event.target.value});
          break
      }
      case "release_year":
      {
        setInput({...input, release_year: event.target.value});
          break
      }
      case "totalPage":
      {
        setInput({...input, totalPage: event.target.value});
          break
      }
      case "price":
      {
        setInput({...input, price: event.target.value});
          break
      }
      case "image_url":
      {
        setInput({...input, image_url: event.target.value});
          break
      }
    default:
      {break;}
    }
  }
  
  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    let price = input.price.toString()
    

    if (daftarBuku.statusForm === "create"){        
      axios.post(`http://backendexample.sanbercloud.com/api/books`, {title: input.title, 
      description: input.description, 
      review: input.review,
      release_year: input.release_year,
      totalPage: input.totalPage,
      price: input.price,
      image_url: input.image_url})
      .then(res => {
          setDaftarBuku(
            {statusForm: "create", selectedId: 0,
            lists: [
              ...daftarBuku.lists, 
              { id: res.data.id, 
                title: input.title, 
                description: input.description, 
                review: input.review,
                release_year: input.release_year,
                totalPage: input.totalPage,
                price: input.price,
                image_url: input.image_url
              }]
            })
      })
    }else if(daftarBuku.statusForm === "edit"){
      axios.put(`http://backendexample.sanbercloud.com/api/books/${daftarBuku.selectedId}`, {name, price, weight: input.weight})
      .then(() => {
          let dataBuku = daftarBuku.lists.find(el=> el.id === daftarBuku.selectedId)
          dataBuku.title = input.title
          dataBuku.description = input.description
          dataBuku.review = input.review
          dataBuku.release_year = input.release_year
          dataBuku.totalPage = input.totalPage
          dataBuku.price = input.price
          dataBuku.image_url = input.image_url
          setDaftarBuku({statusForm: "create", selectedId: 0, lists: [...daftarBuku.lists]})
      })
    }

    setInput({id: "",
    title: "", 
    description: "", 
    review: "",
    release_year: 2020,
    totalPage: 0,
    price: 0,
    image_url: ""})

  }
  return(
    <>
      <h1>Form Daftar Harga Buku</h1>

      <div style={{width: "50%", margin: "0 auto", display: "block"}}>
        <div style={{border: "1px solid #aaa", padding: "20px"}}>
          <form onSubmit={handleSubmit}>
            <label style={{float: "left"}}>
              Title:
            </label>
            <input style={{float: "right"}} type="text" name="title" value={input.title} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Description:
            </label>
            <input style={{float: "right"}} type="text" name="description" value={input.description} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Review:
            </label>
            <input style={{float: "right"}} type="number" name="review" value={input.review} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Release Year:
            </label>
            <input style={{float: "right"}} type="number" name="release_year" value={input.release_year} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Total Page:
            </label>
            <input style={{float: "right"}} type="number" name="totalPage" value={input.totalPage} onChange={handleChange}/>
            <br/>
            <br/>
            <label style={{float: "left"}}>
              Price:
            </label>
            <input style={{float: "right"}} type="number" name="price" value={input.price} onChange={handleChange}/>
            <br/>
            <br/>
            <div style={{width: "100%", paddingBottom: "20px"}}>
              <button style={{ float: "right"}}>submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default DaftarBukuForm