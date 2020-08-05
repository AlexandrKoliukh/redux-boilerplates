import { SerializedError } from '@reduxjs/toolkit';
import {
  browserRoutes,
  dateFormats,
  errorTypes,
  fetchingStatuses,
  mediaQueries,
  modalStateTypes,
  themes,
} from 'utils/constants';

export type IServerException = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  class?: string;
};

export type IError = {
  error: null | SerializedError;
  payload: null | IServerException;
};

export interface IModalProps {
  data: any;
  hideModal: () => void;
}

export interface ILoginData {
  email: string;
  password: string;
}

/*
  Constants types
*/

export type IFetchingStatuses = typeof fetchingStatuses[keyof typeof fetchingStatuses];
export type IThemes = typeof themes[keyof typeof themes];
export type IBrowserRoutes = typeof browserRoutes[keyof typeof browserRoutes];
export type IModalStateTypes = typeof modalStateTypes[keyof typeof modalStateTypes];
export type IErrorTypes = typeof errorTypes[keyof typeof errorTypes];
export type IMediaQueries = typeof mediaQueries[keyof typeof mediaQueries];
export type IDateFormats = typeof dateFormats[keyof typeof dateFormats];

/* * */
