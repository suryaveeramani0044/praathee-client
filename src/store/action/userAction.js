import { toast } from "react-toastify";
import AxiosInstance from "../../api/api";

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "LOADING_ON" });
    const response = await AxiosInstance.get(`/`);
    if (response) {
      dispatch({
        type: "SET_USERS",
        payload: response.data.data,
      });
      dispatch({ type: "LOADING_OFF" });
    }
  } catch (e) {
    console.log(e);
    dispatch({ type: "LOADING_OFF" });
  }
};

export const addUser = (data) => async (dispatch) => {
  try {
    const response = await AxiosInstance.post(`/`, data);
    console.log("response", response.data);
    if (response) {
      dispatch({
        type: "ADD_USER",
        payload: response.data.data,
      });
      toast.success("user added successfully");
    }
  } catch (e) {
    toast.error(
      e.response.data.errors.msg ? e.response.data.errors.msg : e.message
    );
  }
};

export const updateUer = (data, id) => async (dispatch) => {
  try {
    const response = await AxiosInstance.patch(`/${id}`, data);

    if (response) {
      dispatch({
        type: "UPDATE_USER",
        payload: response.data.data,
      });
      toast.success("user updated successfully");
    }
  } catch (e) {
    toast.error(
      e.response.data.errors.msg ? e.response.data.errors.msg : e.message
    );
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await AxiosInstance.delete(`/${id}`);
    if (response?.data?.count === 1) {
      dispatch({ type: "DEL_USER", payload: id });
    }
    toast.info("user deleted successfully");
  } catch (e) {
    console.log(e);
    toast.error(
      e.response.data.errors?.msg ? e.response.data.errors?.msg : e.message
    );
  }
};
