import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IArticle } from '../types/article';
import { ICompetition } from '../types/competition';
import { $host } from '../http';

interface MainPageSlice {
  article: IArticle[], 
  competition: ICompetition[],
  articleStatus: string
  competitionStatus: string
  error: string
}

export const fetchArticles = createAsyncThunk(
   'article/FetchArticles',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'article')
      return response.data.rows;
   }
) 

export const fetchCompetitions = createAsyncThunk(
   'competition/FetchCompetitions',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'competition')
      return response.data.rows;
   }
) 

const initialState: MainPageSlice = {
   article: [],
   competition: [],
   articleStatus: 'loading',
   competitionStatus: 'loading',
   error: '',
}

export const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
   builder
      .addCase(fetchArticles.pending, (state) => {
         state.articleStatus = 'loading'
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
         state.article = action.payload;
         state.articleStatus = 'idle';
      })
      .addCase(fetchArticles.rejected, (state) => {
         state.articleStatus = 'error';
      })
      .addCase(fetchCompetitions.pending, (state) => {
         state.competitionStatus = 'loading'
      })
      .addCase(fetchCompetitions.fulfilled, (state, action) => {
         state.competition = action.payload;
         state.competitionStatus = 'idle';
      })
      .addCase(fetchCompetitions.rejected, (state) => {
         state.competitionStatus = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})

const {actions, reducer} = mainPageSlice;
export default reducer;