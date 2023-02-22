import axios from 'axios';
import { BoufinResponse } from '../interfaces';
import { API_URL } from '../config';

const fail: BoufinResponse = {
  taskStatusCode: 400,
  taskStatus: 'Error: Response failed at reception.',
  results: Object()
};

async function check(token: string, taskId: string) {
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

export default async function waitTask(taskId: string, token: string, timeout: number) {
  const startTime = new Date().getTime();
  let boufinResult: BoufinResponse;
  do {
    const now = new Date().getTime();
    if (now - startTime >= timeout) {
      return false;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    boufinResult = await check(token, taskId);
  } while (boufinResult.taskStatusCode != 200);
  return true;
}
