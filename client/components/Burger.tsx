// React
import { useState } from 'react';

// Next
import Link from 'next/link';

// Стили
import styles from '../styles/Header.module.scss';

// Логика
import { useTheme } from '../utiles/useTheme';

const Burger = () => {
   const [isBurger, setIsBurger] = useState<boolean>(false)
   const { theme, setTheme } = useTheme()
   
   
   const colorChangerHandler = () => {
      if (theme === 'light') {
         setTheme('dark')
      } else {
         setTheme('light')
      }
   }
   const clickHandler = () => {
      setIsBurger(state => !state)
   }

  return (
   <div className={`${styles.header__burger} ${styles.burger}`}>
   <div className={isBurger ? `${styles.burger__content} ${styles.down}` : styles.burger__content}>
      <div className={styles.burger__item}><Link href="/">Главная страница</Link></div>
      <div className={styles.burger__item}><Link href="/information">Информация</Link></div>
      <div className={styles.burger__item}><Link href="/coaches">Тренеры клуба</Link></div>
      <div className={styles.burger__item}><Link href="/competition">Календарь соревнований</Link></div>
      <div className={styles.burger__item}><Link href="/achievements">Последние достижения</Link></div>
      <div className={styles.burger__item}><Link href="/clinical">Диспансеризация</Link></div>
      <div className={styles.burger__item}><Link href="/articles">Статьи</Link></div>
      <div className={styles.burger__item}><Link href="/about">О нас</Link></div>
      <div className={styles.switcher}>
         <p className={`${styles.switcher__text} ${styles.header__link}`}>Сменить тему</p>
         <input className={styles.switcher__input} type="checkbox" id="switch" />
         <label className={styles.switcher__label} onClick={colorChangerHandler} htmlFor="switch">Toggle</label>
      </div>
   </div>
   <div onClick={clickHandler} className={styles.burger__trigger}>
      <div className={isBurger ? `${styles.burger__icon} ${styles.active}` : styles.burger__icon}>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
      </div>
   </div>
   </div>
  )
}

export default Burger