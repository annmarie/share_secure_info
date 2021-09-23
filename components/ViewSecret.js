import { useState, useEffect, useRef } from 'react'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { decryptSecret } from 'providers/encryptionProvider';

export default function ViewSecret (props) {
    let boxRef = useRef();
    const [tick, setTick] = useState(30);
    const [destroySecret, setDestroySecret] = useState(false);
    const [copyConfirmed, setCopyConfirmed] = useState(false);
    const { secretData, onSecretDestroy } = props;

    const decrypted = decryptSecret(secretData);
    let secret = decrypted.link;
    let comment = decrypted.comment;

    useEffect(() => {
        let interval = setInterval(() => {
            setTick(prevState => prevState - 1)
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = (e) => {
        navigator.clipboard.writeText(boxRef.current.innerText).then(function() {
            setCopyConfirmed(true);
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }

    useEffect(() => {
        if (tick < 1) {
            setDestroySecret(true);
            onSecretDestroy();
        }
    },[tick])
    
    const unit = tick > 1 ? 'seconds' : 'second';
    const commentComponent = (
        <>
            <Typography
                variant="h5" 
                color="textPrimary"
            >
                Instructions from secret generator:
            </Typography>
            <p>{comment}</p>
        </>
    );

    const validComponent = (
        <Container size="sm">
            { copyConfirmed && <Alert onClose={() => setCopyConfirmed(false)}> Secret copied to clipboard! </Alert> }
            <Typography
                variant="h4" 
                color="textPrimary"
                style={{ marginBottom: '10px' }}
            >
                Secret message will be destroyed in {`${tick} ${unit}`}.
            </Typography>

            { comment.trim().length && commentComponent }

            <Box ref={boxRef} component="div" sx={{ border: '1px dashed grey', marginTop: '10px', padding: '5px', overflowWrap: 'anywhere' }}>
                <pre>
                    {secret}
                </pre>
            </Box>
            <Button
                type="submit" 
                color="primary" 
                variant="contained"
                onClick={handleButtonClick} 
            >
                Copy secret to clipboard
            </Button>
        </Container>
    );

    const invalidComponent = (
        <Container size="sm" style={{ textAlign: 'center' }}>
            <Typography
                variant="h4" 
                color="textPrimary"
                style={{ marginBottom: '20px' }}
            >
                Secret message destroyed.
            </Typography>
        </Container>
    );

    return destroySecret ? invalidComponent : validComponent;
}