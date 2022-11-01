import { Box, Modal } from '@mui/material';
import { Props } from '../../Interfaces';

import styles from "./index.module.scss"

const CommentsModal = (props: Props) => {
    const {
        handleCloseModal,
        openModal,
        style,
        comments,
        postId
    } = props;

    return (
        <Modal
            // @ts-ignore
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {comments && comments?.map((comment: { id: number, postId: number, body: string, email: string }) => comment.postId === postId &&
                    <div key={comment.id}>
                        <p className={styles.email}>From <span>{comment?.email}</span></p>
                        <p className={styles.comments}>{comment?.body.charAt(0).toUpperCase() + comment?.body.slice(1)}.</p>
                    </div>)}
            </Box>
        </Modal>
    )
}

export default CommentsModal