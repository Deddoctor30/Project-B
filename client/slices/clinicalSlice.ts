import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import axios from 'axios'
import { IClinical } from '../types/clinical';
import { $host } from '../http';

interface ClinicalSlice {
  clinical: IClinical[], 
  status: string
  error: string
}

export const fetchClinical = createAsyncThunk(
   'clinical/FetchClinical',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'clinical')
      return response.data;
   }
) 


const initialState: ClinicalSlice = {
   clinical: [],
   status: 'loading',
   error: ''
}

export const clinicalSlice = createSlice({
  name: 'clinical',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
   builder
      .addCase(fetchClinical.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchClinical.fulfilled, (state, action) => {
         state.clinical = action.payload;
         state.status = 'idle';
      })
      .addCase(fetchClinical.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})


const {actions, reducer} = clinicalSlice;

export default reducer;

export const {
} = actions;