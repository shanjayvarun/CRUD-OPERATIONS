import React, { Component } from "react";
import axios from "axios";
import {Table,Button} from "react-bootstrap";


class PostApp extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            id:"",
            userId: "",
            title: "",
            body: "",
            
            user:[

            ]
            
        }
    }

    componentDidMount = () => this.getPosts();

    ;

    createPost = async () => {
        try {
            const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts",
                {
                    userId: this.state.userId,
                    title: this.state.title,
                    body: this.state.body,
                });
            const posts = [...this.state.posts];
            posts.push(data);
            this.setState({
                posts: posts, userId: "",
                title: "",
                body: "",
            });

        } catch (e) {
            console.log(e);
        }
    }

    getPosts = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            this.setState({ posts: response.data });
        } catch (err) {
            console.error(err);
        }
    }

    deletePost = async (postId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            let posts = [...this.state.posts];
            posts = posts.filter((post) => post.id !== postId);
            this.setState({ posts });
        } catch (error) {
            console.log(error);
        }

    }
    selectPost = (post) => {
             this.setState({
                 id:post.id,
                userId: post.userId,
                title: post.title,
                body: post.body,
             })
    }
    updatePost = async () => {
        // API Call to server and update an existing post
        try {
          const { id, userId, title, body, posts } = this.state;
          const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            userId,
            title,
            body,
          });
          const index = posts.findIndex((post) => post.id === id);
          posts[index] = data;
    
          this.setState({ posts, id: "", userId: "", title: "", body: "" });
        } catch (err) {
          console.log(err);
        }
      };

      getUser = async (userId) =>{
          const {data} = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            console.log(data);
            this.setState({
                user:data
            });   
            alert(data.username);
      }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.id){
            this.updatePost();
        }else{
        this.createPost();
        }

    }


    render() {
        return (
            <>
            <div className = "tasks">
                <form onSubmit={this.handleSubmit}>
                    <p>UserId</p>
                    <input type="number" name="userId" value={this.state.userId} onChange={this.handleChange} />
                    <p>Title</p>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                    <p>Body</p>
                    <input type="text" name="body" value={this.state.body} onChange={this.handleChange} />
                    <input type="Submit" />
                </form>
                </div>
                <Table striped bordered hover variant = "dark" >
                    <thead>
                        <tr>
                    <th>Id</th>
                    <th>UserId</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post) => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>
                                    <Button variant="light" onClick={() => this.selectPost(post)}>Edit</Button>
                                    <Button variant="danger" onClick={() => this.deletePost(post.id)}>Delete</Button>
                                    <Button onClick={()=>this.getUser(post.userId)}>Get User</Button>
                                    {/* <Button >Get Comments</Button> */}
                                    </td>
                                </tr>
                                
                                
                            );
                        })}
                    </tbody>
                    {/* <tbody>
                        <div>{this.state.user}</div>
                    </tbody> */}
                </Table>
                {/* <div>
                    {this.state.user.map((e)=>{
                        return e.id;
                    })}
                </div> */}
                
            </>
        );
    }
}
export default PostApp;