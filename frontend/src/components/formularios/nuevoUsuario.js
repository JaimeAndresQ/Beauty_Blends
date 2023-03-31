
import React, {Fragment, useState} from "react";
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import clienteAxios from '../../config/axios';

import imgInicio from '../../assets/img/undraw_sign__up_nm4k.png'



function NuevoUsuario(){
    
    let navigate = useNavigate();
    const[usuario,guardarUsuario] = useState({
        id_correo:'',
        contrasenia: '',
        id_paciente:'',
        nombres: '',
        apellido_paterno:'',
        apellido_materno:'',
        telefono:'',
        fecha_nacimiento:'',
        genero: ''
    })


    //leer datos del formulario

    const actualizarState = e =>{
        //almacenar lo que el usuario escribe
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
        console.log(usuario);
    }
    //Saber si el checkbox se activo o no
    
    const [terminosAceptados, setTerminosAceptados] = useState(false);

    const checkboxchecked = e => {
    // almacenar la variable de terminos
    setTerminosAceptados(e.target.checked);
    };

    // Validar los campos del formulario 
    const validarUsuario = ()=>{
        const terminos = terminosAceptados;
        const {id_correo, contrasenia, id_paciente,nombres,apellido_paterno, apellido_materno, telefono, fecha_nacimiento, genero} = usuario;

        //revisar que las propiedades tengan contenido

        let valido = ! id_correo.length || !contrasenia.length || !id_paciente.length || !nombres.length || !apellido_materno.length || !apellido_paterno.length || !telefono.length || !genero.length || !terminos;
        
        return valido;
    }

    const nuevoUsuario = e =>{
        
        e.preventDefault();
        clienteAxios.post('/users', usuario)
        .then(res=>{
                console.log('usuario creado')
                console.log(res.data.msg)
                Swal.fire(
                    'Bienvenido',
                    res.data.msg,
                    'success'
                )
                navigate('/', {replace:true});
            
            
           
            
        });
    }


    




    return(
        <Fragment>

        <main className="formulario Contenedor-nombre-registro">
        <fieldset>
            <legend className="legent-nombre">Registrarse</legend>
            
            <div className="contenido-registro">
   

    <form onSubmit={nuevoUsuario} 
    className="formulario-registro" action="">

    <div className="flex1">

        <div className="contenedor-flex-registro">
            
                        <div className="campoflex-registro">
                    
                    
                    <div className="campo-registro">
                            <select    onChange={actualizarState} className="input-registro input-tipoid-registro" name="genero" id="">

                                <option disabled selected >Genero</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>

                                <div className="div-flex-registro">

                                    <input onChange={actualizarState} name="id_paciente" type="text" id="cedula" className="input-registro input-cedula-registro" />
                                    <label className="form__label-registro label__Cedula-registro" for="cedula">Cedula</label>

                                </div>
                            

                    </div>
                    
                            
                    <div className="campo-registro camp-registro">
                        <input onChange={actualizarState}  type="text" name="nombres" className="input-registro" id="nombres"/>
                        <label className="form__label-registro" for="nombres">Nombres</label>
                    </div>
                    <div className="campo-registro camp-registro">
                        <input onChange={actualizarState}  type="text" name="apellido_paterno" className="input-registro" id="apellidoPaterno" />
                        <label className="form__label-registro" for="apellidoPaterno">Apellido Paterno</label>
                    </div>
                    <div className="campo-registro camp-registro">
                        <input onChange={actualizarState}  type="text" name="apellido_materno" className="input-registro" id="apellidoMaterno"/>
                        <label className="form__label-registro" for="apellidoMaterno">Apellido Materno</label>
                    </div>
                    
                    </div>
                    
                    
                    <div className="campoflex-registro">
                        
                        <div className="campo-registro camp-registro">
                    <input onChange={actualizarState} type="email"  name="id_correo" className="input-registro" id="email"/>
                    <label className="form__label-registro"  for="email" >Correo Electronico</label>
                    </div>
                    <div className="campo-registro camp-registro">
                        <input onChange={actualizarState} name="contrasenia" type="password" className="input-registro" id="contraseña"/>
                        <label className="form__label-registro" for="contraseña">Contraseña</label>
                    </div>
                    
                    <div className="campo-registro camp-registro">
                        <input onChange={actualizarState} name="telefono" type="tel" className="input-registro" id="telefono"/>
                        <label className="form__label-registro" for="telefono">telefono</label>
                    </div>
                    
                    <div className="campo-registro camp-registro">
                        <input onChange={actualizarState}  type="date" name="fecha_nacimiento" className="input-registro" id="fechaNacimiento" />
                        <label className="form__label-registro" for="fechaNacimiento">Fecha de nacimiento</label>
                        </div>
                    
                        </div>
                    </div>
                    <div className="terminos-div">

                    <input name="terminos"onChange={checkboxchecked} type="checkbox" value={terminosAceptados} />

                            <a className="terminos" href="/">
                            Acepto los Términos del servicio y la Política de privacidad de datos personales
                            </a>
                    </div >
                   
                    <div className="div-boton-registro">
                        
                        <button disabled={validarUsuario()}   className="boton-registro" type="submit" id="button-iniciar" >Registrarse</button>  
                        
                    </div>
    </div>    
</form>
                           
<img className="imagen-registro" src={imgInicio} alt=""/>
                    
                                    
                    </div>
                    
                        
                    
                
                
            
        
                
            </fieldset>
            
        </main>
        </Fragment>
)
}

export default NuevoUsuario;