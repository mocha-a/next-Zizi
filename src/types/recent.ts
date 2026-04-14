import { CategoryType } from "./deezer/search";

export type RecentItem = {
  type: CategoryType;
  id: string;
  viewedAt: number;
};