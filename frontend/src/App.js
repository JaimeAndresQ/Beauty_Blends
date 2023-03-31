import React, {Fragment} from "react";

//layouts
import Login  from "./components/formularios/login";
import Home from './components/home/home';
import Perfil from './components/cliente/Perfil';
import PanelAdmin from "./components/usuarios/PanelAdmin";
import PanelUsuario from "./components/cliente/Panel";
import AdminAProfesional from "./components/usuarios/AdminAProfesional";

// Router
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
   

function App(){
  

  return(
    
<BrowserRouter>
    
      <Routes>
              
            <Route index element={<><Home/></>} />
            <Route path="login" element={<><Login/></>} />  


            {/* ADMIN */}
                  <Route path="/panelAdmin" element={<><PanelAdmin/></>} /> 
                  <Route path="/nuevoProfesional" element={<><AdminAProfesional/></>} />   

            {/* CLIENTE */}
            <Route path="/panel" element={<><PanelUsuario/></>} />   
            <Route path="/perfil" element={<><Perfil/></>} />   
                  
           
            
            <Route path="*" element={<>
            <section>
              Pagina no existe
            </section></>}/>
      
      </Routes>

</BrowserRouter>
  )
}
export default App;
