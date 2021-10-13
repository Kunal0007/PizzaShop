import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Alerts = (props) => {

    const { alert } = props;

    return (
        alert ?
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={alert.type}>{alert.msg}</Alert>
            </Stack>
            : <></>
    )
}

export default Alerts
