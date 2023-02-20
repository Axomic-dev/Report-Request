import { Request as Req, Response as Res } from 'express';

export function messageHandler(req: Req, res: Res) {
  try {
    const rawData = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    const message = JSON.parse(rawData);
    console.info('called');
    console.info(message);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(200).end();
  }
}
console.info('Server started listening to topic...');
