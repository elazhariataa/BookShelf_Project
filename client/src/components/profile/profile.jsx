import { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import { Link } from 'react-scroll';
import { Link  as RouterLink} from  'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Profile(){
    const [loggedUser,setLoggedUser] = useState(cookies.get("UserId"))
    const [theUser,setTheUser] = useState({})
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState("")
    const [bio,setBio] = useState("")
    const [bookCollection,setBookCollection] = useState([])
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get(`http://localhost:5000/user/speUser/${loggedUser}`)
            return res.data;
        }
        getData()
        .then((user)=>{
            setTheUser(user)
            setUserName(user.userName)
            setEmail(user.email)
            setBio(user.bio)
        })
        .catch((error)=>{
            console.log("can't get user informations")
        })
    },[])
    const detailsCancel = ()=>{
        setUserName(theUser.userName)
        setEmail(theUser.email)
        theUser.bio? setBio(theUser.bio) : setBio("")
    }
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5000/book/userCollection/${loggedUser}`)
            return res.data
        }
        getData()
        .then((result)=>{
            setBookCollection(result)
        })
        .catch((error)=>{
            console.log("there is no book in your collection")
        })
    },[])
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5000/post/userPosts/${loggedUser}`)
            return res.data
        }
        getData()
        .then((result)=>{
            setPosts(result)
        })
        .catch((error)=>{
            console.log("there is no posts for you")
        })
    })
    const saveDetails = ()=>{
        const config = {
            method : "put",
            url : `http://localhost:5000/user/updateInfo/${loggedUser}`,
            data : {
                userName : userName,
                email : email,
                bio : bio
            }
        }
        axios(config)
        .then((result)=>{
            console.log("user info updated")
        })
        .catch((error)=>{
            console.log("user info can't be updated")
        })

    }
    return <div className='ProfilePage'>
        <div className="profileSidebar">
            <div className='userInfo'>
                <img src={require('../images/user1.png')} alt="profilePic"/>
                <h3>{theUser.userName}</h3>
            </div>
            <Link to="article2" smooth={true}><div className='navigate'>My details</div></Link>
            <Link to='article3' smooth={true}><div className='navigate'>My collection</div></Link>
            <RouterLink to='/MyPosts'><div className='navigate'>My Posts</div></RouterLink>
        </div>
        <div className="profileMain">
            {/* <div className="coverPhoto">
                <img src={require('../images/coverPhoto.jpg')} alt="coverPic" />
            </div> */}
            <div className="article1">
                <div className="article1_1">
                    <img src={require('../images/user1.png')} alt="profilePic"/>
                    <div className='article1_1_1'>
                        <h1>{theUser.userName}</h1>
                        <p>{theUser.bio} Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, ipsum. Architecto rerum natus saepe delectus deleniti sapiente mollitia cumque soluta, necessitatibus, assumenda dignissimos, repudiandae rem odit commodi eius blanditiis magni!</p>
                    </div>
                </div>
            </div>
            <div className="article2">
                <h1>Profile Details</h1>
                <div className="article2_1">
                    <label htmlFor="userName">Username</label>
                    <input type="text" name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                <div className="article2_1">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="article2_1">
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" value={bio} onChange={(e)=>setBio(e.target.value)} cols="30" rows="10" placeholder='write a short introduction...'></textarea>
                </div>
                <div className='article2_2'>
                    <button className='save' onClick={()=>saveDetails()}>Save changes</button>
                    <button className='cancel'onClick={()=>detailsCancel()}>Cancel</button>
                </div>
            </div>
            <h1 className='article3_h1'>My books Collection</h1>
            <div className='article3'>
                {bookCollection && bookCollection.map((item,index)=>
                    
                        <div key={index} className="bookCard">
                            <div className='userinfo'>
                                <img src={require('../images/man.png')} alt="" />
                                <p>{theUser.userName}</p>
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
                                <button>Discover Details</button>
                            </div>
                        </div>
                        
                )}
            </div>
        </div>
    </div>
}

export default Profile;