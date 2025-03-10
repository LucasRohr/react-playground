import { PersonInterface } from "./person";

export interface PageInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: PersonInterface[];
}
