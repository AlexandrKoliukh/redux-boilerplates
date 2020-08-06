import { IError } from '../types';

export const fetchingStatuses = {
  pending: 'pending' as const,
  rejected: 'rejected' as const,
  fulfilled: 'fulfilled' as const,
  idle: 'idle' as const,
};

// https://date-fns.org/v2.14.0/docs/format
export const dateFormats = {
  dateAndTime: 'PPpp' as const,
  date: 'PP' as const,
  numDate: 'P' as const,
};

export const initialError: IError = {
  error: null,
  payload: null,
};

export const errorTypes = {
  auth: 'auth' as const,
  common: 'common' as const,
};
