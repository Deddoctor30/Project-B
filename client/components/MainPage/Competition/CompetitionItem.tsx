// React
import { FC} from "react";

// Стили
import styles from "../../../styles/Main.module.scss";

// Логика
import { ICompetition } from "../../../types/competition";
import dayjs from 'dayjs';
import 'dayjs/locale/ru'
import imgProvider from "../../../utiles/imgProvider";


interface CompetitionItemProps {
   data: ICompetition
 }
 
const CompetitionItem: FC<CompetitionItemProps> = ({data}) => {
   const day = dayjs(data.dateStart).date()
   const dataFormatter = (needDate: string) => {
      const formatter = new Intl.DateTimeFormat('ru', { month: 'long' });
      const month = formatter.format(new Date(needDate));
      return month
   }

  return (
   <div className={styles.competitions__item}>
      <div className={styles.competitions__date}>
         <div className={styles.competitions__month}>{dataFormatter(data.dateStart)}</div>
         <div className={styles.competitions__day}>{day}</div>
      </div>
      <div className={styles.competitions__img}>
         <img src={imgProvider(data.images[0]?.img)} alt={data.name} />
      </div>
      <div className={styles.competitions__inner}>
         <div className={styles.competitions__name}>
            {data.name}
         </div>
         <div className={styles.competitions__content}>
            {data.content}
         </div>
         <div className={styles["competition__time-wrapper"]}>
            {data.time 
               ?
                  <div className={styles.competitions__time}>{dayjs(data.time).format('HH:mm')}</div>
               :
                  <div className={styles.competitions__time}>Нет данных</div>
            }
         </div>
         <div className={styles.competitions__address}>
            {data.place 
               ?
                  <div className="competitions__address-">{data.place}</div>
               :
                  <div className="competitions__address-">Нет данных</div>
            }
         </div>
      </div>
   </div>
  )
}

export default CompetitionItem