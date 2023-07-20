import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import axios from 'axios'
import { ICoach } from '../types/coach';
import { $host } from '../http';

interface CoachSlice {
  coach: ICoach[], 
  status: string
  error: string
}

export const fetchCoach = createAsyncThunk(
   'coach/FetchCoaches',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'coach')
      return response.data;
   }
) 

const initialState: CoachSlice = {
   coach: [],
   status: 'loading',
   error: ''
}

export const coachSlice = createSlice({
  name: 'coach',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
   builder
      .addCase(fetchCoach.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchCoach.fulfilled, (state, action) => {
         state.coach = action.payload;
         state.status = 'idle';
      })
      .addCase(fetchCoach.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})


const {actions, reducer} = coachSlice;

export default reducer;

export const {
} = actions;