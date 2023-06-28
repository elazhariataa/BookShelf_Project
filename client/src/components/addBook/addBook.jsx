import './addBook.css';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function AddBook(){
    const navigate = useNavigate()
    const [title,setTitle] = useState('');
    const [author,setAthor] = useState('');
    const [ISBN,setISBN] = useState("");
    const [publisher,setPublisher] = useState('');
    const [genre,setGenre] = useState('');
    const [description,setDescription] = useState('');
    const [rating,setRating] = useState(1);
    const [image,setImage] = useState('');
    const [add_at,setAdd_at] = useState(new Date());
    const [book_owner,setBook_owner] = useState(cookies.get("UserId"))

    const addBook = (e)=>{
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('image',  image);
        axios.post("http://localhost:5000/book/addBook",formData,{
            params: {
                title:title,
                author : author,
                ISBN : ISBN,
                publisher : publisher,
                genre : genre,
                description : description,
                rating : rating,
                add_at : add_at,
                book_owner : book_owner
            }
        }).then((res)=>{
            Swal.fire({
                icon: 'success',
                title: 'Book added successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/profile')
        }).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error adding book',  
              })
              console.log(error.response)
        })

        // const configuration = {
        //     method : "post",
        //     url : "http://localhost:5000/book/addBook",
        //     data : {
        //         title:title,
        //         author : author,
        //         ISBN : ISBN,
        //         publisher : publisher,
        //         genre : genre,
        //         description : description,
        //         rating : rating,
        //         add_at : add_at,
        //         book_owner : book_owner
        //     }
        // }
        // axios(configuration)
        // .then((result)=>{
        //     console.log("book added successfully");
        // })
        // .catch((error)=>{
        //     console.log("book can't be added")
        //     console.log(error)
        // })
    }
    return <div className='addBook_form'>
        <form onSubmit={(e)=>addBook(e)}>
            <div className='addbook1'>
                <div className='addbook2'>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} required onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
                </div>
                <div className='addbook2'>
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" value={author} required onChange={(e)=>setAthor(e.target.value)} placeholder="Author"/>
                </div>
            </div>
            <div className='addbook1'>
                <div className='addbook2'>
                    <label htmlFor="ISBN">ISBN</label>
                    <input type="number" name="ISBN" value={ISBN} required onChange={(e)=>setISBN(e.target.value)} />
                </div>
                <div className='addbook2'>
                    <label htmlFor="publisher">Publisher</label>
                    <input type="text" name="publisher" value={publisher} required onChange={(e)=>setPublisher(e.target.value)} placeholder="Publisher" />
                </div>
            </div>
            <div className='addbook1'>
                <div className='addbook2'>
                    <label htmlFor="genre">Genre</label>
                    <input type="text" name="genre" value={genre} required onChange={(e)=>setGenre(e.target.value)} placeholder="Genre"/>
                </div>
                <div className='addbook2'>
                    <label htmlFor="rating">Rating</label>
                    <input type="number" name="rating" value={rating} required onChange={(e)=>setRating(e.target.value)} max={5} min={1} />
                </div>
            </div>
            <div className='addbook1'>
                <div className='addbook2'>
                    <label htmlFor="genre">Image</label>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
            </div>
            <div className='addbook1'>
                <div className='addbook2'>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="10" placeholder='Type something'></textarea>
                </div>
            </div>
            <div>
                <button onClick={(e)=>addBook(e)}>Add book</button>
            </div>
        </form>
    </div>
}

export default AddBook;