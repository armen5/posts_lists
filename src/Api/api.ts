import axios from "axios";
import { Data } from "../Interfaces";

export async function getPostsApi() {
    const data: Data = await axios.get("https://jsonplaceholder.typicode.com/posts")
    return data?.data
}

export async function getUsersApi() {
    const data: Data = await axios.get("https://jsonplaceholder.typicode.com/users")
    return data?.data
}

export async function getCommentsApi() {
    const data: Data = await axios.get("https://jsonplaceholder.typicode.com/comments")
    return data?.data
}