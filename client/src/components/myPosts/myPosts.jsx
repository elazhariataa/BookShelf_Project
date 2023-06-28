import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function MyPosts(){
    const [post_content,setPost_content] = useState('');
    const [posts,setPosts] = useState([]);
    const [users,setUsers] = useState([]);
    const [loggeduser,setLoggedUser] = useState({});
    const [newComment,setNewComment] = useState("");
    const [share_at,setShare_at] = useState(new Date().toISOString().slice(0,10).replace(/-/g,"/"));
    const [isComment,setIsComment] = useState(false);
    const [isLike,setIsLike] = useState(false);
    const [selectedPost,setSelectedPost] = useState(null)

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get("http://localhost:5000/user/all");
            return res.data;
        }
        getData()
        .then((users)=>{
            setUsers(users)
            setLoggedUser(users.find((item)=> item.userId === cookies.get("UserId")))

        })
    })
    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5000/post/userPosts/${loggeduser.userId}`);
            return res.data
        }
        getData()
        .then((posts)=>{
            setPosts(posts.reverse())
        })
    })
    const addPost = (e)=>{
        e.preventDefault(e);
        const config = {
            method : "post",
            url : "http://localhost:5000/post/addpost",
            data : {
                post_content : post_content,
                poster : loggeduser.userId,
            }
        }
        axios(config)
        .then((result)=>{
            console.log("post add successfully")
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'The post has been shared',
                showConfirmButton: false,
                timer: 1500
              })
              setPost_content('')
        })
        .catch((error)=>{
            console.log("post can't be added")
        })
    }
    const addComment = (e,id)=>{
        e.preventDefault(e);
        const config = {
            method : "put",
            url : `http://localhost:5000/post/addComment/${id}`,
            data : {
                content : newComment,
                commenter : loggeduser.userId,
                commented_at : share_at
            }
        }
        axios(config)
        .then((result)=>{
            console.log("comment added")
            setNewComment('');
        })
        .catch((error)=>{
            console.log("comment can't be added")
        })
    }
    const addlike = (id)=>{
        const config = {
            method : "put",
            url : `http://localhost:5000/post/addLike/${id}`,
            data : {
                liker : loggeduser.userId,
                liked_at : share_at
            }
        }
        axios(config)
        .then((result)=>{
            console.log("like added")
        })
        .catch((error)=>{
            console.log("like can't be added")
        })
    }
    const unlike = (id)=>{
        const config = {
            method : "put",
            url : `http://localhost:5000/post/unlike/${id}`,
            data : {
                userId : loggeduser.userId
            }
        }
        axios(config)
        .then((result)=>{
            console.log('post unliked')
        })
        .catch((error)=>{
            console.log("post can't be unliked")
        })
    }
    const savePost = (id)=>{
        const config = {
            method : "put",
            url : `http://localhost:5000/post/savePost/${loggeduser.userId}`,
            data : {
                id
            }
        }
        axios(config)
        .then((result)=>{
            console.log("post Saved")
        })
        .catch((error)=>{
            console.log("post can't be saved")
        })
    }
    const unsavePost = (id)=>{
        const config = {
            method : "put",
            url : `http://localhost:5000/post/unsavePost/${loggeduser.userId}`,
            data : {
                id
            }
        }
        axios(config)
        .then((result)=>{
            console.log("post unsaved")
        })
        .catch((error)=>{
            console.log("post can't be unsaved")
        })
    }
    const seeComments = (postId)=>{
        setSelectedPost(postId)
        setIsComment(!isComment);
        setIsLike(false)
    }
    const seeLikes = (postId)=>{
        setSelectedPost(postId)
        setIsLike(!isLike)
        setIsComment(false)
    }

    return <div className='posts'>
        <div className='addPost'>
            <form onSubmit={(e)=>addPost(e)}>
                <textarea name="post_content"  cols="30" rows="3" value={post_content} onChange={(e)=>setPost_content(e.target.value)} placeholder="what's in your mind?"></textarea>
                <button onClick={(e)=>addPost(e)}>Share Post</button>
            </form>
        </div>
        <div className='postsCards'>
            {posts && posts.map((item,index)=>{
                const user = users.find((u)=> u.userId === item.poster)
                const savedPost =  loggeduser.savedPosts.find((s)=> {return(s === item.id)})
                const likedPost = item.likes.find((l)=> l.liker === loggeduser.userId)
                const comments = item.comments;
                const likes = item.likes;
                return (
                    <div className='postCard' key={index}>
                        <div className='postCardHeader'>
                            <div className='userInfo'>
                                <img src={require('../images/user1.png')} alt="user pic" />
                                <h3>{user.userName}</h3>
                            </div>
                            <div className='sharedAt'>
                                <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className='postContent'>
                            <div>{item.post_content.split('\n').map((line,i)=><p key={i}>{line}</p>)}</div>
                        </div>
                        <div className='addComment'>
                            <form onSubmit={(e)=>addComment(e)}>
                                <input type="text" name="newComment" value={newComment} onChange={(e)=>setNewComment(e.target.value)} placeholder="Add your comment"/>
                                <button onClick={(e)=>addComment(e,item.id)}>Send</button>
                            </form>
                        </div>
                        <div className='likers'>
                            <p onClick={()=>seeLikes(item.id)}>See who liked this post</p>
                        </div>
                        <hr/>
                        <div className='postActions'>
                            <div className='postLikes'>
                                <div>{item.likes.length}</div>
                                {likedPost?
                                    <img src={require('../images/redHeart.png')} alt="like" onClick={()=>unlike(item.id)}/>
                                    :
                                    <img src={require('../images/heart.png')} alt="like" onClick={()=>addlike(item.id)}/>
                                }
                            </div>
                            <div className='postComments' onClick={()=> seeComments(item.id)}>
                                <div>{item.comments.length}</div>
                                <img src={require('../images/comment.png')} alt="comment" />
                            </div>
                            <div className='postSave'>
                                {savedPost?
                                    <img src={require('../images/bookmark.png')} alt="unsavePost" onClick={()=>unsavePost(item.id)}/>
                                    :
                                    <img src={require('../images/savePost.png')} alt="savePost" onClick={()=>savePost(item.id)}/>
                                }
                                
                            </div>
                        </div>
                        {selectedPost === item.id && isComment &&
                            <div className='seeComment'>
                                {/* <hr/> */}
                                {comments.map((c,index)=>{
                                    const commentedby = users.find((u)=> u.userId === c.commenter)
                                    return(
                                        <div className='seeCommentCard' key={index}>
                                            <div className='seeCommentHeader'>
                                                <div className='userInfo'>
                                                    <img src={require('../images/user1.png')} alt="user pic" className='userComPic' />
                                                    <h3>{commentedby.userName}</h3>
                                                </div>
                                                <div className='sharedAt'>
                                                    <p>{c.commented_at}</p>
                                                </div>
                                            </div>
                                            <div className='seeCommentBody'>
                                                <p>{c.content}</p>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        }
                        {selectedPost === item.id && isLike &&
                            <div className='seeLikes'>
                                {/* <hr/> */}
                                {likes.map((l,index)=>{
                                    const likedBy = users.find((u)=> u.userId === l.liker)
                                    return(
                                        <div className='seeLikeCard' key={index}>
                                            <div className='seeLikeHeader'>
                                                <div className='userInfo'>
                                                    <img src={require('../images/user1.png')} alt="user pic" className='userComPic' />
                                                    <h3>{likedBy.userName}</h3>
                                                </div>
                                                <div className='sharedAt'>
                                                    <p>{l.liked_at}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        }
                        
                    </div>
                )
            })}
        </div>
    </div>
}

export default MyPosts;