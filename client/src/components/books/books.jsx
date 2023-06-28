import axios from 'axios';
import { useEffect, useState } from 'react';
import './books.css';
import {useNavigate} from 'react-router-dom';



function Books(){
    const [books,setBooks] = useState([]);
    const [users,setUsers] = useState([]);
    const [genres,setGenres] = useState([]);
    const [choosedGenre,setChoosedGenre] = useState("");
    const [booksByGenre,setBooksByGenre] = useState([]);
    const [isfilter,setIsfilter] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get("http://localhost:5000/book/all");
            return res.data;
        }
        getData()
        .then((books)=>{
            setBooks(books)
            setGenres(books.map((item)=>item.genre))
        })
    },[])
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get("http://localhost:5000/user/all");
            return res.data;
        }
        getData()
        .then((users)=>{
            setUsers(users)
        })
    },[])
    const byGenre = ()=>{
        setBooksByGenre(books.filter((item)=>item.genre === choosedGenre))
        setIsfilter(true)
    }
    const cancelFilter = ()=>{
        setIsfilter(false)
    }
    const discoverDetails = (id)=>{
        navigate(`/bookDetails/${id}`)
    }
    return <div>
        <div className='filtering'>
            <label htmlFor="choosedGenre">Filter by Genre</label>
            <select name="choosedGenre" value={choosedGenre} onChange={(e)=>setChoosedGenre(e.target.value)}>
                {genres.map((g,index)=><option value={g} key={index}>{g}</option>)}
            </select>
            <button onClick={()=>byGenre()}>Filter</button>
            <button onClick={()=>cancelFilter()}>Reset</button>
        </div>
        <div className='booksCards'>
            {isfilter===true? booksByGenre && booksByGenre.map((item,index)=>{
                const user = users.find((u)=>u.userId === item.book_owner)
                return (
                    <div key={index} className="bookCard">
                        <div className='userinfo'>
                            <img src={require('../images/man.png')} alt="" />
                            <p>{user.userName}</p>
                        </div>
                        <div className='bookinfo'>
                            <img src={item.image} alt="" />
                            <div className='compl1'>
                                <h3>{item.title}</h3>
                                <span>{item.rating} &#9733;</span>
                            </div>
                                <p className='author'>by {item.author}</p> 
                        </div>
                        <div className='details'>
                            <button onClick={()=>discoverDetails(item.id)}>Discover Details</button>
                        </div>
                    </div>
                )
                
            }  
            )
        :
        books && books.map((item,index)=>{
            const user = users.find((u)=>u.userId === item.book_owner)
            return (
                <div key={index} className="bookCard">
                    <div className='userinfo'>
                        <img src={require('../images/user.png')} alt="" />
                        <p>{user && user.userName}</p>
                    </div>
                    <div className='bookinfo'>
                        <img src={item.image} alt="" />
                        <div className='compl1'>
                            <h3>{item.title}</h3>
                            <span>{item.rating} &#9733;</span>
                        </div>
                            <p className='author'>by {item.author}</p> 
                    </div>
                    <div className='details'>
                        <button onClick={()=>discoverDetails(item.id)}>Discover Details</button>
                    </div>
                </div>
            )
            
        }  
        )
        }
        </div>
    </div>
    
}


export default Books;