import { fetch } from 'whatwg-fetch';

export const fetchData = (url, method, data) => {
  const options = {
    method,
    credentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            // common http error...
            console.error('REQUEST ERROR', response);
            return Promise.reject(response);
          } 

          console.log('FETCH SUCCESS', response);
          
          if (response.status === 204) {
            return response;
          } else {
            return response.json();
          }
        });
};