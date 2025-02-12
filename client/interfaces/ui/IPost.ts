import { IComment } from "./IComment";

export interface IPost {
  _id: string;
  author: {
    id: string;
    name: string;
  };
  text: string;
  comments: IComment[];
}
