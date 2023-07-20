// Next
import Link from "next/link"

// Стили
import styles from '../styles/Error404.module.scss';

const Error = () => {
  return (
   <div className={styles['Error-404']}>
      <h1 className={styles['Error-404__title']}>Упс... Такой страницы не существует</h1>
      <Link href={`/`}><button className={'button'}>Покормить Хомяка на Главной</button></Link>
   </div>
  )
}

export default Error