import './home.css'


function Home(){
    return <div>
        <div className="homeArticle1">
            <div className='homeArticle1_1'>
                <h1>Welcome to BookShelf</h1>
                <p>We are thrilled to have you join our community of book lovers! At Community Readers, we believe in the power of books to connect, inspire, and transform lives.
                    Whether you're an avid reader or just starting your reading journey, we have something for everyone.
                </p>
            </div>
            <div className='homeArticle1_2'>
                <img src={require('../images/pic1.jpg')} alt="" />
            </div>
            
        </div>
        <div className='homeArticle2'>
            <h3>Borrow Your Next Adventure!</h3>
            <p>At BookShelf, we believe in fostering a sense of sharing and community among book lovers. That's why we offer a seamless option to borrow books from fellow members within our application. With our innovative borrowing feature,
                you can explore a vast collection of books and embark on new literary adventures without breaking the bank.
            </p>
        </div>
        <div className='homeArticle3'>
            <div className='homeArticle3_1'>
                <img src={require('../images/pic2.jpg')} alt="" />
            </div>
            <div className='homeArticle3_2'>
                <h3>Share Your Favorite Quotes</h3>
                <p>At BookShelf, we understand the profound impact that quotes can have on our reading experience. They have the power to inspire, provoke thought, and evoke emotions. 
                    That's why we've introduced a special feature that allows you to share your favorite quotes within our application's vibrant community of book enthusiasts.
                </p>
            </div>

        </div>
    </div>
}

export default Home;