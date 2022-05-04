import Login from './Login'
import Register from './Register'

export default function Navbar(props){
    return(
        <>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button onClick={()=>{props.change(<Login/>)}} type="button" class="btn btn-success">Connexion</button>
            <button onClick={()=>{props.change(<Register/>)}} type="button" class="btn btn-success">Inscription</button>
        </div>
        </>
    )
}