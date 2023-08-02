// store.js

import { configureStore } from '@reduxjs/toolkit';

// Initial state of the store
const initialState = {
  isAdmin: false,
  favorites: [], // Default value is false, you can change it based on your requirements
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
          favorites: [...state.favorites, action.payload], // Add the item to favorites array
        };
        case "REMOVE_FROM_FAVORITES":
          return {
            ...state,
            favorites: state.favorites.filter((item) => item.id !== action.payload), // Remove the item from favorites array
          };
    default:
      return state;
  }
};

// Create the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,
});

export default store;
