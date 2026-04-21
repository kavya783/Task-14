import { updateEmployeeData } from '../apis/updateEmployeeApi';
import * as types from './actionTypes';


export const updateEmployeeDataStart = () => {
  return {
    type: types.UPDATE_EMPLOYEE_DATA_START,
  }
};

export const updateEmployeeDataSuccess = (data) => {
  console.log("this is update action call----->")
  return {
    type: types.UPDATE_EMPLOYEE_DATA_SUCCESS,
    payload: data,
  }
};

export const updateEmployeeDataError = (error) => {
  return {
    type: types.UPDATE_EMPLOYEE_DATA_ERROR,
    payload: error,
  }
}
export const updateEmployeeDataActionInitiate = (Employee, id) => {
  return async (dispatch) => {
    dispatch(updateEmployeeDataStart());
    try {
       await updateEmployeeData(Employee, id);
      dispatch(updateEmployeeDataSuccess({ ...Employee, id }));
    } catch (error) {
      dispatch(updateEmployeeDataError(error.message));
    }
  };
};