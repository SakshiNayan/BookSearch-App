import React, { useState } from 'react'
import './book.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
function BookSearch() {
    const [searchVal, setSearchval] = useState("")
    const [data, setdata] = useState([])
    const [apikey , setapikey] = useState("AIzaSyDnVl_DzZozujUFNODkCj6gMz3LluRunFw")

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(searchVal === ""){
            return alert('please enter a valid book search !')
        }
        //const url =`https://www.googleapis.com/books/v1/volumes?q=${searchVal}&key=AIzaSyATIqpTGfnmO4cCE7xMsSEoN6ADE2pTRd0`
        
        
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+searchVal+"&key="+apikey).then((response)=>{
            console.log(response.data.items)
            setdata(response.data.items)
            console.log(data)
        })
        .catch(function (err){
            console.log(err)
        })
      }
  return (
    <div className='main'>
        <img src="./images/images.jfif" alt="" className='backimg'/>
        <div id='in-cotainer'>
            <input 
                type="search" 
                value={searchVal} 
                placeholder='Search for a book.....'
                onChange={(e)=> setSearchval(e.target.value)}
                className="input-field" 
            />
            <button className="Click-search" type="submit"
                onClick={handleSubmit}>Search</button>
        </div>
        <div id='book-container' className='row text-center text-lg-center'>
            {
                data.map((item,i)=>{
                    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    if(thumbnail!== undefined){
                        return(
                        <div className="col-lg-3 col-md-3 col-6"  key={i} id="box">
                            <a href={item.volumeInfo.infoLink}>
                            <img src={item.volumeInfo.imageLinks.thumbnail} alt="booklogo" id="image"  className='img-fluid img-thumbnail d-block mb-4 '/>
                            <h1 className='book'>{item.volumeInfo.title}</h1>
                            <div className='overlay' >
                                <p>{item.volumeInfo.title}</p>
                                <h2>{item.volumeInfo.authors}</h2>
                                <h6>PAGE COUNT :{item.volumeInfo.pageCount}</h6>
                                <h6>RATE :{item.volumeInfo.averageRating}</h6>

                            </div>
                            </a>
                        </div>
    
    
                        ) 
                    }
                })
            }
        </div>
        

    </div>
  )
}

export default BookSearch