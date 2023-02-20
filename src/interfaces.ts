import { Action, DocumentTier, EntityId } from './boufin';

export type AnyObject = Record<string, unknown> | Record<string, never>;

interface BoufinData {
  username: string;
  entityId: EntityId;
  data: AnyObject;
}

export interface BoufinResponse {
  taskStatusCode: number;
  taskStatus: string;
  results: BoufinData | Record<string, never>;
}

export interface BoufinRequest {
  action: string;
  username: string;
  password: string;
}

export interface PubsubRequest {
  docId: string;
  tier: DocumentTier;
  jobs: Array<BoufinRequest>;
}

export interface PubsubMessage {
  docId: string;
  token: string;
  tier: DocumentTier;
  requests: Record<Action, string>;
}
