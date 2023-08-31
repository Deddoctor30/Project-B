import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IContact } from '../types/contact';
import { $host } from '../http';

interface ContactSlice {
  contact: IContact[], 
  status: string
  error: string
}

export const fetchContact = createAsyncThunk(
   'contact/FetchFooter',
   async () => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'contact')
      return response.data;
   }
)

const initialState: ContactSlice = {
   contact: [],
   status: 'loading',
   error: ''
}

export const coachSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
   builder
      .addCase(fetchContact.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
         state.contact = action.payload;
         state.status = 'idle';
      })
      .addCase(fetchContact.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})

const {actions, reducer} = coachSlice;
export default reducer;