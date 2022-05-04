import { useContext } from 'react'
import Login from './Login'
import Register from './Register'
import Admin from './Admin'
import Disconnect from './Disconnect'
import {logContext} from '../App'

export default function Navbar(props){
    const context = useContext(logContext);

    return(
        <>
        <div className="btn-group" role="group" aria-label="Basic example">
            {
                context.logState?
                <button onClick={()=>{props.change(<Disconnect/>)}} type="button" className="btn btn-danger">Deconnexion</button>:
                <>
                    <button onClick={()=>{props.change(<Login/>)}} type="button" className="btn btn-success">Connexion</button>
                    <button onClick={()=>{props.change(<Register/>)}} type="button" className="btn btn-success">Inscription</button>
                </>
            }
        </div>
        </>
    )
}