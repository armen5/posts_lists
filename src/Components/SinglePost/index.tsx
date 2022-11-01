import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent, Typography } from '@mui/material';

import styles from "./index.module.scss";
import ErrorHandling from "../../Pages/Error";
import CircularIndeterminate from '../../Pages/Loader';
import { ISinglePost, Post, Props, User } from "../../Interfaces";
import CommentsModal from "../../Pages/Modal";
import { STYLE } from "../../constants";

const SinglePost = (props: Props) => {
    const {
        text,
        posts,
        users,
        isError,
        comments,
        isLoading,
    } = props;

    const { id } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [postId, setPostId] = useState<number>();
    const [postsData, setPostsData] = useState<ISinglePost>();

    if (posts?.length) {
        posts?.find((post: Post) => post.id === Number(id));
    };

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenCommentsModal = (postId: number | undefined) => {
        setOpenModal(true);
        setPostId(postId);
    };

    useEffect(() => {
        console.log(text);
        setPostsData(posts?.find((post: Post) => post.id === Number(id)));
    }, [posts]);

    return (
        <div className={styles.card_container}>
            {!posts || isLoading ?
                <CircularIndeterminate /> :
                !posts || isError ?
                    <ErrorHandling /> :
                    <Card sx={{ maxWidth: 540 }} className={styles.card}>
                        {users?.map((user: User) => user.id === postsData?.userId && <h1 key={user?.id}><span>Posted by</span>{user.name}</h1>)}
                        <CardContent className={styles.card_content} >
                            <Typography variant="body2" color="text.secondary" className={styles.title}>
                                {postsData?.title.replace(postsData?.title[0], postsData?.title[0].toUpperCase())}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className={styles.body}>
                                {postsData?.body.replace(postsData?.body[0], postsData?.body[0].toUpperCase())}
                            </Typography>
                        </CardContent>
                        <p className={styles.comments} onClick={() => handleOpenCommentsModal(postsData?.id)}>Comments</p>
                    </Card>
            }
            <CommentsModal
                handleCloseModal={handleCloseModal}
                openModal={openModal}
                style={STYLE}
                comments={comments}
                postId={postId}
            />
        </div>
    )
}

export default SinglePost