import { useState, useRef } from 'react'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export default function SecretLink (props) {
    let boxRef = useRef();
    const [copyConfirmed, setCopyConfirmed] = useState(false)
    const viewSecretRoute = 'shh';

    const protocol = window.location.protocol;
    const host = window.location.host;
    const baseUrl = `${protocol}//${host}/${viewSecretRoute}`;

    const handleButtonClick = (e) => {
        navigator.clipboard.writeText(boxRef.current.innerText).then(function() {
            setCopyConfirmed(true);
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }

    return (
        <Container size="sm">
            { copyConfirmed && <Alert onClose={() => setCopyConfirmed(false)}> Content copied to clipboard! </Alert> }
            <Typography
                variant="h4" 
                color="textPrimary"
                style={{ marginBottom: '20px' }}
            >
                Your secret is ready to share!
            </Typography>

            <Box ref={boxRef} component="p" sx={{ border: '1px dashed grey', padding: '5px', overflowWrap: 'anywhere' }}>
                Here is the link to access the secret object: 
                <br />
                <b>{`${baseUrl}/${props.link}`}</b> 
                <br /><br />
                Please note that the link is valid until <b>{props.validUntil}</b> 
                <br /><br />
                Once you open the link you only have <b>30 seconds</b> to copy the secret message.
            </Box>
            <Button
                type="submit" 
                color="primary" 
                variant="contained"
                onClick={handleButtonClick} 
            >
                Copy message to clipboard
            </Button>
        </Container>
    );
}