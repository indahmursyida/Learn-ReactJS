import React, {Component} from "react"
import axios from "axios"

function formatRupiah(angka, prefix){
  var number_string = angka.toString(),
  split   		= number_string.split(','),
  sisa     		= split[0].length % 3,
  rupiah     		= split[0].substr(0, sisa),
  ribuan     		= split[0].substr(sisa).match(/\d{3}/gi),
  separator;

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if(ribuan){
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return 'Rp. ' + rupiah + ",-";
}

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/books`)
    .then(res => {
      let books = res.data.map(el=>{ return {
        id: el.id, 
        title: el.title, 
        description: el.description,
        review: el.review,
        release_year: el.release_year,
        totalPage: el.totalPage,
        price: el.price,
        image_url: el.image_url
      }})
      this.setState({books})
    })
  }

  render(){
    return (
      <>
        <h1>Daftar Buku-buku pilihan</h1>
        <div id="article-list">
          {
            this.state.books.map((item)=>{
              return(
                <div>
                  <h3>{item.title}</h3>
                  <div style={{display: "inline-block"}}>
                    <div style={{width: "40vw", float: "left", display: "inline-block"}}>
                      <img style={{width: "100%", height: "300px", objectFit: "cover"}} src={item.image_url} />
                    </div>
                    <div style={{float: "left", "font-size": "20px", padding: "10px", top: 0, display: "inline-block" }}>
                      <strong>Tahun Terbit : {item.release_year}</strong><br/>
                      <strong>Harga: {formatRupiah(item.price)}</strong><br/>
                      <strong>Jumlah Halaman: {item.totalPage}</strong>
                    </div>
                  </div>
                  <p>
                    <strong style={{marginRight: "10px"}}>Deskripsi :</strong>
                    {item.description}
                  </p>
                  <p>
                    <strong style={{marginRight: "10px"}}>Ulasan :</strong>
                    {item.review}
                  </p>
                  <hr/>
                </div>
              )
            })
          }
        </div>
      </>
    )
  }
}

export default Home