import { AxiosResponse } from "axios";
import { $axios } from "./axios/axiosInstance";
import { IPostsResponse } from "../../interfaces/responses/IPostsResponse";

export default class AuthService {
  static async getPosts(): Promise<AxiosResponse<any>> {
    return await $axios.get<any>("/posts");
  }

  static async getPost(id: string): Promise<AxiosResponse<any>> {
    return await $axios.get<any>(`/posts/${id}`);
  }

  static async getPostsByAuthor(authorId: string): Promise<AxiosResponse<any>> {
    return await $axios.get<any>(`/posts/${authorId}`);
  }

  static async addPost(
    text: string,
    authorId: string,
  ): Promise<AxiosResponse<any>> {
    return await $axios.post<any>("/posts/add", { text, authorId });
  }

  static async editPost(id: string, text: string): Promise<AxiosResponse<any>> {
    return await $axios.put<any>(`/posts/edit/${id}`, { text });
  }

  static async deletePost(id: string): Promise<AxiosResponse<any>> {
    return await $axios.delete<any>(`/posts/delete/${id}`);
  }

  static async commentPost(
    postId: string,
    author: string,
    text: string,
  ): Promise<AxiosResponse<any>> {
    return await $axios.post(`/posts/comment`, { postId, author, text });
  }
}
