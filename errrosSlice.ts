import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IError, IErrorTypes } from 'types';
import { fetchingStatuses, initialError } from 'utils/constants';
import { toast } from "react-toastify";

const sliceName = 'errors';

const rejectedRegExp = new RegExp(`/${fetchingStatuses.rejected}$`)

const errors = createSlice({
  name: sliceName,
  initialState: {} as Record<string, IError>,
  reducers: {
    resetError: (state, { payload }: PayloadAction<{ type: IErrorTypes }>) => {
      const { type } = payload;
      state[type] = initialError;
    },
    resetAll: () => ({} as Record<string, IError>),
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // @ts-ignore
      (action) => action.type.endsWith(fetchingStatuses.rejected),
      (state, action) => {
        const { error, payload } = action;
        const actionType = action.type.replace(rejectedRegExp, '');

        state[actionType] = {
          error,
          payload,
        } as IError;

        const message = payload?.detail || error?.message;
        toast.error(message);
      }
    );
  },
});

export const errorsActions = errors.actions;

export const errorsSelectors = {
  selectState: (state) => state[sliceName],
  selectByType: (type) => (state) => state[sliceName][type] || initialError,
}

export default errors.reducer;
