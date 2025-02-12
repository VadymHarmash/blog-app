import { AxiosResponse } from "axios";
import { $axios } from "./axios/axiosInstance";

export default class AuthService {
  static async getPosts(): Promise<AxiosResponse<any>> {
    return await $axios.get<AxiosResponse<any>>("/posts");
  }

  static async getPostsByAuthor(authorId: string): Promise<AxiosResponse<any>> {
    return await $axios.get<AxiosResponse<any>>(`/posts/${authorId}`);
  }

  static async addPost(
    text: string,
    authorId: string,
  ): Promise<AxiosResponse<any>> {
    return await $axios.post<any>("/posts/add", { text, authorId });
  }

  static async editPost(id: string, text: string): Promise<AxiosResponse<any>> {
    return await $axios.put(`/posts/edit/${id}`, { text });
  }

  static async deletePost(id: string): Promise<AxiosResponse<any>> {
    return await $axios.delete<AxiosResponse<any>>(`/posts/delete/${id}`);
  }
}
