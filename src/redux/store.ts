import {AnyAction, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {api} from "api/api";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {dashBoardReducer} from "redux/dashBoardSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        dashBoard: dashBoardReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

export type RootStateType = ReturnType<typeof store.getState>;
export type ThunkAppDispatchType = ThunkDispatch<RootStateType, any, AnyAction>;

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>();
