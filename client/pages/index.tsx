// React
import { FC, useEffect, useState } from "react";

// Next
import { GetServerSideProps } from "next";

// Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Стили
import styles from "../styles/Main.module.scss";

// Логика
import { useAppSelector, useAppDispatch } from "../store/hooks";
import MainContainer from "../components/MainContainer";
import { IArticle } from "../types/article";
import { ICompetition } from "../types/competition";
import NewsCarouselList from "../components/MainPage/NewsCarousel/NewsCarouselList";
import { fetchArticles, fetchCompetitions } from "../slices/mainPageSlice";
import CompetitionList from "../components/MainPage/Competition/CompetitionList";
import { wrapper } from "../store/store";
import { setUser } from "../slices/userSlice";

import nookies from 'nookies'
import jwt_decode from "jwt-decode";
import { $host } from "../http";
import { IUser } from "../types/user";
import { IContact } from "../types/contact";


interface HomeProps {
  user: IUser
  contacts: IContact[]
}

const Home: FC<HomeProps> = ({user, contacts}) => {
  const articleItems = useAppSelector((state) => state.mainPage.article);
  const competitionItems = useAppSelector((state) => state.mainPage.competition);
 
  return (
    <MainContainer pageName="Фехтовальный клуб Project B" user={user} contacts={contacts}>
      <main className={styles.main}>
        <h1 className={`${"title"} ${"animation"}`}>Клуб СТАРТ</h1>

        <NewsCarouselList data={articleItems as IArticle[]} />

        <CompetitionList data={competitionItems as ICompetition[]}/>
      </main>
    </MainContainer>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
    try {
      // Header/Footer
      const cookies = nookies.get(ctx)
      let user: any = {}
      if (cookies.token !== undefined) {
        const decodedToken = jwt_decode(cookies.token)
        store.dispatch(setUser(decodedToken))
        user = decodedToken
      } else {
        store.dispatch(setUser(null))
      }
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'contact')
      const contacts = response.data;
      
      await store.dispatch(fetchArticles())
      await store.dispatch(fetchCompetitions())

      return { props: {user, contacts} };
    } catch (error) {
      console.log(error);

      return { props: {} };
    }
});
