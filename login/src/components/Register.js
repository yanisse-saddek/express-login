import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Login(){

    const [error, setError] = useState(false)
    const [status, setStatus] = useState(false)

const submitHandler = (e, ok)=>{
    e.preventDefault()
    const v = e.target
    const data = {
        email:v.email.value,
        password:v.password.value,
        confirmpassword:v.confirmpassword.value,
        firstname:v.firstname.value,
        surname:v.surname.value
    }
    axios.post('http://localhost:4000/register/',
                data,    
    ).then(result=>{
        setStatus(true)
        setError(false)
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
    <h1>Register</h1>
    
    {
        error?
        <div class="alert alert-danger" role="alert">
            Erreur
        </div>
        :null
    }
    {   
        status?
        <div class="alert alert-success" role="alert">
            Compte crée
        </div>
        :null
    }
    <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

        <label for="exampleInputEmail1">Firstname</label>
        <input name="firstname" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>

        <label for="exampleInputPassword1">Surname</label>
        <input name="surname" type="text" class="form-control" id="exampleInputPassword1" placeholder="Surname"/>

        <label for="exampleInputPassword1">Password</label>
        <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>

        <label for="exampleInputPassword1">Confirm your password</label>
        <input name="confirmpassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirm your password"/>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    )
}