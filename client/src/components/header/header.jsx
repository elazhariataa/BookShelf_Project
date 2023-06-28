import './header.css';
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
const cookies = new Cookies();



function Header(){
    const token = cookies.get("Token");
    const navigation = useNavigate();
    const logout = ()=>{
        cookies.remove("Token",{path:'/'});
        navigation('/');
    }
    return <header>
        {token?
        <div>
            <div className='logotitle'>
            <a href=""><img src={require('../images/1.jpg')} alt='website logo'/></a>
            <h1>Bookshelf</h1>
            </div>
            <div className='menu'>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/addBook">Add Book</a></li>
                    <li><a href="/books">Books</a></li>
                    <li><a href="/posts">Posts</a></li>
                    <li><a href="/requests">requests</a></li>
                </ul>
            </div>
            <div className="dropdown" >
                <img src={require('../images/user1.png')} alt="profilepic" />
                <div className='dropdown-content'>
                    <a href="/profile"><img src={require('../images/user.png')}/>Profile</a>
                    <button onClick={()=>{logout()}}><img src={require('../images/shutdown.png')}/> Log out</button>
                </div>
            </div>
        </div>
        :
        <div>
            <div className='logotitle'>
                <a href=""><img src={require('../images/1.jpg')} alt='website logo'/></a>
                <h1>Community readres</h1>
            </div>
            <div className='menu'>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="">About us</a></li>
                    <li><a href="/books">Books</a></li>
                    <li><a href="/posts">Posts</a></li>
                </ul>
            </div>
            <div className="dropdown" >
                <button className="dropbtn">Login/Register</button>
                <div className='dropdown-content'>
                    <a href="/login"><img src={require('../images/user.png')}/>Login</a>
                    <a href="/register"><img src={require('../images/register.png')}/>register</a>
                </div>
            </div>
        </div>
        }
    </header>
}

export default Header;