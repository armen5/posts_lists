import { Card, CardContent, Typography } from '@mui/material';

import styles from "./index.module.scss"
import ErrorHandling from '../Error';
import CircularIndeterminate from '../Loader';
import { Post, Props, User } from '../../Interfaces';
import CommentsModal from '../Modal';
import { useEffect, useRef, useState } from 'react';

const Posts = ({ posts, users, comments, isLoading, isError, openModal, handleCloseModal, handleOpenCommentsModal, style, postId, text }: Props) => {

    const searchInputEl = useRef<HTMLInputElement>(null!);

    const [searchedPost, setsearchedArticle] = useState<string>("");

    const handleSearch = () => {
        setsearchedArticle(searchInputEl.current.value)
    };

    const filterSearchedPosts = (post: Post) => {
        const searchedUsername: any = users?.find((user: User) => user.name.toLowerCase().includes(searchedPost.toLocaleLowerCase()))
        return searchedPost.length >= 3 ? post?.userId == searchedUsername?.id : true;
    };

    useEffect(() => {
        console.log(text);
    }, [window.location.href])

    return (
        <>
            <div className={styles.search_container}>
                <input
                    ref={searchInputEl}
                    placeholder="...search posts by user's name..."
                />
                <button
                    type="submit"
                    onClick={handleSearch}>
                    Search
                </button>
            </div>
            {posts?.length === 0 && <h1>User's Name Not found</h1>}
            <div className={styles.card_container}>
                {!posts || isLoading ?
                    <CircularIndeterminate /> :
                    !posts || isError ?
                        <ErrorHandling /> :
                        posts
                            ?.filter(filterSearchedPosts)
                            ?.map((post: Post) => {
                                return (
                                    <Card sx={{ maxWidth: 540 }} className={styles.card} key={post?.id}>
                                        <>
                                            {users?.map((user: User) => user.id === post.userId && <h1 key={user?.id}><span>Posted by</span>{user.name}</h1>)}
                                            <a href={`/single-post/${post.id}`} className={styles.link}>
                                                <CardContent className={styles.card_content} >
                                                    <Typography variant="body2" color="text.secondary" className={styles.title}>
                                                        {post?.title?.charAt(0).toUpperCase() + post?.title?.slice(1)}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" className={styles.body}>
                                                        {post?.body?.charAt(0).toUpperCase() + post?.title?.slice(1)}
                                                    </Typography>
                                                </CardContent>
                                            </a>
                                            <p className={styles.comments} onClick={() => handleOpenCommentsModal(post.id)}>
                                                Comments
                                            </p>
                                        </>
                                    </Card>
                                )
                            })}
                <CommentsModal
                    handleCloseModal={handleCloseModal}
                    openModal={openModal}
                    style={style}
                    comments={comments}
                    postId={postId}
                />
            </div>
        </>

    )
}

export default Posts