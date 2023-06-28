import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './components/protectedRoutes';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Profile from './components/profile/profile';
import AddBook from './components/addBook/addBook';
import Books from './components/books/books';
import BookDetails from './components/bookDetails/bookDetails';
import Requests from './components/requests/requests';
import Posts from './components/posts/posts';
import MyPosts from './components/myPosts/myPosts'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={
            <ProtectedRoutes>
              <Profile/>
            </ProtectedRoutes>}/>
          <Route path='/addBook' element={
            <ProtectedRoutes>
              <AddBook/>
            </ProtectedRoutes>}/>
          <Route path='/books' element={
            <ProtectedRoutes>
              <Books/>
            </ProtectedRoutes>}/>
          <Route path='/bookDetails/:id' element={
            <ProtectedRoutes>
              <BookDetails/>
            </ProtectedRoutes>}/>
          <Route path='/requests' element={
            <ProtectedRoutes>
              <Requests/>
            </ProtectedRoutes>}/>
          <Route path='/posts' element={
            <ProtectedRoutes>
              <Posts/>
            </ProtectedRoutes>}/>
          <Route path='/MyPosts' element={
            <ProtectedRoutes>
              <Posts/>
            </ProtectedRoutes>}/>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
