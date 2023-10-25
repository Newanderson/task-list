import { useState } from "react";
import './home.css'

import { Link } from "react-router-dom";
import { auth } from '../../firebaseconect'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'



function Home () {


  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')




  const navigate = useNavigate();

   async function handelogin(e){
    e.preventDefault();

    if( email !== '' && senha !== ''){

     await signInWithEmailAndPassword(auth, email , senha)
     .then(()=>{
      //navegar para /adim
     
      navigate('/adim', {replace:true})

     })

     .catch(()=>{
      console.log("erro ao fazer login")
     })
   
   
    } else {
      alert("Preencha todos os campos!")
    }
    
    
  }


  



    return (
     
      <div className="home-cont" onSubmit={handelogin}> 
        <h1>Lista de Tarefas</h1>
        <span>Gerencie sua agenda de forma facil.</span>

        <form className="formu">
          <input type="text" placeholder="Digite seu email" 
          value={email}  onChange={(e)=> setEmail(e.target.value )}/>

          <input type="password" 
          placeholder="********"
          value={senha}  onChange={(e)=> setSenha(e.target.value )}/>

          <button type="submit"> Acessar </button>

        </form>

       <Link to="/register" className="regist"> Não possui uma conta ? Cadastre-se </Link>




      </div>
      
    );
  } 
  
  export default Home;