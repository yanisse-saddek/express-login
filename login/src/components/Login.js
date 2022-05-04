import {useState, useContext} from 'react'
import axios from 'axios'
import Admin from './Admin'
import {logContext} from '../App'

export default function Login(){
    const [error, setError] = useState(false)
    const [status, setStatus] = useState(false)

    const context = useContext(logContext);
    const submitHandler = (e)=>{
        e.preventDefault()
        const v = e.target
        const data = {
            email:v.email.value,
            password:v.password.value,
        }
        axios.post('http://localhost:4000/auth/login',
                    data,    
        ).then(result=>{
            setStatus(true)
            setError(false)
            context.changeLog(result)
            context.changePage(<Admin/>)
        }).catch(
            function (error) {
              setError(true)
              setStatus(false)
              return Promise.reject(error)
              
            }
          )
        }
    return(
    <form onSubmit={submitHandler}>
        <div className="form-group">
            <h2>Login</h2>
            {
        error?
        <div className="alert alert-danger" role="alert">
            Erreur
        </div>
        :null
    }
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input name="email" type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
        <label htmlFor="exampleInputPassword1">Password</label>
        <input name="password" type="password" className="form-control"  placeholder="Password"/>
    </div>
    <button type="submit" className="btn btn-primary">Connexion</button>
    </form>
    )
}