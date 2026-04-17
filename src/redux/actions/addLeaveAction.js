import * as types from "./actionTypes";
import { saveLeaveData } from "../apis/addLeaveApi";

export const addLeaveDataStart = () => ({
  type: types.CREATE_LEAVE_DATA_START,
});

export const addLeaveDataSuccess = (Leave) => ({
  type: types.CREATE_LEAVE_DATA_SUCCESS,
  payload: Leave,
});

export const addLeaveDataError = (error) => ({
  type: types.CREATE_LEAVE_DATA_ERROR,
  payload: error,
});

export const addLeaveDataActionInitiate = (Leave) => {
  return async (dispatch) => {
    dispatch(addLeaveDataStart());
    try {
      const res = await saveLeaveData(Leave);
      const newLeave = { ...Leave, id: res };
      dispatch(addLeaveDataSuccess(newLeave));
    } catch (error) {
      dispatch(addLeaveDataError(error.message));
    }
  };
};