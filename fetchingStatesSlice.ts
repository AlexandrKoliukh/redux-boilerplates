import { createSlice } from '@reduxjs/toolkit';

import { trimStart } from 'lodash';

const sliceName = 'thunkStatuses';

type ThunkStatuses = 'pending' | 'fulfilled' | 'rejected';

const loadingTypesRegExp = new RegExp(`(/pending|/fulfilled|/rejected)$`);


/**
 * Для всех санков текущий статус будет сохраняться сюда.
 * Если для типа санка нет статуса, значит санк не был задействован
 */
const slice = createSlice({
  name: sliceName,
  reducers: {},
  initialState: {} as Record<string, ThunkStatuses>,
  extraReducers: (builder) =>
    builder.addMatcher(
      (action) => loadingTypesRegExp.test(action.type),
      (state, action) => {
        const [match] = action.type.match(loadingTypesRegExp);
        const fetchingStatus = trimStart(match, '/');
        const actionTypePrefix = action.type.replace(loadingTypesRegExp, '');

        state[actionTypePrefix] = fetchingStatus as ThunkStatuses;
      }
    ),
});

export const thunkStatusesSelectors = {
  selectState: (state: RootState) => state[sliceName],
  selectByType: (type) => (state: RootState) =>
    state[sliceName][type] || ('idle' as const),
};

export const thunkStatusesReducer = slice.reducer;

export const useThunkStatus = (thunkAction: AsyncThunk<any, any, any>) => {
  const actionStatus = useAppSelector(
    thunkStatusesSelectors.selectByType(thunkAction.typePrefix)
  );

  const result = useMemo(() => {
    return {
      actionStatus,
      isPending: actionStatus === 'pending',
      isSuccess: actionStatus === 'fulfilled',
    }
  }, [actionStatus])

  return result;
};
