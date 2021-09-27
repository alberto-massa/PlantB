import axios from "axios"


class CommentServices{
    construcror(){
        this.instance = axios.create({
            base_URL: `${process.env.REACT_APP_API_URL}/comment`
        })    
    }
    
    getComments = this.instance.get("/")
    getComment = (id) => this.instance.get(`/${id}`)
    deleteComment = (id) => this.this.instance.delete(`/${id}`)
    createComment = (comment) => this.instance.post("/", comment)
}

export default CommentServices