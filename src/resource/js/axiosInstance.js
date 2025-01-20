import axios from 'axios'

const axios_instance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  withCredentials: true,
  withXSRFToken: true,
})

export default axios_instance
// window.axios = axios;
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// axios.defaults.withCredentials = true
// axios.defaults.withXSRFToken = true
