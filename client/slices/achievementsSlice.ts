import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import axios from 'axios'
import { IArticle } from '../types/article';
import { $host } from '../http';

interface AchievementsSlice {
  article: IArticle[],
  status: string
  error: string
  page: number
  totalCount: number
  limit: number
}

export const fetchAchievements = createAsyncThunk(
   'achievements/FetchAchievements',
   async (data: object) => {
      const {page, limit}: {page:number, limit:number} = data;
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'article', {params: {page, limit}})
      return response.data.rows;
   }
)

const initialState: AchievementsSlice = {
   article: [],
   status: 'loading',
   error: '',
   page: 1,
   totalCount: 1,
   limit: 3
}

export const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
  },
  extraReducers: builder => {
   builder
      .addCase(fetchAchievements.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
         state.article = action.payload;
         state.status = 'idle';
      })
      .addCase(fetchAchievements.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})


const {actions, reducer} = achievementsSlice;

export default reducer;

export const {
   setTotal,
   setPage,
   setLimit
} = actions;