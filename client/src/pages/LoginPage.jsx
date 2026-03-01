import React, { useEffect } from 'react'
import Loginform from '../components/Login/Loginform'
import {ToastContainer,toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext'

function LoginPage() {
  const navigate=useNavigate();
  const {auth,login}=useAuth();

  useEffect(()=>{
    if(auth.isLoggedIn){
      navigate("/home")
    }
  },[auth.isLoggedIn])

  const handleLogin=async(loginForm)=>{
    if(!loginForm || !loginForm.mail || !loginForm.password){
      toast.warning("Fill all fields")
      return;
    }
    try{
      let res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({loginForm})
      })

      const data=await res.json();
      console.log(data)
      if(res.ok){
        toast.success("Account Login success.")
        login(data.user,data.token)
        navigate("/home") 
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err.message);
    }
  }

  return (
    <div> 
      <ToastContainer />
      <Loginform onSubmitLogin={handleLogin} />
    </div>
  )
}

export default LoginPage;
