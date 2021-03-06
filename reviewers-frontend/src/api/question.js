import { fetchData } from '../utils/http';

const BASE_QUESTION_API_URL = '/api/questions';

const api = {
  getQuestions: async (pageNo, pageSize) => {
    const url = `${BASE_QUESTION_API_URL}?pageNo=${pageNo}&pageSize=${pageSize}`;
    const json = await fetchData(url, 'GET');
    return Promise.resolve(json);
  },
  newQuestion: async (data) => {
    const url = `${BASE_QUESTION_API_URL}`;
    const json = await fetchData(url, 'POST', data);
    return Promise.resolve(json);
  },
  detailQuestion: async (id) => {
    const url = `${BASE_QUESTION_API_URL}/${id}`;
    const json = await fetchData(url, 'GET');
    return Promise.resolve(json);
  },
  updateQuestion: async (data, id) => {
    const url = `${BASE_QUESTION_API_URL}/${id}`;
    try {
      const json = await fetchData(url, 'PUT', data)
      return Promise.resolve(json);
    } catch (err) { }
  },
  deleteQuestion: async (id) => {
    const url = `${BASE_QUESTION_API_URL}/${id}`;
    try { 
      await fetchData(url, 'DELETE');
      return this.getQuestions(1, 10);
    } catch (err) {}
  }
};

export default api;