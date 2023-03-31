import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
 import Imgperfil from '../../assets/img/curriculum.png'  
 import ImgMenu from '../../assets/img/menu.png'  
 import {useNavigate} from 'react-router-dom';
 import  '../../assets/css/home.css';


function HeaderHome(){
  
  let navigate = useNavigate();

    const getCorreo = localStorage.getItem("correo");
    
    const handleClick =()=>{
        localStorage.clear();
        window.location.reload();
        navigate('/', {replace:true});
    }
    return(
        <header class="nombre-sitio contenedor__header-home"> 
        <div class="navegacion-barra">
            <h1>BEAUTY <span>BLENDS</span> </h1>
               
            <input type="checkbox"  id="menu" class="inputcheck"/>
            <nav class="navegacion-home navegacion-visible">
                    <a class="link" href="#">Progamar </a>
                    <a class="link" href="#">Cancelar </a>
                    <a class="link" href="#">ver historial</a>
                    
                </nav>
          <label class="nav-toggle" for="menu">
          <img className="imgToggle" src={ImgMenu} alt="Imagen de perfil"/>

            </label>
            
        </div>
        <div class="perfil">
            <span class="nombre-usuario">Hola, {getCorreo}</span>
            <img src={Imgperfil} alt="Imagen de perfil"/>
            <div class="menu-perfil">
              <ul>
                <li><a href="#">Editar perfil</a></li>
                <button className="boton__salir-home" onClick={handleClick}>Salir</button>
              </ul>
            </div>
          </div>
          
    </header>
        
    )
}

export default HeaderHome;