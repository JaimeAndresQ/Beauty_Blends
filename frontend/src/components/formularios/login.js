import React, { Fragment, useState } from "react";
import {useForm} from "../../hooks/useForm"
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import  '../../assets/css/style.css';
import logo from '../../assets/img/Logo.png'  



const initialForm = {
    contrasenia:"",
    id_correo:""
};

const validationsForm = (form) =>{
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    let errors = {}
    
    if(!form.id_correo.trim()){
        errors.id_correo = "El campo 'Email' es requerido";
    }else if(!regexEmail.test(form.id_correo.trim())){
        errors.id_correo = "El campo 'Email'  no tiene un formato valido"
    }else if(!form.contrasenia.trim()){
        errors.contrasenia = "El campo 'contraseña' es requerido";
    }
    return errors
}

function  Login (){



    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    } = useForm(initialForm, validationsForm);


    
        return(

            <Fragment>

           


            <div class="contenedor">

                <div class="imagen">
                    
            </div>


            <main class="formulario Contenedor-nombre">
            <div class="logo">
                <img src={logo} />
            </div>
                <legend class="legent-nombre">Iniciar Sesión</legend>       
            <form onSubmit={handleSubmit} className="formulario-inicar-sesion">

            <div className="campo camp">
                <input  onBlur={handleBlur} onChange={handleChange} name="id_correo" type="email" className="input input-correo" id="correo" value={form.id_correo} required/>
                <label className="form__label" for="correo">Correo electronico</label>
            </div>
            {errors.id_correo && <p style={{ margin: "0" , padding:"0", color: "red", lineHeight:"0.5"}}>{errors.id_correo}</p>}

            <div className="campo camp">
                <input onBlur={handleBlur} onChange={handleChange} name="contrasenia" type="password" className="input input-password" id="contrasenia" value={form.contrasenia} required/>
                <label className="form__label" for="contrasenia">Contraseña</label>
            </div>
            {errors.contrasenia && <p style={{ margin: "0" , padding:"0" , color: "red" ,lineHeight:"0.5"}}>{errors.contrasenia}</p>}

            <input onClick={handleSubmit} className="boton-iniciar-sesion " type="submit" id="button-iniciar" value="INICIAR SESIÓN"/>  
            <div className="formulario__input--a campo">
                <a className="formulario__input--link" href="#">¿Has olvidado tu contraseña?</a>
            </div>
        </form>
        </main>           
        </div>
                   
               
            </Fragment>
    )
    }

    



export default Login;