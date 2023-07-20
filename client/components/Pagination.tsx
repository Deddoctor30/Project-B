// React
import React from 'react'

// Стили
import styles from '../styles/Pagination.module.scss';

// Логика
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPage } from '../slices/achievementsSlice';


const Pagination = () => {
   const dispatch = useAppDispatch()
   const totalCount = useAppSelector(state => state.achievements.totalCount)
   const currentPage = useAppSelector(state => state.achievements.page)
   const limit = useAppSelector(state => state.achievements.limit)
   const pageCount = Math.ceil(totalCount / limit)
   const pages = []

   for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
   }


  return (
      <ul className={styles.pagination}>
         {pages.map(page => 
            <li key={page} className={styles.pagination__item}><span onClick={() => dispatch(setPage(page))} style={page === currentPage ? {backgroundColor: '#1D84B5', border: '1px solid #1D84B5', color: 'white'} : null} className={styles.pagination__inner}>{page}</span></li>
         )}
      </ul>
  )
}

export default Pagination