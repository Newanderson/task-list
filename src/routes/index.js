import { Routes , Route} from 'react-router-dom' ;
import Home from '../pages/Home';
import Registr from '../pages/Registr';
import Adim from '../pages/Adim';

import Privete from './Privete';


function RoutesApp(){
    return(
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/register' element={<Registr/>}/> 

           <Route path='/adim' element={ <Privete> <Adim/>  </Privete> }/>
        </Routes>
    )
}

export default RoutesApp;