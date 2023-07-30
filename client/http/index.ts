import axios from "axios";
import { parseCookies} from 'nookies'

const $host = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL
   
})

const $authHost = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL
   
})

const authInterceptor = (config) => {
   const cookies = parseCookies()
   config.headers.authorization = `Bearer ${cookies.token}`
   

   // до куки
   // config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
   return config
}

$authHost.interceptors.request.use(authInterceptor)                  // authInterceptor будет перехватывать запрос и подставлять токен из локалСтора

export {
   $host,
   $authHost
}