import { Response } from 'express';

const pubsubResponse = {
  status: jest.fn().mockReturnThis(),
  end: jest.fn()
} as unknown as Response;

export default pubsubResponse;
