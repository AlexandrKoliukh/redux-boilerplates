import { createSlice } from '@reduxjs/toolkit';
import { trimStart } from 'lodash';
import { IFetchingStatuses } from 'types';
import { fetchingStatuses, sliceNames } from 'utils/constants';

const sliceName = sliceNames.fetchingStatuses;

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

        state[actionTypePrefix] = fetchingStatus as IFetchingStatuses;
      }
    ),
});

export const fetchingStatusesSelectors = {
  selectState: (state) => state[sliceName],
  selectByType: (type) => (state) =>
    state[sliceName][type] || fetchingStatuses.idle,
};

export const fetchingStatusesReducer = slice.reducer;

<BlockUI blockingAction={asyncAction}> </BlockUI>
