import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
import { setCookie} from 'nookies'

export const registration = async (name: string, email: string, password: string) => {
   const {data} = await $host.post('api/user/registration', {name, email, password, role: 'USER'})
   setCookie(null, 'token', data.token, {
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
   return jwt_decode(data.token)
}

export const login = async (email: string, password: string) => {
   const {data} = await $host.post('api/user/login', {email, password})
   setCookie(null, 'token', data.token, {
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
   return jwt_decode(data.token)
}

export const check = async () => {
   const {data} = await $authHost.get('api/user/auth')
   setCookie(null, 'token', data.token, {
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })
   return jwt_decode(data.token)
}