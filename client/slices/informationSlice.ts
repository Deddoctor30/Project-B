import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import axios from 'axios'
import { ICompetition } from '../types/competition';
import { $host } from '../http';

interface InformationSlice {
  competition: ICompetition[],
  status: string
  error: string
}

export const fetchCompetitions = createAsyncThunk(
   'information/FetchInformation',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'competition')
      return response.data.rows;
   }
) 

const initialState: InformationSlice = {
   competition: [],
   status: 'loading',
   error: ''
}

export const userSlice = createSlice({
  name: 'information',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
   builder
      .addCase(fetchCompetitions.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchCompetitions.fulfilled, (state, action) => {
         state.competition = action.payload;
         state.status = 'idle';
      })
      .addCase(fetchCompetitions.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})


// export const selectCount = (state: RootState) => state.article
// export default userSlice.reducer

const {actions, reducer} = userSlice;

export default reducer;

export const {
} = actions;