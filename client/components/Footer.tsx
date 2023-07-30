// React
import { FC } from 'react';

// Стили
import styles from '../styles/Footer.module.scss';

// Логика
import { useAppDispatch } from "../store/hooks";
import parsePhoneNumber from 'libphonenumber-js'
import { IContact } from '../types/contact';


interface FooterProps {
   contacts: IContact[]
}

interface ContactItemProps {
   data: IContact
}


const ContactItem: FC<ContactItemProps> = ({data}) => {
   return (
      <>
         <div className={styles.footer__row}>

            <ul className={styles.footer__items}>
               <li className={styles.footer__visit}>{data.name}</li>
               <li className={styles.footer__visit}><a href={parsePhoneNumber(data.phoneNumber, 'RU')?.getURI()}>{data.phoneNumber}</a></li>
               <li className={styles.footer__visit}><a href={`mailto:${data.email}`}>{data.email}</a></li>
            </ul>
         </div>
      </>
   )
}

const Footer: FC<FooterProps> = ({contacts}) => {

  return (
   <footer className={styles.footer}>
      <div className='container'>

         <div className={styles.footer__row}>
            <a className={`${styles.footer__item} ${styles.footer__vk}`} href="https://vk.com/start_fencing" target='_blank'></a>
         </div>
         
            {contacts.map(item => 
               <ContactItem key={item.id} data={item}/>
            )}

         <div className={`${styles.footer__row} ${styles.footer__rights}`}>
            <ul className={styles.footer__items}>
               <li className={styles.footer__visit}><a target='_blank' href="/agreement">Пользовательское соглашение</a></li>
               <li className={styles.footer__visit}><a target='_blank' href="/privacy">Политика обработки персональных данных</a></li>
               <li className={`${styles.footer__visit} ${styles.end}`}>by NovikovV  <span>© 2023</span></li>
            </ul>
         </div>
      </div>
   </footer>
  )
}

export default Footer