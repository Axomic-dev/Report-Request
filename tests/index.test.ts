import { messageHandler } from '../src/index';
import pubsubRequest from './data/pubsub-request';
import pubsubResponse from './data/pubsub-response';
import login from '../src/requests/login';
import task from '../src/requests/task';
import waitTask from '../src/requests/check';
import { publish } from '../src/pubsub';

jest.mock('../src/requests/login', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue('token')
}));
jest.mock('../src/requests/task', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue('exec-id')
}));
jest.mock('../src/requests/check', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(true)
}));
jest.mock('../src/pubsub', () => ({ publish: jest.fn().mockResolvedValue(true) }));

describe("Cloud function's message handler mocking", () => {
  test('When everything goes right', async () => {
    await messageHandler(pubsubRequest, pubsubResponse);

    expect(login).toHaveBeenCalledTimes(1);
    expect(task).toHaveBeenCalledTimes(3);
    expect(waitTask).toHaveBeenCalledTimes(1);
    expect(publish).toHaveBeenCalledTimes(1);
    expect(pubsubResponse.status).toHaveBeenCalledTimes(1);
    expect(pubsubResponse.end).toHaveBeenCalledTimes(1);
  });
});
