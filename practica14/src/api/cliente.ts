// cliente.ts — la ÚNICA instancia de Axios de toda la tienda.
// Aquí viven la dirección de la API y el tiempo límite; ningún componente importa Axios.
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000, // si la API no responde en 5 s, la petición falla con un error de tiempo
})
