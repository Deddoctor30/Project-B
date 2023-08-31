// React
import { FC } from "react"

// Next
import { GetServerSideProps } from 'next';

// Стили
import styles from '../styles/Coaches.module.scss';

//Interface
import { IUser } from '../types/user';
import { IContact } from '../types/contact';

// Логика
import { useAppSelector } from "../store/hooks";
import { fetchCoach } from "../slices/coachSlice";
import { setUser } from '../slices/userSlice';
import CoachesItem from "../components/Coaches/CoachesItem";
import MainContainer from "../components/MainContainer"
import { wrapper } from '../store/store';
import jwt_decode from "jwt-decode";
import { $host } from '../http';
import nookies from 'nookies'

interface CoachesProps {
   user: IUser
   contacts: IContact[]
 }

const Coaches: FC<CoachesProps> = ({contacts, user}) => {
   const coachItems = useAppSelector((state) => state.coach.coach);

  return (
   <MainContainer contacts={contacts} user={user} pageName="Наши тренеры">
      <section className={styles.coaches}>
         <h1 className={`title animation`}>Тренерско - преподавательский состав клуба</h1>
         <div className={styles.coaches__content}>
            <ul className={styles.coaches__items}>
               {coachItems.map(item =>
                  <CoachesItem data={item} key={item.id}/>
               )}
            </ul>
         </div>
      </section>
   </MainContainer>
  )
}

export default Coaches

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
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'contact')
      const contacts = response.data;
      await store.dispatch(fetchCoach())
      return { props: {user, contacts} };
   } catch (error) {
      console.log(error);

     return { props: {} };
   }
});