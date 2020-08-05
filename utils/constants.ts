import { IError } from 'types';

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

export const browserRoutes = {
  root: '/' as const,
  login: '/login' as const,
};

export const themes = {
  themeDark: 'theme-dark' as const,
  themeLight: 'theme-light' as const,
};

export const languages = {
  en: 'en' as const,
  ru: 'ru' as const,
};

export const localStorageKeys = {
  theme: 'theme' as const,
  accessToken: 'access_token' as const,
};

export const modalStateTypes = {};

export const mediaQueries = {
  sm: '(max-width: 489px)' as const,
  md: '(max-width: 991px)' as const,
};

export const dateRangeSeparator = '&&';
