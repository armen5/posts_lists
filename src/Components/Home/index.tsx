import { useState } from "react";

import Posts from "../../Pages/Posts";
import styles from "./index.module.scss";
import { STYLE } from "../../constants";
import { Props } from "../../Interfaces";

const Home = (props: Props) => {
    const {
        text,
        posts,
        users,
        comments,
        isLoading,
        isError
    } = props;

    const [openModal, setOpenModal] = useState(false);
    const [postId, setPostId] = useState<number>();

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenCommentsModal = (postId: number) => {
        setOpenModal(true);
        setPostId(postId);
    };

    return (
        <div className={styles.background}>
            <Posts
                posts={posts}
                users={users}
                comments={comments}
                isLoading={isLoading}
                isError={isError}
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleOpenCommentsModal={handleOpenCommentsModal}
                style={STYLE}
                postId={postId}
                text={text}
            />
        </div>
    )
};

export default Home;