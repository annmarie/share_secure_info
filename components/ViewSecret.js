import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export default function ViewSecret (props) {
    const [tick, setTick] = useState(10);
    const [destroySecret, setDestroySecret] = useState(false);
    const [copyConfirmed, setCopyConfirmed] = useState(false);

    useEffect(() => {
        let interval = setInterval(() => {
            setTick(prevState => prevState - 1)
            if (tick <= 1) {
                setDestroySecret(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    const handleBoxClick = (e) => {
        navigator.clipboard.writeText(e.target.innerText).then(function() {
            setCopyConfirmed(true);
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
    }

    const unit = tick > 1 ? 'seconds' : 'second';
    const validComponent = (
        <Container size="sm">
            { copyConfirmed && <Alert onClose={() => setCopyConfirmed(false)}> Secret copied to clipboard! </Alert> }
            <Typography
                variant="h4" 
                color="textPrimary"
                style={{ marginBottom: '20px' }}
            >
                Secret message will be destroyed in {`${tick} ${unit}`}.
            </Typography>

            <Box onClick={handleBoxClick} component="p" sx={{ border: '1px dashed grey', padding: '5px', overflowWrap: 'anywhere' }}>
                {props.secret}
            </Box>
        </Container>
    );

    const invalidComponent = (
        <Container size="sm">
            <Typography
                variant="h4" 
                color="textPrimary"
                style={{ marginBottom: '20px' }}
            >
                Secret message is destroyed.
            </Typography>
        </Container>
    );

    return destroySecret ? invalidComponent : validComponent;
}