import './login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigation = useNavigate();

    const handelSubmit = (e)=>{
        e.preventDefault(e);
        const configuration = {
            method : "post",
            url : "http://localhost:5000/user/login",
            data : {
                email,password
            }
        }
        axios(configuration)
        .then((result)=>{
            console.log("welcome to your account");
            cookies.set("Token",result.data.token,{path:"/",});
            cookies.set('UserId', result.data.userId, { path: '/' });
            navigation('/profile')
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.message}`,  
              })
            console.log(error.response.data.message);
        })
    }
    return <div className='loginForm'>
        <form onSubmit={(e)=>handelSubmit(e)}>
            <img src={require('../images/user1.png')} alt="" />
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
                <button type='submit' onClick={(e)=>handelSubmit(e)}>Login</button>
            </div>
            <div className='registerLink'>
                <a href="/register">Don't have account?</a>
            </div>
        </form>
    </div>
}


export default Login;