import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export default function SecretLink (props) {
    return (
        <Container size="sm">
            <Typography
                variant="h4" 
                color="textPrimary"
                style={{ marginBottom: '20px' }}
            >
                Your secret is ready to share !
            </Typography>

            <Box component="p" sx={{ p: 2, border: '1px dashed grey' }}>
            </Box>
        </Container>
    );
}