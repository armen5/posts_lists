import { useQuery } from "react-query";
import { getCommentsApi, getPostsApi, getUsersApi, } from "./api";

export const useGetPosts = () => {
    return useQuery(['Posts'], () =>
        getPostsApi(),
    )
}

export const useGetUsers = () => {
    return useQuery(["Users"], () =>
        getUsersApi()
    )
}

export const useGetComments = () => {
    return useQuery(["Comments"], () =>
        getCommentsApi()
    )
}