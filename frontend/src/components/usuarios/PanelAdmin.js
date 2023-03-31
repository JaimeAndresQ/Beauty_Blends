


import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
import panelU1 from '../../assets/img/panelAu1.png' 
import panelU2 from '../../assets/img/panelAU2.png' 
import panelU3 from '../../assets/img/panelU3.png' 
import logo from '../../assets/img/unnamed.png' 
import  '../../assets/css/panelAdmin.css';


function PanelAdmin(){
    
    let navigate = useNavigate();

    // //usar navigate para redireccionar
    // //Resive el usuario de la pagina que fue redireccionado
    // const location = useLocation();
    // const  user  = location.state;
    // console.log(user)
    // if(!user){
    // }
    // let id_correo = user.user.id_correo;
    // console.log(id_correo)
    // const rol  = user.user.rol;

    //logout

    // const handleClick = () => {
    //     id_correo = null;
    //     console.log(id_correo); // Imprime 'null'
    //     if(!id_correo){
    //         navigate('/', {replace:true});
    //     }
    // }
 
    // const handleAgregarMedico = () => {
    //     console.log(id_correo)

    //     navigate('/nuevoProfesional/', { state: {user} });
        
    // }

   
    return(
        <Fragment>
            

<div className="inicio-usuario-contenedor" > 
  <div class="navegacion-barra-inicio-usuario nombre-sitio-inicio-usuario">
  <img class="logo-panel" src={logo}alt=""/>
      <nav class="navegacion-inicio-usuario">
      <ul>
        <p> Perfil </p>
        <li><a href="#"><i class="fa-solid fa-house-user"></i>Home</a></li>
        <li><a href="#"><i class="fa-solid fa-pen"></i>Editar perfil</a></li>
        <p> Citas </p>
        <li><a href="#"><i class="fa-regular fa-calendar-plus"></i>Programa una cita</a></li>
        <li><a href="#"><i class="fa-solid fa-xmark"></i>Cancelar cita</a></li>
        <li><a href="#"><i class="fa-regular fa-calendar"></i>Ver historial de citas</a></li>
        <p> Salir </p>
        <li><a href="#"><i class="fa-solid fa-right-from-bracket"></i>Log Out</a></li>
      </ul>
     </nav>
  </div>
        <section className={`desarrollo-home `}>
          <div class="content-inicio-desarrollo">

        <div class="titulo-centrado">
          <h2>¿Qué quieres hacer?</h2>
        </div>
    <div class="container__cards">
          <div class="card">
              <div class="cover">
                <img src={panelU1} alt=""/>
                <div class="img__back_admin"></div>
              </div>
              <div class="description">
                <h2>Agregar medicos</h2>
                <p> Podras agregar nuevos médicos a nuestra base de datos para ampliar nuestra lista de especialistas.</p>
                <input type="button" value="Agregar"/>
              </div>
            </div>
            
            <div class="card">
              <div class="cover">
              <img  src={panelU2} alt=""/>
                  <div class="img__back_admin"></div>
              </div>
              <div class="description">
                <h2>Agregar citas</h2>
                <p>Aquí podrás agregar las citas y horarios que le corresponden a cada medico.</p>
                <input type="button" value="Agregar"/>
              </div>
            </div>
  
            <div class="card">
              <div class="cover">
              <img  src={panelU3} alt=""/>
                <div class="img__back_admin"></div>
              </div>
              <div class="description">
                <h2>Ver citas disponibles</h2>
                <p>Podrás consultar fácilmente todas tus citas disponibles y encontrar la información que necesitas.</p>
                  <input type="button" value="Ver"/>
                </div>
              </div>
              </div>
              </div>
              </section>
              </div>

                        <h1>ADMINISTRADOR</h1>
                        <li><button className="boton__salir-home" style={{color:"red"}} >Cerrar Sesión</button></li>
                        <li><button className="boton__salir-home" style={{color:"red"}} >Agregar Profesional</button></li>
              
           
        
        </Fragment>
    )
}

export default PanelAdmin;