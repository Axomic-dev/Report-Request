import axios from 'axios';
import { BoufinResponse } from '../interfaces';
import { API_URL } from '../config';

const fail: BoufinResponse = {
  taskStatusCode: 400,
  taskStatus: 'Error: Response failed at reception.',
  results: Object()
};

export default async function (token: string, taskId: string) {
  const config = {
    method: 'get',
    url: `${API_URL}api/v1/tasks/${taskId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await axios(config);
    const body = await response.data;
    return body as BoufinResponse;
  } catch (error) {
    console.error(error);
    return fail;
  }
}
