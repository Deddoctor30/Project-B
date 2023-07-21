// React
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

// Next
import { GetServerSideProps } from "next";

// Стили
import styles from "../styles/Competition.module.scss";

//Interface
import { IUser } from "../types/user";
import { IContact } from "../types/contact";

// Логика
import MainContainer from "../components/MainContainer";
import { setUser } from "../slices/userSlice";
import { wrapper } from "../store/store";
import { $host } from "../http";
import jwt_decode from "jwt-decode";
import nookies from "nookies";
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/ru'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCompetition } from "../slices/competitionSlice";
import ToolTipComponent from "../components/ToolTipComponent";

interface CompetitionProps {
  user: IUser;
  contacts: IContact[];
}

const Competition: FC<CompetitionProps> = ({ contacts, user }) => {
  dayjs.locale('ru') 
  dayjs.extend(localeData)
  dayjs.extend(isBetween)
  const [windowWidth, setWindowWidth] = useState<number>(null)
  const [currentDay, setCurrentDay] = useState(dayjs())
  const dispatch = useAppDispatch()
  const competitions = useAppSelector(state => state.competition.competition)
  
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    dispatch(fetchCompetition())
  }, [])


  const currentMonth = currentDay.format('MMMM').toLocaleUpperCase()
  const currentYear = currentDay.year()

  // Дни недели
  let weekDaysArray = []
  if (windowWidth !== 0 && windowWidth >= 1120) {
    weekDaysArray = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
  }
  if (windowWidth !== 0 && windowWidth < 1120) {
    weekDaysArray = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
  }

  // Создание сетки
  const startOfMonth = currentDay.startOf('month').startOf('week')
  const endOfMonth = currentDay.endOf('month').endOf('week')
  const calendarData = []
  let day = startOfMonth
  while (!day.isAfter(endOfMonth)) {
    calendarData.push(day)
    day = day.add(1, 'day')
  }

  const prevMonth = () => {
    setCurrentDay(state => state.subtract(1, 'month'))
  }
  const nextMonth = () => {
    setCurrentDay(state => state.add(1, 'month'))
  }
  
  const stylesObj = {
    backgroundColor: 'rgba(240, 128, 128, 0.35)',
    borderRadius: '100%',
  };

  const dayColor = (item) => {
    if (item.isSame(dayjs(), 'day')) {
      return stylesObj
    }
    if (!item.isSame(currentDay, 'month')) {
      return {color: 'var(--table-color-second)'}
    }
  }


  const truncate = (str: string, num: number) => {
    if(str.length <= num) {
        return str;
    } else {
        str = str.slice(0, num);
        return str + "...";
    }
  }

  const compareEvents = (currentDate: any, eventData: any[]) => {
    return eventData.filter(competition => currentDate.isBetween(competition.dateStart, competition.dateEnd, 'day', '[]'))
  }


  return (
    <MainContainer
      contacts={contacts}
      user={user}
      pageName="Календарь соревнований"
    >
      <section className={styles.competition}>
        <h1 className="title animation">Календарь соревнований</h1>
        <div className={`${styles.competition__calendar} ${styles.calendar}`}>
          <div className={styles.calendar__wrapper}>
            <div className={styles.calendar__table}>
              <div className={`${styles.competition__header} ${styles.header}`}>
                <span className={styles.header__month}>{currentMonth}</span>&nbsp;
                <span className={styles.header__year}>{currentYear}</span>
                <div className={styles.header__arrows}>
                  <button className={styles.header__arrow} onClick={prevMonth} id="prevArr">&lt;</button>
                  <button className={styles.header__arrow} onClick={nextMonth} id="nextArr">&gt;</button>
                </div>
              </div>
              {/* Список дней недели */}
              <div className={styles.header__months}>
                {(weekDaysArray as string[]).map((item, i) =>
                  <div key={i} className={styles.header__headItem}>{item}</div>
                )}
              </div>
              {/* Контент */}
              <div className={`${styles.calendar__body} ${styles.body}`}>
                {calendarData.map((item, i) =>
                  <div style={item.day() === 6 || item.day() === 0 ? {backgroundColor: 'var(--bg-table-secod)'} : null} className={styles.body__item} key={i}>
                    <span style={dayColor(item)} className={styles.body__currentDate}>{item.date()}</span>
                    <div className={styles.body__events}>
                      {windowWidth < 830 || compareEvents(item, competitions).length > 3
                        ?
                          <>
                            {
                              <div className={styles.body__unionEvent}>{compareEvents(item, competitions).length !== 0 ? <ToolTipComponent text={compareEvents(item, competitions)}>{`+${compareEvents(item, competitions).length}`}</ToolTipComponent> : null}</div>
                            }
                          </>
                        :
                          <>
                            {competitions.map(competition => (
                              item.isBetween(competition.dateStart, competition.dateEnd, 'day', '[]')
                              ? 
                                <div style={{backgroundColor: `${competition.palette}`}} className={styles.body__event} key={competition.id}><ToolTipComponent text={competition.name}>{truncate(competition.name, 14)}</ToolTipComponent></div> 
                              : 
                                null
                            ))}
                          </>
                      }
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainContainer>
  );
};
// console.log(dayjs(competitions[0].dateStart));

export default Competition;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      // Header/Footer
      const cookies = nookies.get(ctx);
      let user: any = {};
      if (cookies.token !== undefined) {
        const decodedToken = jwt_decode(cookies.token);
        store.dispatch(setUser(decodedToken));
        user = decodedToken;
      }
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'contact');
      const contacts = response.data;

      // await store.dispatch(fetchCompetition())

      return { props: { user, contacts } };
    } catch (error) {
      console.log(error);

      return { props: {} };
    }
  });



function useCallbacl(arg0: () => string) {
  throw new Error("Function not implemented.");
}
  