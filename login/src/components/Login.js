import {useState, useContext} from 'react'
import axios from 'axios'
import {logContext} from '../App'

export default function Login(){
    const [error, setError] = useState(false)
    const [status, setStatus] = useState(false)

    const context = useContext(logContext);
    console.log(context)
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
            context.changeLog(true)
            console.log(result)
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
        <div class="form-group">
            <h2>Login</h2>
            {
        error?
        <div class="alert alert-danger" role="alert">
            Erreur
        </div>
        :null
    }
        <label for="exampleInputEmail1">Email address</label>
        <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        <label for="exampleInputPassword1">Password</label>
        <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
    </div>
    <button type="submit" class="btn btn-primary">Connexion</button>
    </form>
    )
}