import { useContext, useEffect } from 'react'
import {logContext} from '../App'
import Login from './Login'
import axios from 'axios'

export default function Navbar(props){
    const context = useContext(logContext);
    useEffect(()=>{
        axios.post('http://localhost:4000/logout').then(res=>{
            context.changeLog(false)
            context.changePage(<Login/>)
        })
    }, [])
    return(
        <>
        </>
    )
}