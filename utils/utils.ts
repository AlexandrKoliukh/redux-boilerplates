import webThemes, { changeTheme as changeWebTheme } from 'web-themes';
import { IThemes } from 'types';
import { localStorageKeys, themes } from './constants';

const getBrowserTheme = (): IThemes => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? themes.themeDark
    : themes.themeLight;
};

export const changeTheme = (theme: IThemes) => {
  changeWebTheme(
    theme,
    `${process.env.PUBLIC_URL}${webThemes[theme]}`,
    window['link'],
    (link: HTMLLinkElement) => (window['link'] = link) // <link href="theme-dark.css" rel="text/css"/>
  );
};

export const getTheme = (): IThemes => {
  return (
    (localStorage.getItem(localStorageKeys.theme) as IThemes) ||
    getBrowserTheme()
  );
};
