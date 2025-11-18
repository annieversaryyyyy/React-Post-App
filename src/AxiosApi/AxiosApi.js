import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://posts-blog-4fc01-default-rtdb.europe-west1.firebasedatabase.app",
});