import * as types from "./actionTypes";
import { saveEmployeeData } from "../apis/addEmployeeApi";

export const addEmployeeDataStart = () => 
  ({
     type: types.CREATE_EMPLOYEE_DATA_START });
export const addEmployeeDataSuccess = (Employee) => ({
  type: types.CREATE_EMPLOYEE_DATA_SUCCESS,
  payload: Employee
});
export const addEmployeeDataError = (error) => ({
  type: types.CREATE_EMPLOYEE_DATA_ERROR,
  payload: error
});

export const addEmployeeDataActionInitiate = (Employee) => {
  return async (dispatch) => {
    dispatch(addEmployeeDataStart());
    try {
      const res = await saveEmployeeData(Employee);
      const newEmployee = { ...Employee, id: res.name }; // Firebase generated ID
      dispatch(addEmployeeDataSuccess(newEmployee));
    } catch (error) {
      dispatch(addEmployeeDataError(error.message));
    }
  };
};