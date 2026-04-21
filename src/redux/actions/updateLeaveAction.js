import { updateLeaveData } from '../apis/updateLeaveApi';
import * as types from './actionTypes';


export const updateLeaveDataStart = () => {
  return {
    type: types.UPDATE_LEAVE_DATA_START,
  }
};

export const updateLeaveDataSuccess = (data) => {
  console.log("this is update action call----->")
  return {
    type: types.UPDATE_LEAVE_DATA_SUCCESS,
    payload: data,
  }
};

export const updateLeaveDataError = (error) => {
  return {
    type: types.UPDATE_LEAVE_DATA_ERROR,
    payload: error,
  }
}
export const updateLeaveDataActionInitiate = (Leave, id) => {
  return async (dispatch) => {
    dispatch(updateLeaveDataStart());
    try {
      await updateLeaveData(Leave, id);

      dispatch(updateLeaveDataSuccess({ ...Leave, _id: id }));
    } catch (error) {
      dispatch(updateLeaveDataError(error.message));
    }
  };
};