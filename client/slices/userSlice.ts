import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../types/user'
import { $authHost, $host } from '../http'
import { ICheckUser } from '../types/checkUser'
import { IImages } from '../types/images'

interface UserState {
  users: IUser[]
  oneUser: ICheckUser
  status: 'loading' | 'idle' | 'error' | string
  error: string
  images: IImages[]
  user: IUser | null
  achievements: any[] | null
  avatar: string
}

const initialState: UserState = {
  users: [], 
  oneUser: null,
  status: '',
  error: '',
  images: [],
  user: null,
  achievements: null,
  avatar: ''
}

export const fetchUsers = createAsyncThunk(
  'user/FetchUsers',
  async ( {rejectWithValue}) => {
     const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user')
     const data = await response.data;
     if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data
  }
)

export const fetchUser = createAsyncThunk(
  'user/FetchUser',
  async ( id: number, {rejectWithValue}) => {
     const response = await $host.get(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + id)
     const data = await response.data;
     if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data
  }
)


export const createUsers = createAsyncThunk(
  'user/CreateUsers',
  async (data: any, {rejectWithValue}) => {   
    try {
      const response = await $authHost.post(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + 'registration', data)
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
  'user/DeleteUsers',
  async (id: number, {rejectWithValue}) => {   
    try {
      const response = await $authHost.delete(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + `${id}`)
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


export const deleteImagesItem = createAsyncThunk(
  'user/DeleteImagesUsers',
  async (data, {rejectWithValue}) => {  
    const {id, image, achievementsId}: {id:number, image:string, achievementsId:number} = data  
    try {
      const response = await $authHost.delete(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + `${id}`, {data: {isGalery: true, images: image, achievements: achievementsId}})
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

export const uploadAvatar = createAsyncThunk(
  'user/UploadAvatar',
  async (data, {rejectWithValue}) => {  
    const {id, avatar}: {id:number, avatar:any} = data  
    try {
      const response = await $authHost.post(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + `${id}`, avatar)
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

export const uploadGalery = createAsyncThunk(
  'user/UploadGalery',
  async (data, {rejectWithValue}) => {  
    const {id, files}: {id:number, files:any} = data  
    try {
      const response = await $authHost.post(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + `${id}`, files)
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

export const createAchievements = createAsyncThunk(
  'user/CreateAchievements',
  async (data, {rejectWithValue}) => {  
    const {userId, content}: {id:number, content:string} = data  
    try {
      const response = await $authHost.post(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + `${userId}`, {data: {achievements: content}})
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

export const updateUserCoach = createAsyncThunk(
  'user/UpdateCoach',
  async (data, {rejectWithValue}) => {  
    const {id, coach}: {id:number, coach:string} = data  
    try {
      const response = await $authHost.put(process.env.NEXT_PUBLIC_API_URL + 'api/' + 'user/' + `${id}`, {coach})
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


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ICheckUser>) => {
      state.oneUser = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  },
  extraReducers: builder => {
    builder
       .addCase(fetchUsers.pending, (state) => {
          state.status = 'loading'
       })
       .addCase(fetchUsers.fulfilled, (state, action) => {
          state.status = 'idle';
          state.users = action.payload;
       })
       .addCase(fetchUsers.rejected, (state) => {
          state.status = 'error';
       })
       .addCase(fetchUser.pending, (state) => {
          state.status = 'loading'
       })
       .addCase(fetchUser.fulfilled, (state, action) => {
          state.status = 'idle';
          state.user = action.payload;
       })
       .addCase(fetchUser.rejected, (state) => {
          state.status = 'error';
       })
       .addCase(createUsers.pending, (state) => {
          state.status = 'loading'
       })
       .addCase(createUsers.fulfilled, (state, action) => {
          state.status = 'idle';
          state.users = [...state.users, action.payload];
       })
       .addCase(createUsers.rejected, (state) => {
          state.status = 'error';
       })
       .addCase(uploadGalery.pending, (state) => {
          state.status = 'loading'
       })
       .addCase(uploadGalery.fulfilled, (state, action) => {
          state.status = 'idle';
          state.images = action.payload;
       })
       .addCase(uploadGalery.rejected, (state) => {
          state.status = 'error';
       })
       .addCase(createAchievements.pending, (state) => {
          state.status = 'loading'
       })
       .addCase(createAchievements.fulfilled, (state, action) => {
          state.status = 'idle';
          state.achievements = action.payload;
       })
       .addCase(createAchievements.rejected, (state) => {
          state.status = 'error';
       })
       .addCase(uploadAvatar.pending, (state) => {
          state.status = 'loading'
       })
       .addCase(uploadAvatar.fulfilled, (state, action) => {
          state.status = 'idle';
          state.avatar = action.payload;
       })
       .addCase(uploadAvatar.rejected, (state) => {
          state.status = 'error';
       })
       .addDefaultCase(() => {})
   },
})

export const { setUser, setError } = userSlice.actions
export default userSlice.reducer