import { useState } from 'react';
import './register.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Register(){
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigation = useNavigate()

    const handelSubmit = (e)=>{
        e.preventDefault();
        const configuration = {
            method : "post",
            url : "http://localhost:5000/user/register",
            data : {
                userName,email,password
            }
        }
        axios(configuration)
        .then((result)=>{
            Swal.fire({
                icon: 'success',
                title: 'Registration passed successfully',
                showConfirmButton: false,
                timer: 1500
              })
            navigation('/login')
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registration Error',  
              })
              console.log(error.response)
        })
    }
    return <div className="register-form">
        <form onSubmit={(e)=>handelSubmit(e)}>
            <div className='ttt'>
                <img src={require('../images/user1.png')} alt="" />
            </div>
            <div>
                <label htmlFor="userName">User Name</label>
                <input type="text" name='userName' value={userName} onChange={(e)=>setUserName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
                <button type='submit' onClick={(e)=>handelSubmit(e)}>Register</button>
            </div>
            <div>
                <a href="/login">Already have account?</a>
            </div>
        </form>
    </div>
}

export default Register;