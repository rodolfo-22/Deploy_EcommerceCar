import axios from 'axios';
import { getEnvVariable } from '../helpers/getEnvVariable';

const { VITE_API_URL } = getEnvVariable();

const EcommerApi = axios.create({
  baseURL: VITE_API_URL
});

export default EcommerApi;
