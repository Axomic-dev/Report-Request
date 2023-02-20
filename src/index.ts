import { Request as Req, Response as Res } from 'express';
import { PubsubRequest, BoufinRequest, BoufinResponse } from './interfaces';
import login from './requests/login';
import task from './requests/task';
import check from './requests/check';
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
    // const requests: Record<Action, string> = {};
    // let nextJob = {};
    // for (nextJob in jobs) {
    //   const executionId = await task(nextJob as BoufinRequest, token);
    //   const executionAction = (nextJob as BoufinRequest).action.split(':')[0];
    //   if (executionId) {
    //     requests[executionAction] = executionId;
    //   }
    // }
    // const lastExecution = (nextJob as BoufinRequest).action.split(':')[0];
    // let boufinResult: BoufinResponse;
    // do {
    //   await new Promise((resolve) => setTimeout(resolve, 200));
    //   boufinResult = await check(token, requests[lastExecution]);
    // } while (boufinResult?.taskStatusCode != 200);
    // await publish({ docId, tier, token, requests });
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(200).end();
  }
}
console.info('Server started listening to topic...');
