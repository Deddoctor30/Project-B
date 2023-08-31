// React
import { FC, useState } from "react";

// MUI
import Button from '@mui/material/Button';
import { Skeleton } from "@mui/material";

// Стили
import styles from "../../../styles/Main.module.scss";

// Логика
import { ICompetition } from "../../../types/competition";
import CompetitionItem from "./CompetitionItem";
import sortDate from "../../../utiles/sortDate";
import { useAppSelector } from "../../../store/hooks";


interface CompetitionListProps {
  data: ICompetition[]
}

const CompetitionList: FC<CompetitionListProps> = ({data}) => {
  const isLoading = useAppSelector((state) => state.mainPage.competitionStatus);
  const futureData = data.filter(item => item.status === 'Будущий')
  const currentData = data.filter(item => item.status === 'Текущий')
  const pastData = sortDate(data.filter(item => item.status === 'Прошедший')).slice(0, 3);
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [offset, setOffset] = useState(9)
  const [pastNewData, setPastNewData] = useState([])

  const handleLoad = () => {
    setOffset(item => item + 9)
    setPastNewData(sortDate(data.filter(item => item.status === 'Прошедший')).slice(0, offset))
    setIsLoadMore(true)
  }
  
  return (
    <>
    {isLoading !== 'idle'
      ?
        <>
          <Skeleton sx={{height: '160px', transform: 'scale(1, 0.8)', mt: 10}} animation='wave' />
          <Skeleton sx={{height: '160px', transform: 'scale(1, 0.8)'}} animation='wave' />
          <Skeleton sx={{height: '160px', transform: 'scale(1, 0.8)'}} animation='wave' />
        </>
      :
        <>
          <div className={`${styles.competitions}`}>
            <p className={styles.competitions__future}>Предстоящие соревнования</p>
            <div className={styles.competitions__items}>
              {sortDate(futureData).map(item => 
                <CompetitionItem key={item.id} data={item}/>
              )}
            </div>

            <p className={styles.competitions__current}>Текущие соревнования</p>
            <div className={styles.competitions__items}>
              {sortDate(currentData).map(item => 
                <CompetitionItem key={item.id} data={item}/>
              )}
            </div>

            <p className={styles.competitions__past}>Прошедшие соревнования</p>
            <div className={styles.competitions__items}>
              {isLoadMore 
                ?
                pastNewData.map(item => 
                  <CompetitionItem key={item.id} data={item}/>
                )
                :
                pastData.map(item => 
                  <CompetitionItem key={item.id} data={item}/>
                )
              }
            </div>
              {isLoadMore &&
                <Button sx={{mt: 3}} size='large' variant="outlined" onClick={handleLoad}>Загрузить больше</Button>
              }
          </div>
        </>
    }
    </>
  )
}

export default CompetitionList