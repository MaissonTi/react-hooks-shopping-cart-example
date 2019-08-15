import axios from 'axios';

import { url } from './keymarvel';

const api = axios.create({
  baseURL: url,
});

export default api;
