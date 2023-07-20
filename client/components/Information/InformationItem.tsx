// React
import { FC } from 'react';

// MUI
import { Skeleton } from "@mui/material";

// Стили
import styles from '../../styles/Information.module.scss';

// Логика
import { ICompetition } from '../../types/competition';
import imgProvider from '../../utiles/imgProvider';
import { useAppSelector } from '../../store/hooks';


interface InformationItemProps {
   data: ICompetition
}

const InformationItem: FC<InformationItemProps> = ({data}) => {
   const isLoading = useAppSelector((state) => state.information.status);
   const imgValidator = (text: string) => {
      if (text) {
         if (text.toLowerCase().includes('самолетом')) {
            return process.env.NEXT_PUBLIC_API_URL + 'system/airplane.gif'
         } else if (text.toLowerCase().includes('поезд')) {
            return process.env.NEXT_PUBLIC_API_URL + 'system/train.gif'
         } else {
            return process.env.NEXT_PUBLIC_API_URL + 'system/car.gif'
         }
      } else {
         return process.env.NEXT_PUBLIC_API_URL + 'system/nophoto.png'
      }
   }
  

  return (
    <>
    {isLoading !== 'idle'
      ?
         <>
            <Skeleton sx={{height: '230px', transform: 'scale(1, 0.8)'}} animation='wave' />
         </>
      :
         <div className={styles.information__item}>
            <h2 className={styles.information__title}>{data.name}</h2>
            <div className={styles.information__wrapper}>
               <div className={styles.information__logo}>
                  <img src={imgProvider(data.images[0]?.img)} alt={data.name}/>
               </div>
               <div className={styles.information__header}>
                  <img className={styles.information__vehicle} src={imgValidator(data?.start)} alt="to"/>
                  <p>Отправление</p>
               </div>
               <div className={styles.information__header}>Встречаемя</div>
               <div className={`${styles.information__header} ${styles.information__from}`}>
                  <img className={styles.information__vehicle} src={imgValidator(data?.arrive)} alt="back"/>
                  <p>Обратно</p>
               </div>
               <div className={styles.information__header}>
                  <p className={styles.information__content}>{data.start}</p>
               </div>
               <div className={styles.information__header}>
                  <p className={styles.information__content}>{data.meeting}</p>
               </div>
               <div className={styles.information__header}>
                  <p className={styles.information__content}>{data.arrive}</p>
               </div>
            </div>
         </div>

    }
    </>
  )
}

export default InformationItem