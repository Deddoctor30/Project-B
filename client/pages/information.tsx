// React
import { FC } from 'react';

// Next
import { GetServerSideProps } from 'next';

// Стили
import styles from '../styles/Information.module.scss';

// MUI
import { Typography } from '@mui/material';

// Interface
import { IContact } from '../types/contact';
import { IUser } from '../types/user';

// Логика
import MainContainer from '../components/MainContainer';
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchCompetitions } from '../slices/informationSlice';
import { setUser } from '../slices/userSlice';
import InformationItem from '../components/Information/InformationItem';
import { wrapper } from '../store/store';
import jwt_decode from "jwt-decode";
import { $host } from '../http';
import nookies from 'nookies'

interface InformationProps {
   user: IUser
   contacts: IContact[]
 }

const Information: FC<InformationProps> = ({contacts, user}) => {
   const competitionItems = useAppSelector((state) => state.information.competition.filter(item => item.status !== 'Прошедший'));

   
  return (
    <MainContainer contacts={contacts} user={user} pageName="Информация">
      <section className={styles.information}>
         <h1 className={`title animation`}>Информация о соревнованиях</h1>
         <div className={styles.information__items}>
            {competitionItems.length !== 0 
               ?
                  <>
                     {competitionItems.map(item => 
                        <InformationItem data={item} key={item.id}/>
                     )}
                  </>
               :
                  <Typography sx={{height: '50vh', mt: '10vh', textAlign: 'center'}} variant='h5'>Нет активных событий</Typography>
            } 
         </div>
      </section>
    </MainContainer>
  )
}

export default Information


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
 
      await store.dispatch(fetchCompetitions())
      
      return { props: {user, contacts} };
   } catch (error) {
      console.log(error);
 
     return { props: {} };
   }
 });