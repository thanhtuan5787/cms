import React ,{ useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Login from '../src/Pages/Login';
import Home from '../src/Pages/Home';

axios.interceptors.request.use(
  config => {
  
    let token = localStorage.getItem("jwt_token")
    if (token){
      config.headers = Object.assign({
        Authorization: `Bearer ${token}`
      }, config.headers)
    }
    
    return config
  },
  (err) => {
     return Promise.reject(err);
  }
);
const ParentWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  
  axios.interceptors.response.use(
    (res) => {
      console.log("res");
       if (res.status === 401){
        setIsLoggedIn(false)
       }
       return res;
    },
    (err) => {
      console.log(err);
      if (err.response.status === 401){
        setIsLoggedIn(false)
       }
       return res;
      //  return Promise.reject(err);
    }
  );
  useEffect(() => {
    let token = localStorage.getItem("jwt_token")
    if (token){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  },[])
  
  function onLoggedIn(){
    setIsLoggedIn(true);
  }
  return (
    <>
    {isLoggedIn && (<Home />)}
    {!isLoggedIn && (<Login onLoggedIn={onLoggedIn}/>)}
    </>
    
  )
}

ReactDOM.render(<ParentWrapper />, document.getElementById('root'))
