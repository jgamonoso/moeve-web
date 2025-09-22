export type DemoDataset = 'user1' | 'user2';

export interface AuthUser {
  id: string;             // 'user1' | 'user2' o similar
  displayName: string;
  dataset: DemoDataset;   // dataset para mocks
}
