import React, { Component } from 'react';

import './FullPost.css';
import axios from "axios";

class FullPost extends Component {

    state={
        loadedPost:null
    }
    componentDidUpdate() {
        if (this.props.postId){
           if (!this.state.loadedPost || this.state.loadedPost.id !== this.props.postId){
               axios.get('/posts/'+this.props.postId)
                   .then(response=>{
                       this.setState({loadedPost:response.data})
                       console.log(this.state.loadedPost)
                       // console.log(response)
                   })
           }
        }
    }
    DeleteHandler = (id) =>{
        axios.delete('/posts/'+id)
            .then(result=>console.log(result))
            .catch(err=>console.log(err))
    }
    render () {
        let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;
        if (this.props.postId){
            post = <p style={{textAlign:"center"}}>Loading...</p>;
        }
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={()=>this.DeleteHandler(this.state.loadedPost.id)} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;