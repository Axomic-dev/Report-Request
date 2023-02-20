import { Request as Req, Response as Res } from 'express';

export async function messageHandler(req: Req, res: Res) {
  try {
    const rawData = Buffer.from(req.body, 'base64');
    const message = JSON.parse(rawData.toString('utf-8'));
    console.info('called');
    console.info(message);
  } catch (error) {
    console.error(error);
  }
  res.status(200).end();
}
console.info('Server started listening to topic...');
