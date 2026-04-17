import * as types from "./actionTypes";
import { deleteLeaveData } from "../apis/deleteLeaveApi";

export const deleteLeaveDataStart = () => ({
  type: types.DELETE_LEAVE_DATA_START,
});

export const deleteLeaveDataSuccess = (id) => ({
  type: types.DELETE_LEAVE_DATA_SUCCESS,
  payload: id,
});

export const deleteLeaveDataError = (error) => ({
  type: types.DELETE_LEAVE_DATA_ERROR,
  payload: error,
});

export const deleteLeaveDataActionInitiate = (id) => {
  return async function (dispatch) {
    dispatch(deleteLeaveDataStart());

    try {
      await deleteLeaveData(id);
      dispatch(deleteLeaveDataSuccess(id));
      return true;   
    } catch (error) {
      dispatch(deleteLeaveDataError(error));
    }
  };
};