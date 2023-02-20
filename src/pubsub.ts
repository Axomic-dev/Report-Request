import { PubSub } from '@google-cloud/pubsub';
import { GCP_SUBSCRIPTION } from './config';
import { PubsubMessage } from './interfaces';

const pubSubClient = new PubSub();

export async function publish(data: PubsubMessage) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  try {
    await pubSubClient
      .topic(GCP_SUBSCRIPTION)
      .publishMessage({ data: dataBuffer })
      .then((messageId) => {
        console.info(`[Pub/Sub] Message with ID ${messageId} has been published`);
      });
    return true;
  } catch (error) {
    console.error(`[Pub/Sub] Received error while publishing: ${error}`);
    return false;
  }
}
