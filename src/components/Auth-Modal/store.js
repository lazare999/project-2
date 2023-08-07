// store.js

import { configureStore } from '@reduxjs/toolkit';

// Initial state of the store
const initialState = {
  isAdmin: false,
  favorites: [], 
};

// Reducer function to handle actions and update state
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ADMIN_STATUS':
      return {
        ...state,
        isAdmin: action.payload,
      };
      case "ADD_TO_FAVORITES":
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
        case "REMOVE_FROM_FAVORITES":
          return {
            ...state,
            favorites: state.favorites.filter((item) => item.id !== action.payload),
          };
    default:
      return state;
  }
};

// Load initial state from local storage, if available
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : initialState;

// Create the Redux store using configureStore and pass the persisted state
const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

// Save the state to local storage whenever the state changes
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
