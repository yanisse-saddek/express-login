import './App.css';
import {useState, useEffect} from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Admin'
import Navbar from './components/Navbar'
import React from 'react'

export const logContext = React.createContext();
function App() {
  const [page, setPage] = useState(<Register/>)
  const [logState, setLog] = useState(false)

  const changePage = (page)=>{
    setPage(page)
  }
  const changeLog = (state)=>{
    console.log('changelog', state)
    setLog(state)
  }
  const contextData = {
    logState:logState,
    changeLog:changeLog,
    changePage  
  }
  return (
    <logContext.Provider value={contextData}>
    <div className='container'>
      <Navbar change={changePage}/>
      {page}
    </div>
    </logContext.Provider>
  );
}

export default App;
