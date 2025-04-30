import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import formReducer from './slices/formSlice';

const store = configureStore({
    reducer: {
        data: dataReducer,
        form: formReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
