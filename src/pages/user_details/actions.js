
import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
  } from './constants';
  
  export const fetchUsersRequest = () => ({
    type: FETCH_USERS_REQUEST,
  });
  
  export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
  });
  
  export const fetchUsersFailure = (error) => ({
    type: FETCH_USERS_FAILURE,
    payload: error,
  });
  
  export const createUserRequest = (userData) => ({
    type: CREATE_USER_REQUEST,
    payload: userData,
  });
  
  export const createUserSuccess = (user) => ({
    type: CREATE_USER_SUCCESS,
    payload: user,
  });
  
  export const createUserFailure = (error) => ({
    type: CREATE_USER_FAILURE,
    payload: error,
  });
  
  export const updateUserRequest = (userId, updatedData) => ({
    type: UPDATE_USER_REQUEST,
    payload: { userId, updatedData },
  });
  
  export const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    payload: user,
  });
  
  export const updateUserFailure = (error) => ({
    type: UPDATE_USER_FAILURE,
    payload: error,
  });
  