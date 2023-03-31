


import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
 import  '../../assets/css/home.css';
 import mujer from '../../assets/img/beautiful-girl-with-beautiful-makeup-youth-skin-care-concept-removebg.png' 
  


function PanelUsuario(){
    
    let navigate = useNavigate();

    //usar navigate para redireccionar
    //Resive el usuario de la pagina que fue redireccionado
    const location = useLocation();
    const  user  = location.state;
    console.log(user)
    if(!user){
        return <Navigate to="/"/>
    }
    let id_correo = user.user.id_correo;
    console.log(id_correo)
    const rol  = user.user.rol;

    //logout

    const handleClick = () => {
        id_correo = null;
        console.log(id_correo); // Imprime 'null'
        if(!id_correo){
            navigate('/', {replace:true});
        }
    }
    const handlePerfil = () => {
        console.log(id_correo)

        navigate('/perfilUSuario/'+ id_correo, { state: {user} });
        
    }

   
    return(
        <Fragment>
                        <h1>usuario</h1>
                        <li><button className="boton__salir-home" style={{color:"red"}} onClick={handlePerfil}>Mi Perfil</button></li>
                        <li><button className="boton__salir-home" style={{color:"red"}} onClick={handleClick}>Cerrar Sesión</button></li>
              
           
        
        </Fragment>
    )
}

export default PanelUsuario;