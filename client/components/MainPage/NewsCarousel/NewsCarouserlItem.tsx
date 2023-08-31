/* eslint-disable @next/next/no-img-element */
// React
import { FC } from "react";

// Стили
import styles from "../../../styles/Main.module.scss";

// Логика
import { IArticle } from "../../../types/article";
import imgProvider from "../../../utiles/imgProvider";


interface NewsCarouserlItemProps {
  content: IArticle;
}

const NewsCarouserlItem: FC<NewsCarouserlItemProps> = ({ content }) => {
  const secondImages = content?.images.slice(1);

  return (
    <div>
      <div className={styles.news__item}>
        <div className={styles.news__img}>
          <div style={content?.images.length === 1 ? {flex: '0 1 100%', padding: '0px 0px 60% 0px'} : null} className={styles["news__main-img"]}>
            <img
              style={content?.images.length === 1 ? {objectFit: 'contain'} : null}
              key={content?.images[0]?.id}
              src={imgProvider(content?.images[0]?.img)}
              alt={content.name}
            />
          </div>
          {content?.images.length > 1 &&
            <div style={content?.images.length === 2 ? {gridTemplateColumns: '1fr'} : null} className={styles["news__second-img"]}>
              {
                secondImages.map((item) => (
                  <img
                    key={item.id}
                    src={imgProvider(item.img)}
                    alt={content.name}
                  />
                ))
                }
            </div>
          }
        </div>
        <div className={styles.news__content}>{content.content}</div>
      </div>
    </div>
  );
};

export default NewsCarouserlItem;
