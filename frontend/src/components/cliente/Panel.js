import React, { Fragment , useEffect} from "react";
import  { useState } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
 import {Navigate,useNavigate,useLocation} from 'react-router-dom';
//  CSS
 import  '../../assets/css/panelUsuario.css';
// imagenes
import panelU1 from '../../assets/img/panelU1.png' 
import panelU2 from '../../assets/img/panelU2.png' 
import panelU3 from '../../assets/img/panelU3.png' 
import curriculum from '../../assets/img/curriculum.png' 
import logo from '../../assets/img/unnamed.png' 


function PanelUsuario(){
  //menu resposive
  const [btnState, setBtnState] = useState(false);

    let navigate = useNavigate();


    // Sesiones
    const location = useLocation();
    const  user  = location.state;
    console.log(user)

    // if(!user){
    //     return <Navigate to="/"/>
    // }else if(user.user.id_correo === ''){
    //   return <Navigate to="/"/>
    // }
    // let id_correo = user.user.id_correo;
    // console.log(id_correo)
    // let rol  = user.user.rol;
    // console.log(rol)
    // if(rol!=="P"){
    //   return <Navigate to="/"/>

    // }
    //


    //logout

    const handleClick = () => {
        // id_correo = null;
        // rol = null;
        // console.log(id_correo); // Imprime 'null'
        // if(!id_correo){
        //     navigate('/', {replace:true});
        // }
    }
    //Perfil
    const handlePerfil = () => {
        // console.log(id_correo)

        // navigate('/perfil/'+id_correo, { state: {user:{id_correo:id_correo,rol:rol}} });

    }
    const handleContraseña = () =>{

        // navigate('/contraseña/'+id_correo, { state: {user:{id_correo:id_correo,rol:rol}} });

    }

    //Responsive menu toggle
    const toggle = ()=>{
      setBtnState(btnState => !btnState);


      
    }
    let toggleClassCheck = btnState ? 'active-menu-usuario': null;
    let toggleClassCheckArrow = btnState ? 'active-arrow': null;
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
        <section className={`desarrollo-home ${toggleClassCheck}`}>
          <div class="content-inicio-desarrollo">

        <div class="titulo-centrado">
          <h2>¿Qué quieres hacer?</h2>
        </div>

        

        <div class="container__cards">
          <div class="card">
              <div class="cover">
                <img src={panelU1}alt=""/>
                <div class="img__back"></div>
              </div>
              <div class="description">
                <h2>Programa tu cita</h2>
                <p>Aquí podrás programar una cita con el especialista que desees y a la hora que quieras.</p>
                <input type="button" value="Reserva Aquí"/>
              </div>
            </div>
            
            <div class="card">
              <div class="cover">
              <img src={panelU2}alt=""/>
                  <div class="img__back"></div>
              </div>
              <div class="description">
                <h2>Cancelar cita</h2>
                <p>Aquí podrás cancelar las citas que desees, recuerda que tienes que cancelar con 3h de anticipación.</p>
                <input type="button" value="Cancelar"/>
              </div>
            </div>
  
            <div class="card">
              <div class="cover">
              <img src={panelU3}alt=""/>
                <div class="img__back"></div>
              </div>
              <div class="description">
                <h2>Ver historial de citas</h2>
                <p>Podrás consultar fácilmente todas tus citas anteriores y encontrar la información que necesitas.</p>
                  <input type="button" value="Ver"/>
                </div>
              </div>
              
            </div>
          </div>
        </section>
</div>





{/* 


                        <h1>usuario</h1>
                        <h1>CLIENTE</h1>

                        <li><button className="boton__salir-home" style={{color:"red"}} onClick={handlePerfil}>Mi Perfil</button></li>
                        <li><button className="boton__salir-home" style={{color:"red"}} onClick={handleClick}>Cerrar Sesión</button></li>
              
           
         */}
        </Fragment>
    )
}

export default PanelUsuario;