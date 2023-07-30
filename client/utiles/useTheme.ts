import { useLayoutEffect, useState } from "react"
import { parseCookies, setCookie } from 'nookies'

export const useTheme = () => {
   const [theme, setTheme] = useState(parseCookies().dataTheme || 'light')

   useLayoutEffect(() => {
      document.documentElement.setAttribute('data-theme', theme)  
      setCookie(null, 'dataTheme', theme, {
         maxAge: 24 * 24 * 60 * 60,
         path: '/',
      })
   }, [theme])
   return {theme, setTheme}
}