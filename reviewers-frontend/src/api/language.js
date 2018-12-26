import { fetchData } from '../utils/http';

const BASE_LANGUAGE_API_URL = '/api/languages';

const api = {
  getLanguages: async () => {
    const url = `${BASE_LANGUAGE_API_URL}`;
    const json = await fetchData(url, 'GET');
    return Promise.resolve(json);
  }
}

export default api;