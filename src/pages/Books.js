import React, {useState, useEffect} from "react"
import axios from "axios"
import "./Books.css"

const Books = () => {
  
  const [books, setBooks] =  useState(null)
  const [input, setInput]  =  useState({
    title: "",
    description: "",
    review: "",
    release_year: 2020,
    totalPage: 0,
    price: 0,
    image_url: ""
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")

  useEffect( () => {
    if (books === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/books`)
      .then(res => {
          setBooks(res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            description: el.description,
            review: el.review,
            release_year: el.release_year,
            totalPage: el.totalPage,
            price: el.price,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [books])
  
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

    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://www.backendexample.sanbersy.com/api/books`, {
          title: input.title,
          description: input.description,
          review: input.review,
          release_year: parseInt(input.release_year),
          totalPage: parseInt(input.totalPage),
          price: parseInt(input.price),
          image_url: input.image_url
        })
        .then(res => {
            setBooks([...books, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://www.backendexample.sanbersy.com/api/books/${selectedId}`, {
          title: input.title,
          description: input.description,
          review: input.review,
          release_year: parseInt(input.release_year),
          totalPage: parseInt(input.totalPage),
          price: parseInt(input.price),
          image_url: input.image_url
        })
        .then(res => {
            let singleBook = books.find(el=> el.id === selectedId)
            singleBook.title = input.title
            singleBook.description = input.description
            singleBook.review = input.review
            singleBook.release_year = input.release_year
            singleBook.totalPage = input.totalPage
            singleBook.price = input.price
            singleBook.image_url = input.image_url
            setBooks([...books])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        title: "",
        description: "",
        review: "",
        release_year: 2020,
        totalPage: 0,
        price: 0,
        image_url: ""
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newBooks = books.filter(el => el.id !== itemId)
  
      axios.delete(`https://www.backendexample.sanbersy.com/api/books/${itemId}`)
      .then(res => {
        console.log(res)
      })

      if (selectedId === itemId){
        setInput({
          ...input,
          title: "",
          description: "",
          review: "",
          release_year: 2020,
          totalPage: 0,
          price: 0,
          image_url: ""
        })
      }
                  
      setBooks([...newBooks])
      
    }
    
    const handleEdit = () =>{
      let singleBook = books.find(x=> x.id === itemId)
      setInput({
        title: singleBook.title,
        description: singleBook.description,
        review: singleBook.review,
        release_year: singleBook.release_year,
        totalPage: singleBook.totalPage,
        price: singleBook.price,
        image_url: singleBook.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    )
  }

  function truncateString(str, num) {
    if (str === null){
      return ""
    }else{
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
  

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://www.backendexample.sanbersy.com/api/books`)
    .then(res => {
      let resBooks = res.data.map(el=>{ return {
          id: el.id, 
          title: el.title, 
          description: el.description,
          review: el.review,
          release_year: el.release_year,
          totalPage: el.totalPage,
          price: el.price,
          image_url: el.image_url
        }
      })

      let filteredBooks = resBooks.filter(x=> x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setBooks([...filteredBooks])
    })
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <>
      <div>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} />
          <button>search</button>
        </form>
      </div>

      <h1>Daftar Buku</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Review</th>
            <th>Release Year</th>
            <th>Total Page</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              books !== null && books.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.title}</td>
                    <td title={item.description}>{truncateString(item.description, 20)}</td>
                    <td>{item.review}</td>
                    <td>{item.release_year}</td>
                    <td>{item.totalPage}</td>
                    <td>{item.price}</td>
                    <td>
                      <Action itemId={item.id} />

                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Books Form</h1>
      <form style={{textAlign: "left"}} onSubmit={handleSubmit}>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Title:
          </label>
          <input style={{display: "inline-block", width: "60%"}} type="text" name="title" value={input.title} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Description:
          </label>
          <textarea style={{display: "inline-block"}} cols="50" rows="3" type="text" name="description" value={input.description} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{display: "inline-block", width: "150px"}}>
            Review:
          </label>
          <textarea style={{display: "inline-block"}} cols="50" rows="3" type="text" name="review" value={input.review} onChange={handleChange}/>
          <br/>
          <br/>
        </div>   
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Release Year:
          </label>
          <input style={{display: "inline-block"}} type="number" max={2020} min={1980}  name="release_year" value={input.release_year} onChange={handleChange}/>
          <br/>
          <br/>
        </div>

        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Total Page:
          </label>
          <input style={{display: "inline-block"}} type="number" name="totalPage" value={input.totalPage} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Price:
          </label>
          <input style={{display: "inline-block"}} type="number" name="price" value={input.price} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{display: "inline-block", width: "150px"}}>
            Image Url:
          </label>
          <textarea style={{display: "inline-block"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <button>submit</button>
      </form>
    </>
  )
}

export default Books