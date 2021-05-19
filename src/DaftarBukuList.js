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



  return(
    <>
      
      
        <tbody>
        <section>
        <h1>Daftar Buku-Buku Pilihan</h1>
            {
              daftarBuku.lists !== null && daftarBuku.lists.map((item, index)=>{
                return(      
                  
                  
                    <div className="article">
                    <h2><strong>{item.title}</strong></h2>
                  <div className="container">
                  <img className="container_img" src={item.image_url}></img>
                  <div className="container_text">
                  <h3>Tahun Terbit: {item.release_year}</h3>
                  <h3>Harga: Rp. {item.price}</h3>
                  <h3>Jumlah Halaman: {item.totalPage}</h3>
                  </div>
                  </div>
                  <p><strong>Deskripsi:</strong> {item.description}</p>
                  <p><strong>Ulasan:</strong> {item.review}</p>
                    </div>
                  
                )
              })
            }
            </section>
        </tbody>     
    </>
  )
}

export default DaftarBukuList