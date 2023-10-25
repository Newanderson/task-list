
import { useState, useEffect } from "react";
import { auth } from '../firebaseconect'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

//componete de proteção do cliente.
//Saber se usuario esta logado.


function Privete({ children }){

    const [ loading, setLoading ] = useState(true);
    const [ signed, setSigned ] = useState(false);
    
    useEffect(() => {

        async function checklogin(){
            const unsub = onAuthStateChanged(auth,(user)=>{
               //se tem usuario loagado
                if(user){
                    const userData = {
                        uid:user.uid,
                        email:user.email,

                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false);
                    setSigned(true);

                }else{
               //nao possui usuario logado
               setLoading(false);
               setSigned(false);
                }
                
            })

        }
        checklogin();

    },[])
    
    if(loading){
        return(
            <div></div>
             )
    }
     
     if(!signed){
           return(
            <Navigate to="/"/>
           )
            }
   
   





    return children;
  
}

export default Privete;

