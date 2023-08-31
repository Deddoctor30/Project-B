// React
import { FC } from "react";

// Next
import { GetServerSideProps } from 'next';

// Стили
import styles from '../styles/Clinical.module.scss';

//Interface
import { IUser } from '../types/user';
import { IContact } from '../types/contact';

// Логика
import { useAppSelector } from "../store/hooks";
import { fetchClinical } from "../slices/clinicalSlice";
import { setUser } from '../slices/userSlice';
import { wrapper } from '../store/store';
import MainContainer from "../components/MainContainer"
import nookies from 'nookies'
import jwt_decode from "jwt-decode";
import { $host } from '../http';

interface ClinicalProps {
  user: IUser
  contacts: IContact[]
}

const Clinical: FC<ClinicalProps> = ({contacts, user}) => {
  const clinical = useAppSelector(state => state.clinical.clinical)

  const date = new Date()

  const succeedClinical = clinical.filter(item => item.status)
  const denyClinical = clinical.filter(item => item.status === false)
 
  return (
    <MainContainer contacts={contacts} user={user} pageName="Диспансеризация">
        <section className={styles.clinical}>
          <h1 className="title animation">
              Диспансеризация
          </h1>
          <div className={styles.clinical__about}>
              Обязательная диспансеризация спортсменов по допуску к тренировочным занятиям и участию в соревнованиях в {date.getFullYear()} году. 
              <br/>
              <br/>
              Место прохождения диспансеризации - <a className="link" target="_blank" href="http://medcaresport.spb.ru/contact">набережная реки Фонтанки 18 (ГВФД - городской врачебно-физкультурный диспансер)</a>.
          </div>
          <div className={`${styles.clinical__responsibility} ${styles.responsibility}`}>
              <h2 className={styles.responsibility__title}>Всем спортсменам иметь при себе:</h2>
              <div className={styles.responsibility__inner}>
                <div className={styles.responsibility__sign}>
                    <span>!</span>
                </div>
                <ul className={styles.responsibility__items}>
                    <li className={styles.responsibility__item}>сменную обувь</li>
                    <li className={styles.responsibility__item}>полис обязательного мед. страхования</li>
                    <li className={styles.responsibility__item}>баночку с утренней мочой</li>
                    <li className={styles.responsibility__item}>спортсменам старше 15 лет результаты флюорографии</li>
                    <li className={styles.responsibility__item}>мед. амбулаторную карту (для тех, кто пришел в первый раз)</li>
                    <li className={styles.responsibility__item}>согласие на мед. вмешательство и обработку персональных данных (бланк взять в регистратуре)</li>
                </ul>
              </div>
          </div>
          <div className={`${styles.clinical__people} ${styles.people}`}>
              <div className={styles.people__available}>
                <div className={styles.people__img}><img src="./img/clinical/21.png" alt="available"/></div>
                <div className={styles.people__inner}>
                    <h2 className={styles['people__available-title']}>Допущены</h2>
                    <div className={styles['people__available-list']}>
                      <ul className={styles.people__items}>
                          {succeedClinical.map(clinical => 
                            <li key={clinical.id} className={styles.people__item}>{clinical.name}</li>
                          )}
                      </ul>
                    </div>
                </div>
              </div>
              <div className={styles.people__overdue}>
                <div className={styles.people__img}><img src="./img/clinical/22.png" alt="overdue"/></div>
                <div className={styles.people__inner}>
                    <h2 className={styles['people__overdue-title']}>Не допущены</h2>
                    <div className={styles['people__overdue-list']}>
                      <ul className={styles.people__items}>
                        {denyClinical.map(clinical => 
                              <li key={clinical.id} className={styles.people__item}>{clinical.name}</li>
                        )}
                      </ul>
                    </div>
                </div>
              </div>
          </div>
        </section>
    </MainContainer>
  )
}

export default Clinical


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  try {
     const cookies = nookies.get(ctx)
     let user: any = {}
     if (cookies.token !== undefined) {
       const decodedToken = jwt_decode(cookies.token)
       store.dispatch(setUser(decodedToken))
       user = decodedToken
     }
     const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'contact')
     const contacts = response.data;
     
    await store.dispatch(fetchClinical())

     return { props: {user, contacts} };
  } catch (error) {
     console.log(error);

    return { props: {} };
  }
});