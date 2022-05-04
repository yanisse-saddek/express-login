import './App.css';
import {useState, useEffect} from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Admin'
import Navbar from './components/Navbar'

function App() {
  const [page, setPage] = useState(<Register/>)

  const changePage = (page)=>{
    setPage(page)
  }
  return (
    <div className='container'>
      <Navbar change={changePage}/>
      {page}
    </div>
  );
}

export default App;
