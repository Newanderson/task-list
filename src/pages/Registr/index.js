import { useState } from "react";
import {  Link } from "react-router-dom";
import { auth} from '../../firebaseconect' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function Register() {


  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate();

  async function handeRegist(e){
    e.preventDefault();

    if(email !== '' && senha !== ''){
     await createUserWithEmailAndPassword(auth, email, senha)
     .then(()=>{
       navigate('/adim',{replace:true})
     })

     .catch(()=>{
      
      console.log("ËRRO AO FAZER CADASTRO")

     })





    }else{
      alert("Preencha todos os campos!")
    }
    
    
  }


  



    return (
      <div className="home-cont" onSubmit={handeRegist}> 
        <h1>Cadastre-se</h1>
        <span>Vamos criar sua conta! </span>

        <form className="formu">
          <input type="text" placeholder="Digite seu email..." 
          value={email}  onChange={(e)=> setEmail(e.target.value )}/>

          <input type="password" placeholder="**********" 
          value={senha}  onChange={(e)=> setSenha(e.target.value )}/>

          <button type="submit"> Cadastrar </button>

        </form>

       <Link to="/" className="regist"> Já possui uma conta ? Faça o login!  </Link>




      </div>
    );
  } 
  
  export default Register;