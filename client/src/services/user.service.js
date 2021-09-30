import axios from "axios"

class UserService {
constructor(){
    this.instance = axios.create({
    baseURL: `${process.env.React_APP_API_URL}/user`
    })
}

getUsers = () => this.instance.get("/");
getUser = (id) => this.instance.get(`/${id}`)
EditUser = (id) => this.instance.put(`/${id}`)
createUser = (user) => this.instance.post("/", user)
deleteUSer = (id) => this.instance.delete(`/${id}`)
}

export default UserService