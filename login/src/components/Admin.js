import axios from 'axios'
import {useState, useEffect, useContext} from 'react'
import {logContext} from '../App'
import Login from './Login'

export default function Admin(){
    const context = useContext(logContext);

    const [userList, setUserList] = useState([])
    useEffect(()=>{
        if(context.logState){
            
            axios.get('http://localhost:4000/admin').then(data=>{
                setUserList(data.data)
            })
        }else{
            context.changePage(<Login/>)
        }
    }, [])
    return(
        <>
        <h2>Admin</h2>
        <ul className="list-group">
        {
            userList.map((user,index)=>{
                    return <li key={index} className="list-group-item">{user.firstname}</li>
            })
        }
        </ul>
        </>
        )
}