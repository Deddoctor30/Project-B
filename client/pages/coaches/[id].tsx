// React
import { FC, useEffect, useState } from 'react';

// Next
import { GetServerSideProps } from 'next';


// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Keyboard, Navigation, Pagination } from "swiper";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// MUI
import { ImageList, ImageListItem, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';

// Стили
import styles from '../../styles/Coach.module.scss';

// Interace
import { IContact } from '../../types/contact';
import { ICheckUser } from '../../types/checkUser';
import { ICoach } from '../../types/coach';

// Логика
import axios from 'axios';
import MainContrainer from '../../components/MainContainer';
import imgProvider from '../../utiles/imgProvider';
import { wrapper } from '../../store/store';
import { setUser } from '../../slices/userSlice';
import nookies from 'nookies'
import { $host } from "../../http";
import jwt_decode from "jwt-decode";


interface CoachProps {
   coach: ICoach
   contacts: IContact[]
   user: ICheckUser
}

const Coach: FC<CoachProps> = ({coach, contacts, user}) => {
    // открытие нужной картинки
   const [swiper, setSwiper] = useState(null);
   const [slide, setSlide] = useState<number>(null)
   const [currentIndex, setCurrentIndex] = useState<number>(0);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      if (swiper) {
         swiper.slideTo(slide, 1);
      }
   }, [slide, swiper])
   
   const updateIndex = (swiperInstance: SwiperType) => {
      if (swiperInstance === null) return;
      const currentSlide = swiperInstance?.activeIndex;
      setCurrentIndex(currentSlide)
    }

   const handleClickOpen = (i:number) => {
     setOpen(true);
     setSlide(i)
   };
 
   const handleClose = () => {
     setOpen(false);
   };

   return (
    <MainContrainer contacts={contacts} user={user} pageName={coach.name}>
      <section className={styles.coach}>
         <h1 className="title animation">{coach.name}</h1>
         <div className={styles.coach__content}>
            <div className={styles.coach__img}>
               <img src={`${process.env.NEXT_PUBLIC_API_URL}/img/${coach?.avatar}`} alt={coach.name}/>
            </div>
            <div className={styles.coach__info}>
               <div className={styles.coach__about}>
                  <h2>Информация</h2>
                  <p><span>Должность: </span>{coach.position}</p>
                  <p><span>Вид оружия: </span>{coach.weapon}</p>
                  <p><span>Преподает с: </span>{coach.teachSince}</p>
                  <p><span>Тренерская категория: </span>{coach.category}</p>
                  <p><span>Образование: </span>{coach.education}</p>
                  <p><span>Контакты: </span><a href={`mailto:${coach.contact}`}>{coach.contact}</a></p>
                  <p>{coach.content}</p>
               </div>
            </div>
            {/* <div className={styles.coach__achievements}>
               <h2>Список учеников</h2>
               <div className={styles.coach__item}>
                  <img src="./../img/coach/avatar.png" alt="avatar"/>
                  <p>Понамарев А.В.</p>
               </div>
               <div className={styles.coach__item}>
                  <img src="./../img/coach/avatar.png" alt="avatar"/>
                  <p>Старшин Ю.С.</p>
               </div>
               <div className={styles.coach__item}>
                  <img src="./../img/coach/avatar.png" alt="avatar"/>
                  <p>Овчинников С.В.</p>
               </div>
            </div> */}
         </div>

         {/* Галерея */}
         <div className={styles.coach__galery}>
         <Typography sx={{mt: 6, mb: 2}} align='center' variant='h5'>Галерея</Typography>
            <ImageList sx={{justifyContent: 'center'}} cols={coach.images.length > 6 ? 6 : coach.images.length} rowHeight={'auto'}>
               {(coach.images).slice(0, 6).map((item, i) => 
               <ImageListItem key={item.id} >
                  <img
                     style={{maxWidth: 600, maxHeight: 500, objectFit: 'contain', cursor: 'pointer'}}
                     src={`${imgProvider(item.img)}?w=164&h=164&fit=crop&auto=format`}
                     srcSet={`${imgProvider(item.img)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                     alt={coach.createdAt}
                     loading="lazy"
                     onClick={() => handleClickOpen(i)}
                  />
               </ImageListItem>
               )}
            </ImageList>

            {/* Всплывающие фото */}
            <Dialog PaperProps={{sx: {maxHeight: '90%', backgroundColor: 'inherit', boxShadow: 'inherit', maxWidth: '1300px', alignItems: 'center'}}} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
               <Swiper initialSlide={currentIndex} onActiveIndexChange={updateIndex} onSwiper={(swiper) => setSwiper(swiper)} autoHeight={true} keyboard={{enabled: true}} spaceBetween={30} navigation={true} pagination={{clickable: true,}} modules={[Keyboard, EffectFade, Navigation, Pagination]} className="mySwiper">
                   {coach.images.map(item => 
                     <SwiperSlide key={item.id}>
                        <img style={{maxHeight: '90vh', objectFit: 'contain'}} src={imgProvider(item.img)} />
                     </SwiperSlide>
                  )}
               </Swiper>
            </Dialog>
         </div>
      </section>
    </MainContrainer>
  )
}

export default Coach;


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
     const response = await $host.get('http://localhost:5000/api/contact')
     const contacts = response.data;
     
     const coachResponse = await axios.get(process.env.NEXT_PUBLIC_API_URL + 'api/coach/' + ctx.params.id)

     return { props: {user, contacts, coach: coachResponse.data} };
   } catch (error) {
     console.log(error);

     return { props: {} };
   }
});