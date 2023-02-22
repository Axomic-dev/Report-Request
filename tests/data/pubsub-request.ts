import { Request } from 'express';

const requestPayload = {
  docId: '25fb98c828b0612ec3ff68296fee1b1691027646618b34dcdf7e6605b45fff4c',
  tier: 'standard',
  jobs: [
    { action: 'afc:consolidate', username: '111111111', password: '011AAA110s' },
    { action: 'cmf:debt', username: '111111111', password: '011AAA110s' },
    { action: 'sii:tax-folder', username: '111111111', password: '011AAA110s' }
  ]
};
const pubsubRequest = {
  body: {
    message: {
      data: Buffer.from(JSON.stringify(requestPayload)).toString('base64')
    }
  }
} as Request;
export default pubsubRequest;
