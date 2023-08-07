// actions.js

export const setAdminStatus = (isAdmin) => {
    return {
      type: 'SET_ADMIN_STATUS',
      payload: isAdmin,
    };
  };


  export const addToFavorites = (item) => {
    return {
      type: "ADD_TO_FAVORITES",
      payload: item,
    };
  };

  export const removeFromFavorites = (itemId) => {
    return {
      type: "REMOVE_FROM_FAVORITES",
      payload: itemId,
    };
  };

  export const resetAdminStatus = () => {
    return {
      type: 'SET_ADMIN_STATUS',
      payload: false,
    };
  };