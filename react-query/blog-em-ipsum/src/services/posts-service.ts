export class PostsService {
  constructor() {}

  async getPosts({ pageNum = 1 }) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
    );
    return response.json();
  }

  async getComments(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
  }

  async deletePost(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      { method: "DELETE" }
    );
    return response.json();
  }

  async updatePost(postId) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ title: "REACT QUERY FOREVER!!!!" }),
      }
    );
    return response.json();
  }
}
