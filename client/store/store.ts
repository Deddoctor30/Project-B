import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE, MakeStore} from 'next-redux-wrapper';

import user from '../slices/userSlice';
import mainPage from '../slices/mainPageSlice';
import admin from '../slices/adminSlice';
import contact from '../slices/contactSlice';
import information from '../slices/informationSlice';
import coach from '../slices/coachSlice';
import achievements from '../slices/achievementsSlice';
import clinical from '../slices/clinicalSlice';
import competition from '../slices/competitionSlice'

const combinedReducers = combineReducers({
      user,
      mainPage,
      admin,
      contact,
      information,
      coach,
      achievements,
      clinical,
      competition
})

export type OurStore = ReturnType<typeof combinedReducers>

const rootReducer = (state: ReturnType<typeof combinedReducers>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return combinedReducers(state, action)
}

export const store = configureStore<OurStore>({
  reducer: rootReducer,
})


const makeStore: MakeStore = () => store

export const wrapper = createWrapper(makeStore, { storeKey: 'key' })

export type MyThunkDispatch = typeof store.dispatch


// ------------------------------------------------------------------ ниже старое

export type RootStore = ReturnType<typeof makeStore>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch