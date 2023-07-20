// React
import { FC, use, useEffect, useLayoutEffect, useState } from 'react';

// Next
import Link from 'next/link';
import Burger from './Burger';
import { useRouter } from 'next/router'

// Стили
import styles from '../styles/Header.module.scss';

// Логика
import { check, login, registration } from '../http/userApi';
import LoginPopup from './LoginPopup';
import RegistrationPopup from './RegistrationPopup';
import { setUser } from '../slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { GetServerSideProps } from 'next';
import { wrapper } from '../store/store';
import { $authHost } from '../http';
import jwt_decode from "jwt-decode";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { IUser } from '../types/user';
import { ICheckUser } from '../types/checkUser';
import { useTheme } from '../utiles/useTheme';



interface HeaderProps {
   user: ICheckUser
}



const Header: FC<HeaderProps> = ({}) => {
   const router = useRouter()
   const dispatch = useAppDispatch()
   const user = useAppSelector(state => state.user.oneUser)
   const [infoOpen, setInfoOpen] = useState<boolean>(false)
   const [settingsOpen, setSettingsOpen] = useState<boolean>(false)
   const [isAuth, setIsAuth] = useState<boolean>(false)
   const [isAdmin, setIsAdmin] = useState<boolean>(false)
   const [openLogIn, setOpenLogIn] = useState(false);
   const [openRegistration, setOpenRegistration] = useState(false);
   const { theme, setTheme } = useTheme()
   

   useLayoutEffect(() => {
      if (user?.role === 'ADMIN') {
         setIsAdmin(true)
      }
      if (user?.role) {
         setIsAuth(true)
      }
   }, [])


   const colorChangerHandler = () => {
      if (theme === 'light') {
         setTheme('dark')
      } else {
         setTheme('light')
      }
   }


   const singIn = async (email:string, password:string) => {
      try {
         let data: any;
         data = await login(email, password)
         if (data.role === 'ADMIN') {
            setIsAdmin(true)
         }
         dispatch(setUser(data))
         setIsAuth(true)
         setOpenLogIn(false);
      } catch (e) {
         alert(e.response.data.message)
      }
   }

   const regIn = async (name:string, email:string, password:string) => {
      try {
         let data: any;
         data = await registration(name, email, password)
         if (data.role === 'ADMIN') {
            setIsAdmin(true)
         }
         dispatch(setUser(data))
         setIsAuth(true)
         setOpenRegistration(false)
      } catch (e) {
         alert(e.response.data.message)
      }
   }
  
   const singOut = () => {
      setIsAdmin(false)
      setIsAuth(false)
      destroyCookie(null, 'token')
   }

   const onMouseEnterHandler = (e: React.MouseEvent<HTMLDivElement>, info: string) => {
      switch (info) {
         case 'info':
            setInfoOpen(true);
            break;
         case 'settings':
            setSettingsOpen(true);
            break;
      }

   }
   const onMouseLeaveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      setInfoOpen(false);
      setSettingsOpen(false);
   }



   // LogIn
   const handleClickOpen = () => {
     setOpenLogIn(true);
   };
   const logInHandler = (email:string, password:string) => {
      singIn(email, password)
   };
   const handleClose = () => {
     setOpenLogIn(false);
   };

   // Registration
   const handleRegOpen = () => {
   //   setIsLogIn(false)
     setOpenRegistration(true);
     setOpenLogIn(false);
   };
   const registrationHandler = (name:string, email:string, password:string) => {
   //   setIsLogIn(true)
     regIn(name, email, password)
   };
   const handleRegClose = () => {
      // setIsLogIn(true)
     setOpenRegistration(false)
   };


  return (
   <header className={styles.header}>
      <div className={styles.header__line}>
         <div className={styles.header__content}>

            <div className={styles.header__items}>
               <div  className={styles.header__item}><Link className={styles.header__link} href="/">Главная страница</Link></div>
               <div onMouseLeave={onMouseLeaveHandler} className={`${styles.header__item} ${styles.info}`} >
                  <div onMouseEnter={(e) => onMouseEnterHandler(e, 'info')} className={`${styles.info__item} ${styles.header__item}`}><p className={styles.header__link} id="info-trigger">Информация</p></div>
                  <div className={styles.info__inner} style={infoOpen ? {top: '70px'} : {top: '-300px'}} >
                     <div className={`${styles.info__item} ${styles.header__item}`}><Link href="/information">Информация</Link></div>
                     <div className={`${styles.info__item} ${styles.header__item}`}><Link href="/coaches">Тренеры клуба</Link></div>
                     <div className={`${styles.info__item} ${styles.header__item}`}><Link href="/competition">Календарь соревнований</Link></div>
                  </div>
               </div>

               <div className={styles.header__item}><Link className={styles.header__link} href="/achievements">Последние достижения</Link></div>
               <div className={styles.header__item}><Link className={styles.header__link} href="/clinical">Диспансеризация</Link></div>
               <div className={styles.header__item}><Link className={styles.header__link} href="/articles">Статьи</Link></div>
               <div className={styles.header__item}><Link className={styles.header__link} href="/about">О нас</Link></div>
              
              
               {isAdmin &&
                  <div className={`${styles.header__item} ${styles.header__admin}`}><Link className={styles.header__link} href="/admin">АДМИН</Link></div>
               }
            </div>

            {!isAuth 
               ? 
                  <div className={`${styles.header__item}`}><p className={styles.header__link} onClick={handleClickOpen}>Войти</p></div>
               :
                  <div onMouseLeave={onMouseLeaveHandler} className={styles.header__auth}>
                     <div className={`${styles.header__items} ${styles.auth}`}>
                        <div onMouseEnter={(e) => onMouseEnterHandler(e, 'settings')} className={`${styles.header__item} ${styles.auth__item}`}><p className={styles.header__link} id="auth-trigger">{user?.name}</p></div>
                        <div style={settingsOpen ? {top: '70px'} : {top: '-300px'}} className={`${styles.header__inner} ${styles.auth__inner}`}>
                           <div className={styles.switcher}>
                              <p className={`${styles.switcher__text} ${styles.header__link}`}>Сменить тему</p>
                              <input className={styles.switcher__input} type="checkbox" id="switch-2" onClick={colorChangerHandler} />
                              <label className={styles.switcher__label} htmlFor="switch-2">Toggle</label>
                           </div>
                           <div id="comeIn" onClick={() => router.push(`/user/${user.id}`)} className={`${styles.header__item} ${styles.auth__item}`}><p className={styles.header__link}>Личный кабинет</p></div>
                           <div id="singOut" onClick={singOut} className={`${styles.header__item} ${styles.auth__item}`}><p className={styles.header__link}>Выйти</p></div>
                        </div>
                     </div>
                  </div>
            }
         </div>
      <LoginPopup open={openLogIn} logInHandler={logInHandler} handleRegOpen={handleRegOpen} closeWindow={handleClose}/>
      <RegistrationPopup open={openRegistration} registrationHandler={registrationHandler} closeWindow={handleRegClose}/>
      </div>
      <div className={styles.upArrow}><span id="upArrow"></span></div>
      <Burger/>
   </header>
  )
}

export default Header
