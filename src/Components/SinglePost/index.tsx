import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Card, CardContent, Typography } from '@mui/material';

import styles from "./index.module.scss"
import ErrorHandling from "../../Pages/Error";
import CircularIndeterminate from '../../Pages/Loader';
import { Post, User } from "../../Interfaces";
import CommentsModal from "../../Pages/Modal";
import { STYLE } from "../../constants";

const SinglePost = ({ text, posts, users, comments, isLoading, isError }: any) => {
    const { id } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [postId, setPostId] = useState<any>();

    const singlePost = posts?.find((post: Post) => post.id === Number(id))

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenCommentsModal = (postId: number) => {
        setOpenModal(true);
        setPostId(postId);
    };

    useEffect(() => {
        console.log(text);
    }, [])

    return (
        <div className={styles.card_container}>
            {!posts || isLoading ?
                <CircularIndeterminate /> :
                !posts || isError ?
                    <ErrorHandling /> :
                    <Card sx={{ maxWidth: 540 }} className={styles.card}>
                        {users?.map((user: User) => user.id === singlePost.userId && <h1 key={user?.id}><span>Posted by</span>{user.name}</h1>)}
                        <CardContent className={styles.card_content} >
                            <Typography variant="body2" color="text.secondary" className={styles.title}>
                                {singlePost?.title.charAt(0).toUpperCase() + singlePost?.title.slice(1)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className={styles.body}>
                                {singlePost?.body.charAt(0).toUpperCase() + singlePost?.title.slice(1)}
                            </Typography>
                        </CardContent>
                        <p className={styles.comments} onClick={() => handleOpenCommentsModal(singlePost.id)}>Comments</p>
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