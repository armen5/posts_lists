import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from "./index.module.scss"

export default function CircularIndeterminate() {
    return (
        <Box sx={{ display: 'flex' }} className={styles.box}>
            <CircularProgress className={styles.progress} />
        </Box>
    );
}