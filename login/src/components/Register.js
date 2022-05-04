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
        <label for="exampleInputEmail1">Adresse mail</label>
        <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Adresse mail"/>

        <label for="exampleInputEmail1">Prénom</label>
        <input name="firstname" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Prénom"/>

        <label for="exampleInputPassword1">Nom de famille</label>
        <input name="surname" type="text" class="form-control" id="exampleInputPassword1" placeholder="Nom de famille"/>

        <label for="exampleInputPassword1">Mot de passe</label>
        <input name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Mot de passe"/>

        <label for="exampleInputPassword1">Confirmez votre mot de passe</label>
        <input name="confirmpassword" type="password" class="form-control" id="exampleInputPassword1" placeholder="Confirmez votre mot de passe"/>
    </div>
    <button type="submit" class="btn btn-primary">Inscription</button>
    </form>
    )
}