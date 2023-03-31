
import React, {Fragment, useState} from "react";
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {Navigate,useNavigate,useLocation,useParams} from 'react-router-dom';



function AdminAProfesional(){
    
    const [initialForm, setInitialForm] = useState({
        nombres: '',
        apellido_paterno:'',
        apellido_materno:'',
        telefono:'',
        especialidad: ''
    })
    const { id } = useParams();


    // const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({})
    //MANEJO DE SESIONES { 
            let navigate = useNavigate();

            //usar navigate para redireccionar
            //Resive el usuario de la pagina que fue redireccionado
            const location = useLocation();
            const  user  = location.state;
            
            if(!user){
            }
            let id_correo = user.user.id_correo;
            const rol  = user.user.rol;
            //logout
            const handleClick = () => {
                id_correo = null;
                console.log(id_correo); // Imprime 'null'
                if(!id_correo){
                    navigate('/', {replace:true});
                }
            }
    //}
    
    //leer datos del formulario
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setInitialForm({
            ...initialForm,
            [name]:value
        })
        console.log(initialForm,'HOLA')
       
    } 

    
    const validationsForm = (initialForm) =>{
        let regexId = /^\d{10}$/;
        let regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        let regexTel = /^[0-9]{1,15}$/;
        const today = new Date().toISOString().slice(0, 10); // Fecha actual en formato ISO (ejemplo: "2023-03-20")

        let errors = {}
    
     if(!initialForm.nombres.trim()){
        errors.nombres = "El campo 'Nombres' es requerido";
    }else if(!regexNombres.test(initialForm.nombres.trim())){
        errors.nombres = "El campo 'Nombres' no es valido"
    }else if(!initialForm.apellido_paterno.trim()){
        errors.apellido_paterno = "El campo 'Apellido Paterno' es requerido"
    }else if(!regexNombres.test(initialForm.apellido_paterno.trim())){
        errors.apellido_paterno = "El apellido que ingresas no es valido"
    }else if(!initialForm.apellido_materno.trim()){
         errors.apellido_materno = "El campo 'Apellido Materno' es requerido"
    }else if(!regexNombres.test(initialForm.apellido_materno.trim())){
         errors.apellido_materno = "El apellido que ingresas no es valido"
    }else if(!initialForm.telefono.trim()){
         errors.telefono = "El campo 'Telefono' es requerido"
    }else if(!regexTel.test(initialForm.telefono.trim())){
        errors.telefono = "El telefono ingresado no es valido"
    }else if(initialForm.especialidad==="") {
        errors.especialidad = "Selecciona una especialidad"
    }
    return errors

    
}

const validateForm = (initialForm) =>{
    let regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    let regexTel = /^[0-9]{1,15}$/;
    const today = new Date().toISOString().slice(0, 10); // Fecha actual en formato ISO (ejemplo: "2023-03-20")
    
    let errors = {}


if(!regexNombres.test(initialForm.nombres.trim())){
        errors.nombres = "El campo 'Nombres' no es valido"
    }
if(!initialForm.nombres.trim()){
    errors.nombres = "El campo 'Nombres' es requerido";
}
if(!regexNombres.test(initialForm.apellido_paterno.trim())){
   errors.apellido_paterno = "El apellido que ingresas no es valido"
}

if(!initialForm.apellido_paterno.trim()){
    errors.apellido_paterno = "El campo 'Apellido Paterno' es requerido"
}

if(!regexNombres.test(initialForm.apellido_materno.trim())){
    errors.apellido_materno = "El apellido que ingresas no es valido"
}
if(!initialForm.apellido_materno.trim()){
     errors.apellido_materno = "El campo 'Apellido Materno' es requerido"
}

if(!regexTel.test(initialForm.telefono.trim())){
   errors.telefono = "El telefono ingresado no es valido"
}
if(!initialForm.telefono.trim()){
     errors.telefono = "El campo 'Telefono' es requerido"
}
if(initialForm.especialidad==="") {
    errors.especialidad = "Selecciona una especialidad"
}
return errors
}

 

const handleBlur = (e) =>{
    handleChange(e);
    //Codigo para validard datos del formulario
    setErrors(validationsForm(initialForm))
   

    };







    const handleSubmit = e =>{
        setErrors(validateForm(initialForm));

        e.preventDefault();
        clienteAxios.post('/users', initialForm)
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

   


            <form onSubmit={handleSubmit}>
                
                            <h1>REGISTRAR Profesional</h1>                                 

                        {/* Nombres */}
                        <input  onChange={handleChange}  onBlur={handleBlur}  type="text" name="nombres"  id="nombres"/>
                        {errors.nombres && <p style={{ margin: "0" , padding:"0", color: "red"}}>{errors.nombres}</p>}

                        {/* apellido Paterno */}
                        <input  onChange={handleChange}  onBlur={handleBlur}  type="text" name="apellido_paterno"  id="apellidoPaterno" />
                        {errors.apellido_paterno && <p style={{ margin: "0" , padding:"0", color: "red"}}>{errors.apellido_paterno}</p>}

                        {/* Apellido materno */}
                        <input  onChange={handleChange}  onBlur={handleBlur}  type="text" name="apellido_materno"  id="apellidoMaterno"/>
                        {errors.apellido_materno && <p style={{ margin: "0" , padding:"0", color: "red"}}>{errors.apellido_materno}</p>}

                        {/* Telefono */}
                        <input  onChange={handleChange}  onBlur={handleBlur} name="telefono" type="tel"  id="telefono"/>
                        {errors.telefono && <p style={{ margin: "0" , padding:"0", color: "red"}}>{errors.telefono}</p>}


                        {/* Especialidad */}

                            <select id="especialidad" onChange={handleChange}  onBlur={handleBlur} className="input-registro input-tipoid-registro" name="especialidad">
                                    <option selected disabled  value="">Especialidad</option>
                                    <option value="M">ENTRENAMIENTO MUSCULAR</option>
                                    <option value="F">APARATOLOGO</option>
                                    <option value="F">FISIOTERAPEUTA</option>
                            </select>
                            {errors.especialidad && <p style={{ margin: "0" , padding:"0", color: "red"}}>{errors.especialidad}</p>}



                            

                    
                            
                   
                      
                       
                   
                      
                     
                       
                    
                  

                   
                        
                        <button onClick={handleSubmit}   className="boton-registro" type="submit" id="button-iniciar" >Registrar</button>  
                        
                           
                    
                        
        
            </form>
        </Fragment>
)
}

export default AdminAProfesional;