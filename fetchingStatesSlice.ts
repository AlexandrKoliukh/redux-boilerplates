import { createSlice } from '@reduxjs/toolkit';
import { trimStart } from 'lodash';
import { IFetchingStatuses } from 'types';
import { fetchingStatuses } from 'utils/constants';

const sliceName = 'fetchingStatuses';

const loadingTypesRegExp = new RegExp(
  `(/${fetchingStatuses.pending}|/${fetchingStatuses.fulfilled}|/${fetchingStatuses.rejected})$`
);

const slice = createSlice({
  name: sliceName,
  reducers: {},
  initialState: {} as Record<string, IFetchingStatuses>,
  extraReducers: (builder) =>
    builder.addMatcher(
      // @ts-ignore
      (action) => loadingTypesRegExp.test(action.type),
      (state, action) => {
        const [match] = action.type.match(loadingTypesRegExp);
        const fetchingStatus = trimStart(match, '/');
        const actionTypePrefix = action.type.replace(loadingTypesRegExp, '');

        state[actionTypePrefix] = fetchingStatus;
      }
    ),
});

export default slice.reducer;

export const fetchingStatusesSelectors = {
  selectState: (state) => state[sliceName],
  selectByType: (type) => (state) =>
    state[sliceName][type] || fetchingStatuses.idle,
};
