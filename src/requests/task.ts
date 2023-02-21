import axios from 'axios';
import { API_URL } from '../config';
import { BoufinRequest } from '../interfaces';

export default async function (job: BoufinRequest, token: string) {
  const { action, username, password } = job;
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${API_URL}api/v1/tasks`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      action,
      args: {
        username,
        password
      }
    }
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
