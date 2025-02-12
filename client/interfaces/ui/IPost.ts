import { IComment } from "./IComment";

export interface IPost {
  id: string;
  author: string;
  image: string;
  text: string;
  comments: IComment[];
}
