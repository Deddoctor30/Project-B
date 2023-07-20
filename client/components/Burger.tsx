// Next
import Link from 'next/link';

// Стили
import styles from '../styles/Header.module.scss';

const Burger = () => {
   
  return (
   <div className={`${styles.header__burger} ${styles.burger}`}>
   <div className={styles.burger__content}>
      <div className={styles.burger__item}><Link href="/index">Главная страница</Link></div>
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
         <label className={styles.switcher__label} htmlFor="switch">Toggle</label>
      </div>
   </div>
   <div className={styles.burger__trigger}>
      <div className={styles.burger__icon}>
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