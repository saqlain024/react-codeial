export * from './constants';

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
