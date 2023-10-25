import { bd , auth } from './firebaseconect'
import './index.css'
import RoutesApp from './routes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <RoutesApp/>



    
    </BrowserRouter>
  );
}

export default App;
