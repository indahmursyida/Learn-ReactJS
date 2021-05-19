import React, {useContext, useEffect} from "react"
import axios from "axios"
import {DaftarBukuContext} from "./DaftarBukuContext"

const DaftarBukuList = () =>{

  const [daftarBuku, setDaftarBuku] = useContext(DaftarBukuContext)

  useEffect( () => {
    if (daftarBuku.lists === null){
      axios.get(`http://backendexample.sanbercloud.com/api/books`)
      .then(res => {
        setDaftarBuku({
          ...daftarBuku, 
          lists: res.data.map(el=>{ 
            return {id: el.id,
              title: el.title, 
              description: el.description, 
              review: el.review,
              release_year: el.release_year,
              totalPage: el.totalPage,
              price: el.price,
              image_url: el.image_url 
            }
          })
        })
      })
    }
  }, [setDaftarBuku, daftarBuku])

  const handleEdit = (event) =>{
    let idDataBuku = parseInt(event.target.value)
    setDaftarBuku({...daftarBuku, selectedId: idDataBuku, statusForm: "changeToEdit"})
  }

  const handleDelete = (event) => {
    let idDataBuku = parseInt(event.target.value)

    let newLists = daftarBuku.lists.filter(el => el.id !== idDataBuku)

    axios.delete(`http://backendexample.sanbercloud.com/api/books/${idDataBuku}`)
    .then(res => {
      console.log(res)
    })
          
    setDaftarBuku({...daftarBuku, lists: [...newLists]})
    
  }

  return(
    <>
      <h1>Daftar Harga Buku</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Review</th>
            <th>Release Year</th>
            <th>Total Page</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              daftarBuku.lists !== null && daftarBuku.lists.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.review}</td>
                    <td>{item.release_year}</td>
                    <td>{item.totalPage}</td>
                    <td>{item.price}</td>
                    
                    <td>
                      <button onClick={handleEdit} value={item.id}>Edit</button>
                      &nbsp;
                      <button onClick={handleDelete} value={item.id}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>      
    </>
  )
}

export default DaftarBukuList