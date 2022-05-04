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
    <div className="form-group">
        <label htmlFor="mail">Adresse mail</label>
        <input name="email" type="email" className="form-control" aria-describedby="emailHelp" id="mail" placeholder="Adresse mail"/>

        <label htmlFor="prenom">Prénom</label>
        <input name="firstname" type="text" className="form-control" aria-describedby="emailHelp" id="prenom" placeholder="Prénom"/>

        <label htmlFor="firstname">Nom de famille</label>
        <input name="surname" type="text" className="form-control" id="firstname" placeholder="Nom de famille"/>

        <label htmlFor="exampleInputPassword1">Mot de passe</label>
        <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Mot de passe"/>

        <label htmlFor="exampleInputPassword2">Confirmez votre mot de passe</label>
        <input name="confirmpassword" type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirmez votre mot de passe"/>
    </div>
    <button type="submit" className="btn btn-primary">Inscription</button>
    </form>
    )
}