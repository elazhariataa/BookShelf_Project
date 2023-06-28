import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import './bookDetails.css';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function BookDetails(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [book,setBook] = useState({});
    const [borrower_adress,setBorrower_adress] = useState('');
    const [borrower_email,setBorrower_email] = useState('');
    const [borrower_phone,setBorrower_phone] = useState('');
    const [send_at,setSend_at] = useState(new Date().toISOString().slice(0,10).replace(/-/g,"/"))
    const [period,setPeriod] = useState(10);
    const [borrower_notes,setBorrower_notes] = useState('');
    const [borrower,setBorrower] = useState(cookies.get("UserId"))
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5000/book/spBook/${id}`);
            return res.data;
        }
        getData()
        .then((book)=>{
            setBook(book)
        })
        .catch((error)=>{
            console.log("can't get the book")
        })
    },[])
    const clearForm = ()=>{
        setBorrower_adress("")
        setBorrower_email("")
        setBorrower_phone("")
        setPeriod(10)
        setBorrower_notes('')
    }
    const borrowRequest = (e)=>{
        e.preventDefault(e);
        const config = {
            method : "post",
            url : "http://localhost:5000/borrowRequest/addRequest",
            data : {
                borrowed_book : book.id,
                borrower_adress : borrower_adress,
                borrower_emeil : borrower_email,
                borrower_phone : borrower_phone,
                send_at : send_at,
                period : parseInt(period),
                borrower_notes : borrower_notes,
                borrower : borrower,
                lender : book.book_owner
            }
        }
        
        axios(config)
        .then((result)=>{
            console.log("request sent")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'The Request has been sent',
                showConfirmButton: false,
                timer: 1500
              })
            clearForm()
            navigate('/requests')
        })
        .catch((error)=>{
            console.log("can't send request")
        })

    }
    return <div className='bookDetails'>
        <div className='bookCard'>
            <div className='firsPart'>
                <img src={book.image} alt="" />
                <div>
                    <h2>Interested?</h2>
                    <Link to="borrowForm" smooth={true}><button>Borrow</button></Link>
                    <button>Add to favorites</button>
                </div>
            </div>
            <div className='secondPart'>
                <table border={"1px"}>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <td>{book.title}</td>
                        </tr>
                        <tr>
                            <th>Author</th>
                            <td>{book.author}</td>
                        </tr>
                        <tr>
                            <th>ISBN</th>
                            <td>{book.ISBN}</td>
                        </tr>
                        <tr>
                            <th>Publisher</th>
                            <td>{book.publisher}</td>
                        </tr>
                        <tr>
                            <th>Genre</th>
                            <td>{book.genre}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{book.description}</td>
                        </tr>
                        <tr>
                            <th>Book owner rating</th>
                            <td>{book.rating} &#9733;</td>
                        </tr>
                        <tr>
                            <th>Add at</th>
                            <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className='borrowRequest' id="borrowForm">
            <h2>Fill This Form to Send Request</h2>
            <form onSubmit={(e)=>borrowRequest(e)}>
                <div className="twin">
                    <div>
                        <label htmlFor="borrower_adress">Adress</label>
                        <input type="text" name='borrower_adress'value={borrower_adress} required onChange={(e)=>setBorrower_adress(e.target.value.toUpperCase())} placeholder="Your Adress"/>
                    </div>
                    <div>
                        <label htmlFor="borrower_email">Email</label>
                        <input type="email" name='borrower_email'value={borrower_email} required onChange={(e)=>setBorrower_email(e.target.value)} placeholder="Your Email"/>
                    </div>
                </div>
                <div className="twin">
                    <div>
                        <label htmlFor="borrower_phone">Phone</label>
                        <input type="number" name='borrower_phone'value={borrower_phone} required onChange={(e)=>setBorrower_phone(e.target.value)} placeholder="Your Phone"/>
                    </div>
                    <div>
                        <label htmlFor="period">For the period (days)</label>
                        <input type="number" name='period' value={period} required max={30} min={10} onChange={(e)=>setPeriod(e.target.value)}/>
                    </div>
                </div>
                <div className='notes'>
                    <label htmlFor="borrower_notes">Any Notes?</label>
                    <textarea name="borrower_notes"  cols="30" rows="10" value={borrower_notes} onChange={(e)=>setBorrower_notes(e.target.value)}></textarea>
                </div>
                <div className='handelRequest'>
                    <button onClick={(e)=>borrowRequest(e)}>Send Request</button>
                </div>
            </form>            

        </div>
    </div>
}

export default BookDetails;