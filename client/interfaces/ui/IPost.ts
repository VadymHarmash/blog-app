import { IComment } from "./IComment";

export interface IPost {
  id: string;
  author: string;
  text: string;
  comments: IComment[];
}
