import { fetchEmployeeData } from '../apis/getEmployeeApi';
import * as types from './actionTypes';


export const getEmployeeDataStart = () => {
    return{
        type: types.LOAD_EMPLOYEE_DATA_START,
    }  
};

export const getEmployeeDataSuccess = (data) => {
    console.log("this is get action call----->")
    return{
        type: types.LOAD_EMPLOYEE_DATA_SUCCESS,
        payload: data,
    }  
};

export const getEmployeeDataError = (error) => {
    return{
        type: types.LOAD_EMPLOYEE_DATA_ERROR,
        payload: error,
    } 
}
export const getEmployeeDataActionInitiate = () => {
  return async function (dispatch) {
    dispatch(getEmployeeDataStart());
  
    try {
      const res = await fetchEmployeeData();
      console.log("res",res)
      dispatch(getEmployeeDataSuccess(res));
    } catch (error) {
      dispatch(getEmployeeDataError(error.message)); 
    }
  };
};