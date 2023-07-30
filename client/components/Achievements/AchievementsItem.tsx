// React
import React, { FC } from 'react'

// Стили
import styles from '../../styles/Achievements.module.scss';

// Логика
import { IArticle } from '../../types/article';
import PhotoViewer from '../PhotoViewer';
import imgProvider from '../../utiles/imgProvider';



interface AchievementsItemProps {
   data: IArticle
}

const AchievementsItem: FC<AchievementsItemProps> = ({data}) => {
   
   const imgViewer = (data: IArticle) => {
      if (data.images.length === 3) {
         return data.images.slice(0, 2)
      } else if (data.images.length > 4) {
         return data.images.slice(0, 4)
      }
      return data.images
   }

   const dataChanger = (data: string) => {
      const day = data.slice(0, 10).split("-").reverse().join("-").replaceAll('-', '.')
      return day
   }

  return (
    <>
      <div className={styles.achievements__item}>
         <div className={styles.achievements__content}>
            <div className={styles.achievements__header}>
               <h2 className={styles.achievements__title}>{data.name}</h2>
               <span className={styles.achievements__date}>{dataChanger(data.createdAt)}</span>
            </div>
            <p className={styles.achievements__text}>{data.content}</p>
            <div className={styles.achievements__images}>
               {imgViewer(data).map(item => 
                  <div  key={item.id} className={styles.achievements__img}><img className={styles.achievements__img}width={530} height={400} src={imgProvider(item.img)} alt="123"/></div>
               )}
            </div>
               <PhotoViewer data={data.images}/>
         </div>
      </div>
    </>
  )
}

export default AchievementsItem