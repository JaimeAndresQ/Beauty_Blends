import {useState} from "react"
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

import clienteAxios from  '../config/axios';

export const useForm = (initialForm, validateForm) =>{

//usar navigate para redireccionar
let navigate = useNavigate();


    const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({});
    const[loading,setLoading] = useState(false);
    const[response,setResponse] = useState(null);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
      
       
    } 
    
    const handleBlur = (e) =>{
       handleChange(e);
       setErrors(validateForm(form));

    };
    
    const handleSubmit = (e) =>{
        setErrors(validateForm(form));
        e.preventDefault();
        
        
        if(Object.keys(errors).length === 0){
            
            clienteAxios.post('http://25.0.53.159:3000/api/users/login',form)
            .then(({data})=>{
               console.log(data.msg)
                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido De Vuelta!',
                    text: form.id_correo,
                    confirmButtonText: 'Ingresar'
                  });
                   
                    if(data.rol ==="P"){

                        navigate('/panel', { state: {user:{id_correo:form.id_correo,rol:data.rol}} });
                    }else if(data.rol ==="E"){
                        navigate('/panel', { state: {user:{id_correo:form.id_correo,rol:data.rol}} });
                        
                    }else if(data.rol ==="M"){
                        navigate('/panel', { state: {user:{id_correo:form.id_correo,rol:data.rol}} });
                    }
                    
                //   navigate('/panelUsuario', { state: {user:{id_correo:form.id_correo,rol:0}} });
                    
            }).catch(({response})=>{

                if(response.status === 400){

                    Swal.fire({
                        icon: 'error',
                        title: '¡Error!',
                        text: response.data.msg,
                        confirmButtonText: 'Entendido'
                      });
                }
            })
        
        }else{
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Verifica los campos',
                confirmButtonText: 'Aceptar'
              });
        }

    }

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    }

    
} 