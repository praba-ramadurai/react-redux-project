import { configureStore } from '@reduxjs/toolkit';
import autoCompleteReducer from 'features/auto-complete/AutoCompleteSlice';

export const store = configureStore({
  reducer: {
    place: autoCompleteReducer,
  },
});
