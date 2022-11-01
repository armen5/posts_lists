import { Card, CardContent, Typography } from '@mui/material';

import styles from "./index.module.scss"
import ErrorHandling from '../Error';
import CircularIndeterminate from '../Loader';
import { Post, Props, User } from '../../Interfaces';
import CommentsModal from '../Modal';
import { useEffect, useRef, useState } from 'react';

const Posts = (props: Props) => {
    const {
        posts,
        users,
        comments,
        isLoading,
        isError,
        openModal,
        handleCloseModal,
        handleOpenCommentsModal,
        style,
        postId,
        text
    } = props;

    const searchInputEl = useRef<HTMLInputElement>(null!);

    const [searchedPost, setsearchedPost] = useState<string>("");
    const [user, setUser] = useState<User>();

    const handleSearch = () => {
        setsearchedPost(searchInputEl.current.value);
    };

    const filterSearchedPosts = (post: Post) => {
        return searchedPost.length >= 3 ? post.userId === user?.id : true;
    };

    useEffect(() => {
        setUser(users?.find((user: User) => user.name.toLowerCase().includes(searchedPost.toLocaleLowerCase())));
    }, [searchedPost]);

    useEffect(() => {
        console.log(text);
    }, [window.location.href]);

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
                                                        {post?.title.replace(post?.title[0], post?.title[0].toUpperCase())}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" className={styles.body}>
                                                        {post?.title.replace(post?.title[0], post?.title[0].toUpperCase())}
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