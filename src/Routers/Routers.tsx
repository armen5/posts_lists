import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useGetComments, useGetPosts, useGetUsers } from "../Api/apiQueryHook";
import Home from "../Components/Home";
import SinglePost from "../Components/SinglePost";
import { TEXT } from "../constants"

const Routers = () => {
    const { data: posts, isLoading, isError } = useGetPosts();
    const { data: users } = useGetUsers();
    const { data: comments } = useGetComments();
    return (
        <Router>
            <Routes>
                <Route path="/posts" element={<Home
                    text={TEXT}
                    posts={posts}
                    users={users}
                    comments={comments}
                    isLoading={isLoading}
                    isError={isError}
                />} />
                <Route path="/single-post/:id" element={<SinglePost
                    text={TEXT}
                    posts={posts}
                    users={users}
                    comments={comments}
                    isLoading={isLoading}
                    isError={isError}
                />} />
                <Route
                    path="*"
                    element={
                        <Navigate to="/posts" replace />
                    }
                />
            </Routes>
        </Router >
    );
}

export default Routers;