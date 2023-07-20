// React
import React, { FC } from 'react'

// Next
import Link from 'next/link';

// Стили
import styles from '../../styles/Coaches.module.scss';

// Логика
import { ICoach } from '../../types/coach';
import imgProvider from '../../utiles/imgProvider';


interface CoachesItemProps {
   data: ICoach
}

const CoachesItem: FC<CoachesItemProps> = ({data}) => {
  return (
    <>
      <li>
         <div className={styles.coaches__item}>
            <Link href={`/coaches/${data.id}`}>
               <div className={styles.coaches__inner}>
                  <img src={imgProvider(data.avatar)} alt={data.name}/>
               </div>
               <div className={styles.coaches__info}>
                  <h2 className={styles.coaches__name}>{data.name}</h2>
                  <div className={styles.coaches__about}>{data.content}</div>
               </div>
            </Link>
         </div>
      </li>
    </>
  )
}

export default CoachesItem