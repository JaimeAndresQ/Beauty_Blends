
import React, {useEffect, useState, Fragment} from 'react';

//importar cliente Axios
import clienteAxios from '../../config/axios';


function citas(){

    const[citas,guardarCitas] = useState([]);


    const consultarApi = async () =>{
        const citasConsulta = await clienteAxios.get('/citas');

        guardarCitas(citasConsulta.data);// y lo guarda en citas
    }


    useEffect(()=>{
        consultarApi();
    }, []);
    return(
        <Fragment>
            <h2>Citas</h2>
            <ul className='ListadoCitas'>
                {clienteAxios.map(cita =>{
                    console.log(cita)
                })}
            </ul>
        </Fragment>
    )


}

export default citas;