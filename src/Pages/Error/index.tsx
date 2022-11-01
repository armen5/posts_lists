import { Stack, Alert, AlertTitle } from '@mui/material';

import styles from "./index.module.scss"

const ErrorHandling = () => {
    return (
        <Stack sx={{ width: '80%' }} spacing={2} className={styles.stack}>
            <Alert severity="error" className={styles.alert}>
                <AlertTitle>Error</AlertTitle>
                Something went wrong <strong>can't be loaded</strong>
            </Alert>
        </Stack>
    )
}

export default ErrorHandling