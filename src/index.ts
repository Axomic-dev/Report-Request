import { Request as Req, Response as Res } from 'express';
import { PubsubMessage, PubsubRequest } from './interfaces';

export function messageHandler(req: Req, res: Res) {
  try {
    const rawData = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    const { docId, tier, jobs } = JSON.parse(rawData) as PubsubRequest;
    const result: PubsubMessage = { docId, tier, token: '', requests: {} };
    console.info(result);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(200).end();
  }
}
console.info('Server started listening to topic...');
