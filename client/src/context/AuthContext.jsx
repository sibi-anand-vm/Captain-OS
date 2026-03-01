import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext();

export const useAuth=()=>useContext(AuthContext);

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,token:null,isLoggedIn:false,isLoading:true
    })

        useEffect(()=>{

            const validateToken=async(token)=>{
                try{
                let res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/validate`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                })
                let data=await res.json();
                if(res.ok){
                    return data.valid;
                }
                else return false;
            }
            catch(err){
                return false;
                }
            }

            const fetchToken=async()=>{
            try{
                let token=localStorage.getItem("token");
                let user=JSON.parse(localStorage.getItem("user"));
                if(token && user){
                    let valid=await validateToken(token);
                    if(valid)
                    setAuth({token:token,user:user,isLoggedIn:true,isLoading:false});
                    else{
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setAuth({token:null,user:null,isLoggedIn:false,isLoading:false});
                    }
                }
                else{
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setAuth({token:null,user:null,isLoggedIn:false,isLoading:false});
                }
            }
            catch(err){
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setAuth({token:null,user:null,isLoggedIn:false,isLoading:false});
            }
            
        }
        fetchToken()
        },[])

        const login=(user,token)=>{
            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("token",token);
            setAuth({token:token,user:user,isLoggedIn:true,isLoading:false});
        }

        const logout=()=>{
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setAuth({token:null,user:null,isLoggedIn:false,isLoading:false});
        }

        return (
            <AuthContext.Provider value={{auth,login,logout}}>
                {children}
            </AuthContext.Provider>
            
        )

}

export default AuthProvider;