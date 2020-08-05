import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const thunkErrorHandler = (error: AxiosError, thunkAPI) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(error.response);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);
    toast.warn(error.message);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  // console.error(error.config);
  return thunkAPI.rejectWithValue(error.response.data);
};

export const asyncThunkHandler = (
  asyncFunction,
  prepareCallback?: (data) => typeof data
) => async (data, thunkAPI) => {
  try {
    const response = await asyncFunction(data);
    return prepareCallback ? prepareCallback(response.data) : response.data;
  } catch (err) {
    return thunkErrorHandler(err, thunkAPI);
  }
};
