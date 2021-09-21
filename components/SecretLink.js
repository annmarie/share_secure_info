import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export default function SecretLink (props) {
    const [copyConfirmed, setCopyConfirmed] = useState(false)

    const handleBoxClick = () => {
        navigator.clipboard.writeText(props.link).then(function() {
            setCopyConfirmed(true);
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }

    return (
        <Container size="sm">
            { copyConfirmed && <Alert onClose={() => setCopyConfirmed(false)}> Secret link copied to clipboard! </Alert> }
            <Typography
                variant="h4" 
                color="textPrimary"
                style={{ marginBottom: '20px' }}
            >
                Your secret is ready to share!
            </Typography>

            <Box onClick={handleBoxClick} component="p" sx={{ border: '1px dashed grey', padding: '5px', overflowWrap: 'anywhere' }}>
                {props.link}
            </Box>
        </Container>
    );
}