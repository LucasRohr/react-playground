import { PersonInterface } from "./person";

export interface PageInterface<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
