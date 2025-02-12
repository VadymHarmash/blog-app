import { $axios } from "./axios/axiosInstance";

export default class AuthService {
  static async getPosts() {
    return await $axios.get("/posts");
  }

  static async getPost(id: string) {
    return await $axios.get(`/posts/${id}`);
  }

  static async getPostsByAuthor(authorId: string) {
    return await $axios.get(`/posts/author/${authorId}`);
  }

  static async addPost(text: string, authorId: string) {
    return await $axios.post("/posts/add", { text, authorId });
  }

  static async editPost(id: string, text: string) {
    return await $axios.put(`/posts/edit/${id}`, { text });
  }

  static async deletePost(id: string) {
    return await $axios.delete(`/posts/delete/${id}`);
  }

  static async commentPost(postId: string, author: string, text: string) {
    return await $axios.post(`/posts/comment`, { postId, author, text });
  }
}
