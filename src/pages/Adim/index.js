import { useState , useEffect } from 'react';
import './adim.css'
import { auth, bd } from '../../firebaseconect'
import { signOut } from 'firebase/auth'

import {
   addDoc,
   collection,
   onSnapshot,
   query,
   orderBy,
   where,
   doc,
   deleteDoc,
   updateDoc
   
} from 'firebase/firestore'

function Adim(){
     const [tarefas, setTarefas] = useState('');
     const [ user, setUser ] = useState({})
     const [registtarefas, setRegisttarefas ] = useState([]);
     const [edit,setEdit ] = useState({});

     useEffect(()=>{
      async function loadTarefas(){
         const userDetai = localStorage.getItem("@detailUser")
         setUser(JSON.parse(userDetai))
         
         if(userDetai){
         const data = JSON.parse(userDetai);

         const tarefaRef = collection(bd,"tarefas")
         const q = query(tarefaRef, orderBy("created","desc" ),
         where("userUid","==", data?.uid))
         
         const onsub = onSnapshot(q, (snapshot)=>{

            let lista =[];

            snapshot.forEach((doc)=>{
               lista.push({
                  id:doc.id,
                  tarefa:doc.data().tarefa,
                  userUid:doc.data().userUid,
               })

            })
           
            setRegisttarefas(lista);

         })




         }

      }
      loadTarefas(); 
     },[])

    async function Registro(e){
        e.preventDefault();

      if(tarefas === ''){
       alert("Digite sua tarefa") 
       return;
      }

      if(edit?.id){
         atualizarTarefa();
         return;

      }
     
    await addDoc(collection(bd,"tarefas"),{
      tarefa: tarefas,
      created: new Date(),
      userUid: user?.uid,
      })
      .then(()=>{
         console.log("TAREFA REGISTRADA")
         setTarefas('')

      })
      .catch((erro)=>{
       console.log("erro ao registrar tarefa")
      })



     }

     async function logout(){
        await signOut(auth);

     }

     async function deleteTarefas(id){

      const docRef = doc(bd,"tarefas",id)
      await deleteDoc(docRef)
     }

     function editarDelete(item){
      setTarefas(item.tarefa)
      setEdit(item);

     }

     async function atualizarTarefa(){
       
      const docRef = doc(bd,"tarefas", edit?.id)
      await updateDoc(docRef,{
         tarefa: tarefas
      })
      .then(()=>{
         console.log('TAREFA ATUALIZADA')
         setTarefas('')
         setEdit({})

      })
      .catch(()=>{
         console.log('ERRO EM ATUALIZAR')
         setTarefas('')
         setEdit({})
      })

     }





    return(
        <div className='adim-con'>
          <h1>Minhas Tarefas</h1>

          <form onSubmit={Registro} className='formu'>

          
            <textarea 
            className='area'
            placeholder='Digite sua tarefa...'
            value={tarefas}
            onChange={(e)=> setTarefas(e.target.value)}
            
            ></textarea>

           {Object.keys(edit).length > 0 ? (
             <button className='btn-regis' type='submit' style={{background:'#6add39'}}>Atualizar Tarefas</button>
           ) : (
            <button className='btn-regis' type='submit'>Adicionar Tarefas</button>
           )}

         </form>

        {registtarefas.map((item)=> (
          <article key={item.id} className='lista'>

         
         <p>{item.tarefa}</p> 
          <div>
          

          <button onClick={()=> editarDelete(item)} className='btn-editar'>Editar </button>

          <button onClick={()=> deleteTarefas(item.id)} className='btn-concluir'>Concluir</button>

          </div>

          

       </article>
        ))}


        <button className=' btn-sair' onClick={logout}>Sair</button>


      </div>
    )
}


export default Adim;