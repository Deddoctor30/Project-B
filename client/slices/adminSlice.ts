import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { $authHost, $host } from '../http';
import { IArticle } from '../types/article';
import { ICoach } from '../types/coach';
import { ICompetition } from '../types/competition';
import { IContact } from '../types/contact';
import { IClinical } from '../types/clinical';


export const fetchData = createAsyncThunk(
   'admin/fetchData',
   async (section: string) => {
      const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + section)
      if (section === 'clinical' || section === 'contact' || section === 'coach' || section === 'user') {
         return response.data;
      } else {
         return response.data.rows;
      }
   }
) 


export const createData = createAsyncThunk(
   'admin/createData',
   async (data, {rejectWithValue}) => {    
      const {section, formData}: {section:string, formData:FormData} = data
      try {
         const response = await $authHost.post(process.env.NEXT_PUBLIC_API_URL + 'api/' + section, formData)
         if (response?.status === 200) {
            return await response.data
          }
          return `${response.status} : ${response.statusText}`;
      } catch (error) {
         if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
      }
   }
) 


export const updateData = createAsyncThunk(
   'admin/updateData',
   async (data, {rejectWithValue}) => {    
      const {section, formData}: {section:string, formData:FormData} = data
      try {
         const response = await $authHost.put(process.env.NEXT_PUBLIC_API_URL + 'api/' + section, formData)
         if (response?.status === 200) {
            return await response.data
          }
          return `${response.status} : ${response.statusText}`;
      } catch (error) {
         if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
      }
   }
) 

export const deleteDataItem = createAsyncThunk(
   'admin/deleteData',
   async (data, {rejectWithValue}) => {    
      const {section, id, images}: {section:string, id:number, images:any[]} = data
      try {
         const response = await $authHost.delete(process.env.NEXT_PUBLIC_API_URL + 'api/' + section + `/${id}`, {data: {images: images}})
         if (response?.status === 200) {
            return await response.data
          }
          return `${response.status} : ${response.statusText}`;
      } catch (error) {
         if (!error.response) {
            throw error
          }
          return rejectWithValue(error.response.data)
      }
   }
) 


export const updateUserRole = createAsyncThunk(
   'user/UpdateUserRole',
   async (data, {rejectWithValue}) => {  
     const {id, role}: {id:number, role:string} = data  
     try {
       const response = await $authHost.put(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user', {data: {id, role}})
       if (response?.status === 200) {
         return await response.data
       }
       return `${response.status} : ${response.statusText}`;
     } catch (error) {
       if (!error.response) {
         throw error
       }
       return rejectWithValue(error.response.data)
     }
   }
 ) 

interface AdminSlice {
   section: string,
   dataItems: any[],
   status: string,
   error: any,
   element: IArticle | ICoach | ICompetition | IContact | IClinical | object
 }

const initialState: AdminSlice = {
   section: '',
   dataItems: [],
   status: 'loading',
   error: null,
   element: {}
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    sectionChanger: (state, action: PayloadAction<string>) => {
      state.section = action.payload
    },
    deleteStateItems: (state, action: PayloadAction<number>) => {
      state.dataItems = state.dataItems.filter(item => item.id !== action.payload)
    },
    setElement: (state, action: PayloadAction<object>) => {
      state.element = action.payload
    },
  },
  extraReducers: builder => {
   builder
      .addCase(fetchData.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
         state.status = 'idle';
         state.dataItems = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
         state.status = 'error';
         state.error = action.payload
      })
      .addCase(createData.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(createData.fulfilled, (state, action) => {
         state.status = 'idle';
         state.dataItems.push(action.payload)
      })
      .addCase(createData.rejected, (state, action) => {
         state.status = 'error';
         state.error = action.payload
      })
      .addCase(deleteDataItem.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(deleteDataItem.fulfilled, (state) => {
         state.status = 'idle';
      })
      .addCase(deleteDataItem.rejected, (state) => {
         state.status = 'error';
      })
      .addCase(updateData.pending, (state) => {
         state.status = 'loading'
      })
      .addCase(updateData.fulfilled, (state, action) => {
         state.status = 'idle';
         state.element = action.payload;
      })
      .addCase(updateData.rejected, (state) => {
         state.status = 'error';
      })
      .addDefaultCase(() => {})
  },
  
})


// export const selectCount = (state: RootState) => state.article
// export default userSlice.reducer

const {actions, reducer} = adminSlice;

export default reducer;

export const {
   sectionChanger,
   deleteStateItems,
   setElement
} = actions;