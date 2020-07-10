import { configureStore, combineReducers, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import tabs from './tabs';

const rootReducer = combineReducers({
    tabs
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector =
    <TSelected = unknown>(selector: (state: RootState) => TSelected, equalityFn?: (left: TSelected, right: TSelected) => boolean): TSelected =>
        useSelector(selector, equalityFn);
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>
