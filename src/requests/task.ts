import axios from 'axios';
import { API_URL } from '../config';
import { BoufinRequest } from '../interfaces';

export default async function task(job: BoufinRequest, token: string) {
  const { action, username, password } = job;
  const data = JSON.stringify({
    action,
    args: {
      username,
      password
    }
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_URL}api/v1/tasks`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data
  };

  return await axios(config)
    .then((response) => {
      const res = response.data as { taskId: string };
      return res.taskId;
    })
    .catch((error) => {
      console.log(error);
      return undefined;
    });
}
