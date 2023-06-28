import { useEffect, useState } from 'react';
import axios from 'axios';
import './requests.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



function Requests(){
    const [users,setUsers] = useState([]);
    const [books,setBooks] = useState([])
    const [receivedRequests,setRecieivedRequests] = useState([]);
    const [sentRequests,setSentRequests] = useState([]);
    const [showMore,setShowMore] = useState(false);
    const [selectedRequest,setSelectedRequest] = useState(null);
    const [isRecieved,setIsRecieved] = useState(true);
    const [isSent,setIsSent] = useState(false);

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
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get("http://localhost:5000/book/all");
            return res.data;
        }
        getData()
        .then((books)=>{
            setBooks(books)
        })
    },[])
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get("http://localhost:5000/borrowRequest/all");
            return res.data;
        }
        getData()
        .then((result)=>{
            const requests = result.reverse();
            setRecieivedRequests(requests.filter((item)=>item.lender === cookies.get("UserId")))
            setSentRequests(requests.filter((item)=>item.borrower === cookies.get("UserId")))
        })
        .catch((error)=>{
            console.log("can't get the requests")
        })
    },[])
    const requestState = (state,id)=>{
        const config = {
            method : "put",
            url : `http://localhost:5000/borrowRequest/decesion/${id}`,
            data : {desecion : state}
        }
        axios(config)
        .then((result)=>{
            const updatedRequests = receivedRequests.map((request)=>{
                if(request.id === id){
                    return{...request,request_state : state}
                }
                return request
            })
            setRecieivedRequests(updatedRequests)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'The Request has been sent',
                showConfirmButton: false,
                timer: 1500
            })
            setShowMore(false)
            console.log("request state updated")
        })
        .catch((error)=>{
            console.log("request state can't be updated")
        })
    }
    const ShowMoreLess = (requestId)=>{
        setSelectedRequest(requestId);
        setShowMore(!showMore);
    }
    const displayRequests = ()=>{
        setIsRecieved(!isRecieved);
        setIsSent(!isSent)
    }
    return <div className='notifications'>
        <div className='displayRequests'>
            <div className={`requests ${isRecieved? 'active' : ''}`} onClick={()=>displayRequests()}>Recieved Requests</div>
            <div className='vertical'></div>
            <div className={`requests ${isSent? 'active' : ''}`} onClick={()=>displayRequests()}>Sent Requests</div>
        </div>
        { isRecieved === true ?
        <div className='receivedRequests'>
            {receivedRequests && receivedRequests.map((item,index)=>{
                const user = users.find((u)=>u.userId === item.borrower)
                const book = books.find((b)=>b.id === item.borrowed_book)
                return(
                    <div key={index} className='receivedCard'>
                        <div className='part1'>
                            <p><span className='user'>{user.userName.toUpperCase()}</span> sent you a borrow request</p>
                            <p>{item.send_at}</p>
                        </div>
                        <div className='part2Parent'>
                            <div className='part2'>
                                {user.userName.toUpperCase()} want to borrow the book <span className='bookTitle'>"{book?.title}"</span>
                            </div>
                            {item.request_state === "pending" && <div className='unreadNotif'></div>}
                            
                        </div>
                        <div className='part3'>
                            <div className='part3Children'>
                                <a onClick={()=>ShowMoreLess(item.id)} className="show-more-button">
                                    {selectedRequest === item.id && showMore?  <span>&Delta; Show Less</span> : <span>&nabla; Show More</span>}
                                </a>
                                <div>{item.request_state}</div>
                            </div>
                            <div className='part3-1'>
                                {selectedRequest === item.id && showMore &&
                                <div className='part3-1-2'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Borrower Adress</th>
                                                <td>{item.borrower_adress}</td>
                                            </tr>
                                            <tr>
                                                <th>Borrower Email</th>
                                                <td>{item.borrower_emeil}</td>
                                            </tr>
                                            <tr>
                                                <th>Borrower Phone</th>
                                                <td>{item.borrower_phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Borrowing Period</th>
                                                <td>{item.period} Days</td>
                                            </tr>
                                            <tr>
                                                <th>Borrower Notes</th>
                                                <td>{item.borrower_notes}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {item.request_state === "pending" &&
                                        <div className='decesion'>
                                            <button className='accept' onClick={()=>requestState('accepted',item.id)}>Accept Request</button>
                                            <button className='refuse'onClick={()=>requestState('refused',item.id)}>Refuse Request</button>
                                        </div>
                                    }
                                    
                                </div>
                                    
                                    
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
        :
        <div className='receivedRequests'>
            {sentRequests && sentRequests.map((item,index)=>{
                const user = users.find((u)=>u.userId === item.lender)
                const book = books.find((b)=>b.id === item.borrowed_book)
                return(
                    <div key={index} className='receivedCard'>
                        <div className='part1'>
                            <p>You sent a borrow request to <span className='user'>{user.userName.toUpperCase()}</span></p>
                            <p>{item.send_at}</p>
                        </div>
                        <div className='part2Parent'>
                            <div className='part2'>
                                You want to borrow from {user.userName.toUpperCase()} the book <span className='bookTitle'>"{book?.title}"</span>
                            </div>
                            {/* {item.request_state === "pending" && <div className='unreadNotif'></div>} */}
                            
                        </div>
                        <div className='part3'>
                            <div className='part3Children'>
                                <a onClick={()=>ShowMoreLess(item.id)} className="show-more-button">
                                    {selectedRequest === item.id && showMore?  <span>&Delta; Show Less</span> : <span>&nabla; Show More</span>}
                                </a>
                                <div>{item.request_state}</div>
                            </div>
                            <div className='part3-1'>
                                {selectedRequest === item.id && showMore &&
                                <div className='part3-1-2'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Your Adress</th>
                                                <td>{item.borrower_adress}</td>
                                            </tr>
                                            <tr>
                                                <th>Your Email</th>
                                                <td>{item.borrower_emeil}</td>
                                            </tr>
                                            <tr>
                                                <th>Your Phone</th>
                                                <td>{item.borrower_phone}</td>
                                            </tr>
                                            <tr>
                                                <th>Your Period</th>
                                                <td>{item.period} Days</td>
                                            </tr>
                                            <tr>
                                                <th>Your Notes</th>
                                                <td>{item.borrower_notes}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {/* {item.request_state === "pending" &&
                                        <div className='decesion'>
                                            <button className='accept'>Edite Request</button>
                                            <button className='refuse'>Delete Request</button>
                                        </div>
                                    } */}
                                    
                                </div>
                                    
                                    
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            )}
        </div>
        }
    </div>
}

export default Requests;