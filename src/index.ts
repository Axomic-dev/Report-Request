import { Request as Req, Response as Res } from 'express';
import { PubsubRequest } from './interfaces';
import login from './requests/login';
import task from './requests/task';
import waitTask from './requests/check';
import { publish } from './pubsub';
import { Action } from './boufin';

export async function messageHandler(req: Req, res: Res) {
  try {
    const rawData = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    const { docId, tier, jobs } = JSON.parse(rawData) as PubsubRequest;
    const token = await login();
    if (!token) {
      throw new Error('[Boufin] Failed when login into Boufin API');
    }
    const requests: Record<Action, string> = {};
    const actions: Array<string> = [];
    console.info('Succesfully logged in. Starting bots from API...');
    for (const job of jobs) {
      const executionId = await task(job, token);
      const executionAction = job.action.split(':')[1];
      if (executionId) {
        actions.push(executionId);
        requests[executionAction] = executionId;
      }
    }
    const lastExecution = actions[actions.length - 1];
    console.info(`Bots started. Waiting task with ID ${lastExecution} to end`);
    const success = await waitTask(lastExecution, token, 30000);
    if (success) {
      await publish({ docId, tier, token, requests });
    } else {
      throw new Error('[Boufin] Timeout reached, check if bots are running');
    }
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(200).end();
  }
}
console.info('Server started listening to topic...');
