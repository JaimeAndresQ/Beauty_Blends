import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://25.0.53.159:3000/api'
});

export default clienteAxios;