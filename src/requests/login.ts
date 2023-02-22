import axios from 'axios';
import { API_URL, API_KEY } from '../config';

export default async function login() {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_URL}api/v1/auth/login`,
    headers: {
      'x-api-key': API_KEY
    }
  };

  return await axios(config)
    .then((response) => {
      const res = response.data as { token: string };
      return res.token;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
}
