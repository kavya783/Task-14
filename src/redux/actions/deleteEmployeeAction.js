import * as types from "./actionTypes";
import { deleteEmployeeData } from "../apis/deleteEmployeeApi";

export const deleteEmployeeDataStart = () => ({
  type: types.DELETE_EMPLOYEE_DATA_START,
});

export const deleteEmployeeDataSuccess = (id) => ({
  type: types.DELETE_EMPLOYEE_DATA_SUCCESS,
  payload: id,
});

export const deleteEmployeeDataError = (error) => ({
  type: types.DELETE_EMPLOYEE_DATA_ERROR,
  payload: error,
});

export const deleteEmployeeDataActionInitiate = (id) => {
  return async function (dispatch) {
    dispatch(deleteEmployeeDataStart());

    try {
      await deleteEmployeeData(id);
      dispatch(deleteEmployeeDataSuccess(id));
      return true;   
    } catch (error) {
      dispatch(deleteEmployeeDataError(error));
    }
  };
};