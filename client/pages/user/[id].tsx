// React
import React, { FC, useCallback, useEffect, useState } from 'react'

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, EffectFade, Navigation, Pagination } from "swiper";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';

// Стили
import styles from '../../styles/User.module.scss';


// Логика
import { GetServerSideProps } from 'next';
import { IUser } from '../../types/user';
import MainContrainer from '../../components/MainContainer';
import Selector from '../../components/AdminPanel/Selector';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import imgProvider from '../../utiles/imgProvider';
import jwt_decode from "jwt-decode";
import UserFileUploader from '../../components/AdminPanel/UserFileUploader';
import { createAchievements, deleteImagesItem, fetchUser, setUser, updateUserCoach } from '../../slices/userSlice';
import TextFieldItem from '../../components/AdminPanel/TextFieldItem';
import { wrapper } from '../../store/store';
import nookies from 'nookies'
import { $host } from "../../http";
import { ICheckUser } from '../../types/checkUser';
import { IContact } from '../../types/contact';
import { ICoach } from '../../types/coach';
import { v4 as uuidv4 } from 'uuid';
import { fetchCoach } from '../../slices/coachSlice';

interface UserProps {
  userData: ICheckUser
  contacts: IContact[]
  id: number
}

const User: FC<UserProps> = ({userData, contacts, id}) => {
  const dispatch = useAppDispatch()
  const coaches: ICoach[] = useAppSelector(state => state.coach?.coach)
  const user: IUser = useAppSelector(state => state.user?.user)
  const imagesData = useAppSelector(state => state.user?.images)
  const [coach, setCoach] = useState<string | null>(user?.coach || null)
  const [open, setOpen] = useState<boolean>(false);
  const [openAvatar, setOpenAvatar] = useState<boolean>(false);
  const [openAchievements, setOpenAchievements] = useState<boolean>(false);
  const [chooseCoach, setChooseCoach] = useState<boolean>(false)
  const [decodedToken, setDecodedToken] = useState<boolean>(false)
  // открытие нужной картинки
  const [swiper, setSwiper] = useState(null);
  const [slide, setSlide] = useState<number>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Плавное удаление картинок со странцицы
  const [images, setImages] = useState<any[]>([])
  
  // Загрузка достижений
  const achievementsData = useAppSelector(state => state.user?.achievements)
  const [achievementsArray, setAchievementsArray] = useState<any[]>(user?.achievements)
  const [achievements, setAchievements] = useState<string>('')

  // Аватар
  const [avatar, setAvatar] = useState<string>(user?.avatar)
  const avatarData = useAppSelector(state => state.user?.avatar)

  const updateIndex = (swiperInstance: SwiperType) => {
     console.log(currentIndex);
   if (swiperInstance === null) return;
   const currentSlide = swiperInstance?.activeIndex;
   setCurrentIndex(currentSlide)
 }
 

  useEffect(() => {
     checkRole()
     setImages(user?.images)
     setAchievementsArray(user?.achievements)
  }, [])

  useEffect(() => {
   if (coach !== null) {
      updateCoach(coach)
   }
  }, [coach])


  useEffect(() => {
   imagesData.forEach((item: object) => setImages(state => [...state, item]))
  }, [imagesData])

  useEffect(() => {
   if (achievementsData) {
      setAchievementsArray(state => [...state, achievementsData])
   }
  }, [achievementsData])

  useEffect(() => {
   if (avatarData) {
      setAvatar(avatarData)
   }
  }, [avatarData])


  useEffect(() => {
     if (swiper) {
        swiper.slideTo(slide, 1);
     }
  }, [slide, swiper])
   

  const handleClickOpen = (i:number) => {
    setOpen(true);
    setSlide(i)
   }
  
  const handleClickOpenAvatar = () => {
    setOpenAvatar(true);
   }
   
   const handleClose = () => {
      setOpen(false);
      setOpenAvatar(false);
      setOpenAchievements(false)
   }

   const checkRole = () => {
      try {
         if (id == userData.id) {
            setDecodedToken(true)
         } else {
            setDecodedToken(false)
         }
      } catch (e) {
         console.log(e);
      }
   }


  // Преобразование даты регистрации
  const date = new Date(user?.createdAt)
  const monthRaw = String(date.getMonth() + 1);
  const month = monthRaw.length < 2 ? `0${monthRaw}` : monthRaw
  const day = date.getDate();
  const year = date.getFullYear();
  const regDate = day + "." + month + "." + year;
  
 
 const updateCoach = (coach: string) => {
   const data = {
      id: user.id,
      coach
   }
   dispatch(updateUserCoach(data))
 }

 const coachChangeHandler = () => {
   setChooseCoach(true)
 }

 const deleteImage = () => {
   const data = {
      id: user.id,
      image: images[currentIndex].img
   }
   
   dispatch(deleteImagesItem(data))
   const imagesData = images.filter(item => item.img !== images[currentIndex].img)
   setImages(imagesData)
 }

 const deleteAchievements = (id:number) => {
   const data = {
      id: user.id,
      achievementsId: id
   }
   dispatch(deleteImagesItem(data))
   setAchievementsArray(state => state.filter(item => item.id !== id))
 }

 const setAchievementsHandler = () => {
   const data = {
      userId: user.id,
      content: achievements,
      id: uuidv4()
   }
   dispatch(createAchievements(data))
   setOpenAchievements(false)
}


  return (
    <MainContrainer contacts={contacts} user={userData} pageName={user?.name}>
      <section className={styles.user}>
         <h1 className="title animation">{user?.name}</h1>
         <div className={styles.user__content}>

            {/* Аватар */}
            <div className={styles.user__img}>
               {avatar === null
                  ?
                     <img src={`${process.env.NEXT_PUBLIC_API_URL}system/w1.png`} onClick={handleClickOpenAvatar} alt={user?.name}/>
                  :
                     <img src={imgProvider(avatar)} onClick={handleClickOpenAvatar} alt={user?.name}/>
               }
               <Dialog PaperProps={{sx: {maxHeight: '90%', backgroundColor: 'inherit', boxShadow: 'inherit', maxWidth: '1000px', alignItems: 'center'}}} open={openAvatar} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
               <ImageListItem >
                  {avatar === null
                     ?
                        <img
                           style={{maxWidth: 600, maxHeight: 500, objectFit: 'contain', cursor: 'pointer'}}
                           src={`${`${process.env.NEXT_PUBLIC_API_URL}system/w1.png`}?w=164&h=164&fit=crop&auto=format`}
                           alt={user?.createdAt}
                           loading="lazy"
                        />
                     :
                        <img
                           style={{maxWidth: 800, maxHeight: 600, objectFit: 'contain', cursor: 'pointer'}}
                           src={`${imgProvider(avatar)}?w=164&h=164&fit=crop&auto=format`}
                           srcSet={`${imgProvider(avatar)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                           alt={user?.createdAt}
                           loading="lazy"
                        />
                  }
               </ImageListItem>
                  {decodedToken &&
                     <UserFileUploader id={user?.id} avatar={avatar} setAvatar={setAvatar} onClose={setOpenAvatar} type='avatar' accept='image/*' multiple={false} />
                  }
               </Dialog>
            </div>
            <div className={`${styles.user__info} ${styles.info}`}>
               <ul className={styles.info__about}>
                  <h2 className={styles.info__title}>Информация</h2>
                  <li className={styles.info__item}><span>Зарегистрирован: </span>{regDate}</li>
                  <li className={styles.info__item}><span>Преподаватель: </span>
                     {user?.coach !== null && chooseCoach === false
                        ?
                           <Typography onClick={coachChangeHandler} sx={{cursor: 'pointer', borderBottom: '1px solid black'}} align='center'>{user?.coach}</Typography>
                        :
                           <Selector data={coaches} setSelector={setCoach} initial={user.coach}/>
                     }
                  </li>
               </ul>
            </div>

            {/* Достижения */}
            <div className={styles.user__achievements}>
               <h2>Достижения</h2>
               <ul className={styles.user__items}>
                  {achievementsArray.map(item =>
                     <li className={styles.user__item} key={item.id}>
                        <p>{item.content}</p>
                        <IconButton 
                           aria-label="delete"
                           size='small'
                           sx={{'&:hover': {backgroundColor: 'inherit', color: 'black'}}}
                           onClick={() => deleteAchievements(item.id)}
                        >
                           <DeleteOutlineOutlinedIcon sx={{fontSize: '28px'}}/>
                        </IconButton>
                     </li>
                  )}
               </ul>
               {
                  <>
                     {decodedToken &&
                        <IconButton 
                           aria-label="delete"
                           size='large'
                           sx={{width: '60px', backgroundColor: '#00000010',  '&:hover': {backgroundColor: '#00000020', color: 'black'}}}
                           onClick={(() => setOpenAchievements(true))}
                           >
                           <AddIcon fontSize='large'/>
                        </IconButton>
                     }

                     {/* Диалог достижений */}
                     <Dialog maxWidth='xl' PaperProps={{sx: {padding: 2}}} open={openAchievements} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle>{'Внесите информацию о ваших достижениях и загрузите на сайт'}</DialogTitle>
                        <DialogContent>
                           <TextFieldItem id='content' label='Описание' type='text' value={achievements} setValue={setAchievements} rows={4}/>
                        </DialogContent>
                        <DialogActions>
                           <Button id='apply' sx={{padding: '15px 20px'}} size='large' onClick={setAchievementsHandler}>Создать запись</Button>
                           <Button id='cancel' sx={{padding: '15px 20px'}} size='large' color='error' onClick={handleClose}>Отмена</Button>
                        </DialogActions>
                     </Dialog>
                  </>
               }
            </div>
         </div>

         {/* Галерея */}
         <div className={styles.user__galery}>
            <h2 style={{marginBottom: '20px', marginTop: '100px'}} className={styles.info__title}>Галерея пользователя</h2>
            <ImageList sx={{justifyContent: 'center'}} cols={images.length > 6 ? 6 : images.length} rowHeight={'auto'}>
               {images &&
               (images).slice(0, 6).map((item, i) => 
               <ImageListItem key={item.id}>
                  <img
                     style={{maxWidth: 300, maxHeight: 200, objectFit: 'contain', cursor: 'pointer'}}
                     src={`${imgProvider(item.img)}?w=164&h=164&fit=crop&auto=format`}
                     srcSet={`${imgProvider(item.img)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                     alt={user?.createdAt}
                     loading="lazy"
                     onClick={() => handleClickOpen(i)}
                  />
               </ImageListItem>
               )}
            </ImageList>

            {/* Всплывающие фото */}
            <Dialog PaperProps={{sx: {maxHeight: '90%', backgroundColor: 'inherit', boxShadow: 'inherit', maxWidth: '1300px', alignItems: 'center'}}} open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
               <Swiper initialSlide={currentIndex} onActiveIndexChange={updateIndex} onSwiper={(swiper) => setSwiper(swiper)} autoHeight={true} keyboard={{enabled: true}} spaceBetween={30} navigation={true} pagination={{clickable: true,}} modules={[Keyboard, EffectFade, Navigation, Pagination]} className="mySwiper">
                   {images &&
                     images.map(item => 
                     <SwiperSlide key={item.id}>
                        <img style={{maxHeight: '90vh', objectFit: 'contain'}} src={imgProvider(item.img)} />
                     </SwiperSlide>
                  )}
               </Swiper>
               {decodedToken &&
                  <IconButton 
                     aria-label="delete"
                     size='large'
                     sx={{width: '60px', backgroundColor: '#ffffff5f',  mt: 3, '&:hover': {backgroundColor: '#ffffffc0', color: 'black'}}}
                     onClick={deleteImage}
                     >
                     <DeleteOutlineOutlinedIcon fontSize='large'/>
                  </IconButton>
               }
            </Dialog>

            {/* Кнопка загрузки фото */}
            {decodedToken && user?.images.length < 30
               ?
                  <UserFileUploader type='galery' id={user.id} purpose={'Загрузить в галерею'} accept='image/*' multiple={true}/>
               :
                  <Typography sx={{mt: 6, mb: 2}} align='center' variant='h5'>Лимит: 30 картинок</Typography>
            }
         </div>
      </section>
    </MainContrainer>
  )
}

export default User


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
   try {
     // Header/Footer
     const cookies = nookies.get(ctx)
     let userData: any = {}
     if (cookies.token !== undefined) {
       const decodedToken = jwt_decode(cookies.token)
       store.dispatch(setUser(decodedToken))
       userData = decodedToken
     }
     const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'contact')
     const contacts = response.data;
     
     await store.dispatch(fetchUser(ctx.params.id))
     await store.dispatch(fetchCoach())

     return { props: {userData, contacts, id: ctx.params.id} };
   } catch (error) {
     console.log(error);

     return { props: {} };
   }
});