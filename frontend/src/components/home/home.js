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

//  Imagenes
 import mujer from '../../assets/img/beautiful-girl-with-beautiful-makeup-youth-skin-care-concept-removebg.png' 
 import terapia from '../../assets/img/terapia-fisica.png' 
 import entrenador from '../../assets/img/entrenador.png' 
 import facial from '../../assets/img/facial.png' 
 import usuario from '../../assets/img/usuario.png' 
  


function Home(){
    
    let navigate = useNavigate();

    
    const handleSesion = () => {
        navigate('/login');
        
    }

   
    return(
        <Fragment>
            <section class="inicio-home">
        <header class="nombre-sitio-home contenedor__header-home">
            <div class="navegacion-barra-home">
                <h1>BEAUTY BLENDS <span>Expertos en recuperación corporal</span></h1>
                <nav class="navegacion_li-home" style={{cursor:"pointer"}}>
                    <ul>
                        <li onClick={handleSesion}>Iniciar Sesión</li>
                        <li>Contáctanos</li>
                    </ul>
                </nav>
            </div>
        </header>
        <div class="contenedor-imagen-home">
            <img src={mujer} alt="" class="imagen-home"/>
        </div>
        <div class="contenedor__servicios-home">
            <div class="aro aro-izquierdo"></div>
            <div class="aro aro-derecho">
                <div class="enunciado">
                    <h2> <span> Nuestros</span> servicios</h2>
                    <p>"Un lugar para renovarte por dentro y por fuera.</p>
                    <p>En Beauty Blends, no solo tratamos tu cuerpo.</p>
                    <p>Te brindamos una experiencia de bienestar completa."</p>
                    <button class="boton-ver-mas-home" type="button" id="button-iniciar">VER MÁS</button>  
                </div>
            </div>
        </div>
    </section>
    <section class="servicios background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        <h2> Nuestros Servicios</h2>
        <div class="contenedor-servicios">
            <div class="servicio">
                <div class="servicio-imagen">
                    <img src={terapia} alt="Fisioterapia"/>
                </div>
                <h3>Fisioterapia</h3>
                <p>La fisioterapia es un servicio especializado que se enfoca en la prevención, diagnóstico y tratamiento de lesiones o afecciones físicas mediante técnicas manuales, ejercicios y terapias físicas.</p>
            </div>
            <div class="servicio">
                <div class="servicio-imagen">
                    <img src={entrenador} alt="Gimnasio"/>
                </div>
                <h3>Gimnasio</h3>
                <p>Un gimnasio es un lugar diseñado para realizar ejercicios físicos y entrenamiento muscular, con el fin de mejorar la salud, el estado físico y la estética.</p>
            </div>
            <div class="servicio">
                <div class="servicio-imagen">
                    <img src={facial} alt="Spa"/>
                </div>
                <h3>Spa</h3>
                <p>Un spa es un lugar donde puedes relajarte y rejuvenecer tanto tu cuerpo como tu mente. Ofrece una variedad de tratamientos y servicios, como masajes, etc.</p>
            </div>
        </div>
    
    </section>
    <section class="nuestras-historias banner">
        <div class="banner-content">
          <h2>Nuestras Historias</h2>
          <div class="contenedor-historias">
            <div class="historia">
              <p>Jose, un atleta experimentado, se lesionó mientras entrenaba para una carrera. Después de visitar a varios , decidió probar la fisioterapia. Después  de algunas sesiones con un fisioterapeuta profesional, se   sintió mucho mejor y pudo volver a entrenar de manera segura.</p>
              <div class="historia-imagen">
                <img src={usuario} alt="Icono 1" class="icono"/>
              </div>
              <div class="historia-detalle">
                <h3>Jose Perez </h3>
                <p>Paciente</p>
              </div>
            </div>
            <div class="historia">
                <p>Jorge, un joven entusiasta del fitness, se unió a un gimnasio  local para ponerse en forma y ganar músculo. Con la ayuda de un entrenador personal y un plan de entrenamiento personalizado,pudo alcanzar sus objetivos de forma rápida y eficiente. Ahora,  Jorge es un miembro dedicado del gimnasio y se siente en su mejor momento.</p>

              <div class="historia-imagen">
                <img src={usuario} alt="Icono 2" class="icono"/>
              </div>
              <div class="historia-detalle">
                <h3>Jorge Pinilla </h3>
                <p>Paciente</p>
              </div>
            </div>
            <div class="historia">
                <p>Después de semanas de estrés en el trabajo, Breyner decidió tomarse un día para relajarse en un spa. Con una variedad de tratamientos de belleza y masajes relajantes, se sintió completamente rejuvenecida  y listo para enfrentar los desafíos que la esperaban en el trabajo.  Ahora, Breyner hace una visita regular al spa para mantenerse equilibrado</p> 
              <div class="historia-imagen">
                <img src={usuario} alt="Icono 3" class="icono"/>
              </div>
              <div class="historia-detalle">
                <h3>Breyner Ropero </h3>
                <p>Paciente</p>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section class="Nuestra-ubicacion">
        <h2> Nuestra Ubicación</h2>
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.9895593736305!2d-73.1260387852936!3d7.127203294853383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e68157b4f69e4d7%3A0x382b2a360974997e!2sCl.%2022%2C%20Comuna%204%20Occidental%2C%20Bucaramanga%2C%20Santander!5e0!3m2!1ses-419!2sco!4v1679198297428!5m2!1ses-419!2sco"
        style={{ border: 0 }}
        allowFullScreen
        
      />
      </section>
      <footer class="site-footer">
        <div class="grid-footer contenedor">
            <div>
                <h3>Contacto</h3>
                <nav class="footer-menu">
                    <a href="#">+57 3118546974</a>
                    <a href="#">Beauty@gmail.com</a>
                    <a href="#">+57 8456214</a>
                    <a href="#">Cl. 22, Comuna 4 Occidental, Bucaramanga, Santander</a>
                </nav>
            </div>
            <div>
                <h3>Servicios</h3>
                <nav class="footer-menu">
                    <a href="#">Fisioterapia</a>
                    <a href="#">Gimnasio</a>
                    <a href="#">Spa</a>
                </nav>
            </div>
            <div>
                <h3>Tecnologia</h3>
                <nav class="footer-menu">
                    <a href="#">Equipos de alta calidad</a>
                    <a href="#">Politica y privacidad</a>
                </nav>
            </div>
        </div>
        <p class="derechos">Todos los derechos reservados</p>
    </footer>
        </Fragment>
    )
}

export default Home;
