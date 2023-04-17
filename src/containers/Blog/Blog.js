import React, {Component} from 'react';
// import axios from "axios";
import instance from "../../axios";
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts:[],
        selectedId:null,
        error:false
    }

    componentDidMount() {
        instance.get('/posts')
            .then(response => {
                const post = response.data.slice(0, 4);
                const updatedPost =post.map(post=>{
                    return {...post,author:'Max'}
                })
                this.setState({posts:updatedPost})
                console.log(this.state.posts)
            })
            .catch(err=>{
                this.setState({error:true})
            })
    }

    postSelectedHandler(id){
        this.setState({selectedId:id})
    }

    render() {
        // const posts = this.state.posts.map((post)=>{
        //     return <Post post={post}/>
        // })
        let posts= <p style={{textAlign:"center"}}>Something Went Wrong !</p>

        if (!this.state.error){
            posts = this.state.posts.map(post=>{
                return <Post
                    key={post.id}
                    author={post.author}
                    title={post.title}
                    clicked={()=>this.postSelectedHandler(post.id)}/>
            })
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postId={this.state.selectedId}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;