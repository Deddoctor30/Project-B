// React
import { FC } from 'react';

// Next
import Head from 'next/head';

// Логика
import Header from './Header';
import Footer from './Footer';
import { IUser } from '../types/user';
import { ICheckUser } from '../types/checkUser';


interface MainContainerProps {
   children: React.ReactNode;
   pageName: string;
   user: ICheckUser
   contacts: any[]
}


const MainContainer: FC<MainContainerProps> = ({children, pageName, user, contacts}) => {
  return (
   <>
      <Head>
         <title>{pageName}</title>
         <link rel="icon" href="/favicon.ico" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
         <meta name="description" content="Фехтовальный клуб Санкт-Петербурга Project A принимает набор студентов в свои ряды для обучения фехтовальному искуству"></meta>

         <link type="image/png" sizes="16x16" rel="icon" href={process.env.NEXT_PUBLIC_API_URL + 'system/icon16.png'}/>
         <link type="image/png" sizes="32x32" rel="icon" href={process.env.NEXT_PUBLIC_API_URL + 'system/icon32.png'}/>
         <link type="image/png" sizes="96x96" rel="icon" href={process.env.NEXT_PUBLIC_API_URL + 'system/icon96.png'}/>
      </Head>

      <div className="wrapper">
         <Header user={user}/>
         <div className='container'>
            {children}
         </div>
         <Footer contacts={contacts}/>
      </div>
   </>
  )
}

export default MainContainer