import { json } from 'react-router-dom';

export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    console.error('can not store LS');
  }

  const valueToStore = typeof value != 'string' ? json.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('cannot get value from LS');
  }

  localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('cannot get value from LS');
  }

  localStorage.removeItem(key);
};

// {username: 'saqlain' , password; '123123'}
export const getFormBody = (params) => {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user-name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // saqlain 123 => saqlain%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&'); // 'username=saqlain&password=123123'
};
