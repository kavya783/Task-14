import { fetchLeaveData } from "../apis/getLeaveApi";
import * as types from './actionTypes';


export const getLeaveDataStart = () => {
    return{
        type: types.LOAD_LEAVE_DATA_START,
    }  
};

export const getLeaveDataSuccess = (data) => {
    console.log("this is get action call----->")
    return{
        type: types.LOAD_LEAVE_DATA_SUCCESS,
        payload: data,
    }  
};

export const getLeaveDataError = (error) => {
    return{
        type: types.LOAD_LEAVE_DATA_ERROR,
        payload: error,
    } 
}
export const getLeaveDataActionInitiate = () => {
  return async function (dispatch) {
    dispatch({ type: types.LOAD_LEAVE_DATA_START });

    try {
      const res = await fetchLeaveData();

      console.log("this is get action call----->");
      console.log("res in getLeaveDataActionInitiate", res);

      dispatch({
        type: types.LOAD_LEAVE_DATA_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: types.LOAD_LEAVE_DATA_ERROR,
         payload: error,
      });
    }
  };
};