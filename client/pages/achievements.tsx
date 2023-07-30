// React
import { FC, useEffect } from 'react';

// MUI
import { Skeleton } from "@mui/material";

// Стили
import styles from '../styles/Achievements.module.scss';

//Interface
import { IUser } from '../types/user';
import { IContact } from '../types/contact';

// Логика
import axios from 'axios';
import MainContainer from '../components/MainContainer'
import { useAppSelector, useAppDispatch } from "./../store/hooks";
import { fetchAchievements, setLimit, setTotal } from '../slices/achievementsSlice';
import AchievementsItem from '../components/Achievements/AchievementsItem';
import Pagination from '../components/Pagination';
import { GetServerSideProps } from 'next';
import { wrapper } from '../store/store';
import jwt_decode from "jwt-decode";
import { $host } from '../http';
import { setUser } from '../slices/userSlice';
import nookies from 'nookies'


interface AchievementsProps {
   user: IUser
   contacts: IContact[]
 }

const Achievements: FC<AchievementsProps> = ({contacts, user}) => {
   const dispatch = useAppDispatch()
   const isLoading = useAppSelector((state) => state.achievements.status);
   const {article, page, totalCount, limit} = useAppSelector(state => state.achievements)
   // Задаем количество элементов на странице
   const limitVariable = 4;

   // Пагинация
   useEffect(() => {
      const data: object = {
         page: 1,
         limit: limitVariable
      }
      dispatch(fetchAchievements(data))

      axios.get('http://localhost:5000/api/article/arr').then(resp => {
         const count = resp.data
         dispatch(setTotal(count))
      })
   }, [dispatch])

   useEffect(() => {
      const data: any = {
         page: page,
         limit: limitVariable
      }
      dispatch(fetchAchievements(data))
      dispatch(setLimit(limitVariable))
   }, [dispatch, page])

  return (
    <MainContainer contacts={contacts} user={user} pageName="Последние достижения">
         <section className={styles.achievements}>
               <h1 className="title animation">Наши последние достижения</h1>
      {isLoading !== 'idle'
      ?
      <>
         <Skeleton sx={{height: '520px', transform: 'scale(1, 0.8)'}} animation='wave' />
      </>
      :
         <div className={styles.achievements__items}>
            {article.map(item => 
               <AchievementsItem data={item} key={item.id}/>
            )}
            {totalCount > limit &&
               <Pagination/>
            }
         </div>
      }
      </section>
    </MainContainer>
  )
}

export default Achievements

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
      
      return { props: {user, contacts} };
   } catch (error) {
      console.log(error);

     return { props: {} };
   }
});