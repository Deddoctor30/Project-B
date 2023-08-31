import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $host } from '../http';
import { ICompetition } from '../types/competition';

interface CompetitionSlice {
  competition: ICompetition[], 
  status: string
  error: string
}

export const fetchCompetition = createAsyncThunk(
   'competition/FetchCompetition',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'competition')
      return response.data.rows;
   }
) 

const initialState: CompetitionSlice = {
   competition: [],
   status: 'loading',
   error: ''
}

export const competitionSlice = createSlice({
  name: 'competition',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
   builder
      .addCase(fetchCompetition.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchCompetition.fulfilled, (state, action) => {
         state.competition = action.payload;
         state.status = 'idle';
      })
      .addCase(fetchCompetition.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
})

const {reducer} = competitionSlice;
export default reducer;
