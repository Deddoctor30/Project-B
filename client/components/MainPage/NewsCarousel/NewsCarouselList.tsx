// React
import { FC } from "react";
import { IArticle } from "../../../types/article";

// Стили
import styles from "../../../styles/Main.module.scss";

// MUI
import { Skeleton } from "@mui/material";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Логика
import NewsCarouserlItem from "./NewsCarouserlItem";
import { useAppSelector } from "../../../store/hooks";


interface NewsCarouselListProps {
  data: IArticle[];
}

const NewsCarouselList: FC<NewsCarouselListProps> = ({ data }) => {
  const isLoading = useAppSelector((state) => state.mainPage.articleStatus);


  return (
    <>
    {isLoading !== 'idle'
      ?
      <>
        <Skeleton sx={{height: '400px', transform: 'scale(1)'}} animation='wave' />
        <Skeleton sx={{height: '100px'}} animation='wave' />
      </>
      :
        <Swiper
          className={`${styles.main__news} ${styles.news}`}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          loop={true}
          autoHeight={true}
        >
          {data.filter(item => item.swiper).map((content) => (
            <SwiperSlide key={content.id}>
              <NewsCarouserlItem content={content} />
            </SwiperSlide>
          ))}
        </Swiper>
    }
    </>
  );
};

export default NewsCarouselList;
