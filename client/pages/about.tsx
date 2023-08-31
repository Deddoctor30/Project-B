// React
import { FC } from 'react';

// Next
import Link from 'next/link';

// Стили
import styles from '../styles/About.module.scss';

//Interface
import { IUser } from '../types/user';
import { IContact } from '../types/contact';

// Логика
import MainContainer from '../components/MainContainer'
import parsePhoneNumber from 'libphonenumber-js';
import { setUser } from '../slices/userSlice';
import nookies from 'nookies'
import { wrapper } from '../store/store';
import { GetServerSideProps } from 'next';
import jwt_decode from "jwt-decode";
import { $host } from '../http';
import { ICoach } from '../types/coach';

interface AboutProps {
   user: IUser
   contacts: IContact[]
   coach: ICoach[]
 }

const About: FC<AboutProps> = ({user, contacts, coach}) => {
     
  return (
    <MainContainer contacts={contacts} user={user} pageName="О нас">
      <section className={styles.about}>
            <h1 className="title animation">О нас</h1>
            <h2 className={styles.about__title}>Вас приветствуют мальчишки и девчонки, занимающиеся в подростковом клубе "Старт".</h2>
            <div className={styles.about__description}>
               Кто любит спорт, движение, хочет быть сильным, ловким, смелым - приходите к нам. 
               Мы занимаемся фехтованием. Это древний и очень красивый вид спорта. Он учит благородству и уважению друг к другу. 
               Тренировки проходят в небольшом, но уютном спортивном зале. Там же мы устраиваем чаепития по особо торжественным дням (присвоение спортивного разряда, победы на соревнованиях ...). Мы много выступаем на соревнованиях как городского масштаба, так и на Всероссийских и Международных турнирах. Из нашего клуба вышло немало КАНДИДАТОВ В МАСТЕРА СПОРТА РОССИИ  и МАСТЕРОВ СПОРТА РОССИИ. 
               <br/>
               <br/>
               А преподают нам искусство ФЕХТОВАНИЯ добрые и заботливые тренеры:&nbsp;
                  {coach.map(item => 
                     <Link key={item.id} className="link" href={`/coaches/${item.id}`}>{item.name}&nbsp;</Link>
                  )}
               <br/>
               <br/>
               Летом мы выезжаем в спортивно-оздоровительные лагеря, где совершенствуем своё мастерство по фехтованию, а заодно плаваем, играем в футбол, волейбол, пионербол, ездим на экcкурсии. 
               <br/>
               <br/>
               На соревнованиях мы представляем специализированную детско-юношескую спортивную школу Олимпийского резерва "КШВСМ" (Комплексная Школа Высшего Спортивного Мастерства). Перед нами большие перспективы и возможности. Вплоть до ОЛИМПИЙСКИХ ИГР.
            </div>
            <div className={`${styles.about__attention} ${styles.attention}`}>
               <h2 className={styles.attention__title}>Внимание!</h2>
               <div className={styles.attention__inner}>
                  <div className={styles.attention__sign}>
                     <span>!</span>
                  </div>
                  <ul className={styles.attention__items}>
                     <li className={styles.attention__item}>Мы всегда готовы принять в наши ряды желающих заниматься нелегким искусством - фехтованием на шпагах</li>
                     <li className={styles.attention__item}>В этом году идёт набор в младшую и среднюю группы - это дети со 2 по 6 класс</li>
                     <li className={styles.attention__item}>Запись в группу -  по адресу: <a className="link" target="_blank" href='https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_podkovyrova_20/Z0kYdQdiS0wCQFtjfXV3dX5kYw==/?from=mapframe&ll=30.302295%2C59.964278&z=17'>ул. Подковырова 20</a>, подростковый клуб "Старт" (с собой желательно иметь спортивную форму)</li>
                     <li className={styles.attention__item}>Телефон: <a className="link" href={contacts[0]?.phoneNumber !== undefined ? parsePhoneNumber(contacts[0]?.phoneNumber, 'RU').getURI() : null}>{contacts[0]?.phoneNumber}</a> </li>
                     <li className={styles.attention__item}>(понедельник, среда, пятница с 15.00 до 20.00)</li>
                  </ul>
               </div>
            </div>
            <div className={`${styles.about__map} ${styles.map}`}>
               <div className={styles.map__title}><a className="link" target="_blank" href="https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_podkovyrova_20/Z0kYdQdiS0wCQFtjfXV3dX5kYw==/?from=mapframe&ll=30.303096%2C59.964517&z=17.05">Как нас найти</a></div>
               <div className={styles.map__content}>
                  <div style={{position:'relative', overflow:'hidden'}}>
                     <a href="https://yandex.ru/maps/2/saint-petersburg/?utm_medium=mapframe&utm_source=maps" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'0px'}}>Санкт‑Петербург</a>
                     <a href="https://yandex.ru/maps/2/saint-petersburg/house/ulitsa_podkovyrova_20/Z0kYdQdiS0wCQFtjfXV3dX5kYw==/?ll=30.302295%2C59.964278&utm_medium=mapframe&utm_source=maps&z=17.12" style={{color:'#eee', fontSize:'12px', position:'absolute', top:'14px'}}>Улица Подковырова, 20 — Яндекс Карты</a>
                     <iframe src="https://yandex.ru/map-widget/v1/?ll=30.302295%2C59.964278&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzQzMDgyMxJS0KDQvtGB0YHQuNGPLCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywg0YPQu9C40YbQsCDQn9C-0LTQutC-0LLRi9GA0L7QstCwLCAyMCIKDRtr8kEVbNtvQg%2C%2C&z=17.12" width="80%" height="560"  frameBorder="1" allowFullScreen={true} style={{position:'relative'}}>
                     </iframe>
                  </div>
               </div>
            </div>
         </section>
    </MainContainer>
  )
}

export default About


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
   try {
      // Header/Footer
      const cookies = nookies.get(ctx)
      let user: any = {}
      if (cookies.token !== undefined) {
        const decodedToken = jwt_decode(cookies.token)
        store.dispatch(setUser(decodedToken))
        user = decodedToken
      }
      const responseContact = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'contact')
      const contacts = responseContact.data;

      const responseCoach = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'coach')
      const coach = responseCoach.data;
      

      return { props: {user, contacts, coach} };
   } catch (error) {
      console.log(error);

     return { props: {} };
   }
});