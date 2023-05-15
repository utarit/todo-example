export interface Todo {
  id: number;
  content: string;
  archived: boolean;
  created: Date;
  lastUpdated?: Date;
}
