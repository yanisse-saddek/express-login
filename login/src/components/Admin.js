import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import {logContext} from '../App'
import Login from './Login'

export default function Admin(){
    const context = useContext(logContext);
    const [image, setImage] = useState();

    const [userList, setUserList] = useState([])
    const submitHandler =(e)=>{
        e.preventDefault()

        const formData = new FormData();
        formData.append("file", image);
        fetch("http://localhost:4000/upload", {
          method: "POST",
          body: formData,
          credentials: 'include'    
        });
    }
    useEffect(()=>{
        if(context.logState){
            axios.get('http://localhost:4000/admin', {withCredentials:true}).then(data=>{
                setUserList(data.data)
            })
        }else{
            context.changePage(<Login/>)
        }
    }, [])
    return(
        <>
        <h2>Admin</h2>
        <form onSubmit={submitHandler} enctype="multipart/form-data" >
            <label for="formFile" class="form-label">Default file input example</label>
            <input 
            onChange={(event) => setImage(event.target.files[0])}
            name="ok" 
            class="form-control" 
            type="file" id="formFile"/>
            <button type="submit" className="btn btn-primary">Publier image de profil</button>
        </form>
        <ul className="list-group">
        {
            userList.map((user,index)=>{
                    return (
                        <div>
                            <img src={user.profilePicture} />
                            <li key={index} className="list-group-item">{user.firstname}</li>
                        </div>
                    )
            })
        }
        </ul>
        </>
        )
}