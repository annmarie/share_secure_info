import { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

function convertTime(unitString, unitType) {
    let result;
    const unit = parseInt(unitString)
    
    if (unitType === 'minutes') {
        result = parseInt(unit) * 60000
    } else if (unitType === 'hours') {
        result = parseInt(unit) * 60000 * 60
    } else {
        result = parseInt(unit) * 60000 * 60 * 24
    }

    return result
}

const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
    },
    formControl: {
        width: 200,
    }
  })

export default function AddSecret(props) {
  const classes = useStyles()
  const [instruction, setInstruction] = useState('')
  const [secret, setSecret] = useState('')
  const [secretError, setSecretError] = useState(false)
  const [duration, setDuration] = useState(10)
  const [durationError, setDurationError] = useState(false)
  const [unitType, setUnitType] = useState('minutes')
  const { onSecretSubmit } = props

  const handleSubmit = (e) => {
    e.preventDefault()

    setSecretError(false)
    setDurationError(false)

    if (secret.trim() === '') {
        setSecretError(true)
    }
    if (duration <= 0) {
        setDurationError(true)
    }
    onSecretSubmit(instruction, secret, convertTime(duration, unitType))
  }

  return (
    <Container size="sm">
       <Typography
            variant="h4" 
            color="textSecondary"
            style={{ marginBottom: '48px' }}
      >
        Create Secret
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormLabel component="legend">Instruction</FormLabel>
        <TextField className={classes.field}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            label="Enter instruction here" 
            variant="outlined" 
            color="primary" 
            multiline
            rows={4}
            fullWidth
            style={{ marginBottom: '32px' }}
        />

        <FormLabel component="legend">Secret</FormLabel>
        <TextField className={classes.field}
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            label="Enter secret here"
            variant="outlined"
            color="primary"
            multiline
            rows={10}
            fullWidth
            required
            error={secretError}
            style={{ marginBottom: '48px' }}
        />

        <FormLabel component="legend">Valid For</FormLabel>
        <div style={{ marginBottom: '10px', paddingLeft: 0 }}>
            <TextField 
                onChange={(e) => setDuration(e.target.value)}
                label="Enter a positive number"
                variant="outlined"
                color="primary"
                required
                fullWidth={false}
                error={durationError}
                style={{ width: '200px', marginRight: '10px'}}
                value={duration}
            />
            <FormControl variant='outlined' className={classes.formControl}>
                <Select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    style={{ width: '200px' }}
                >
                    <MenuItem value={'minutes'}>Minute(s)</MenuItem>
                    <MenuItem value={'hours'}>Hour(s)</MenuItem>
                    <MenuItem value={'days'}>Day(s)</MenuItem>
                </Select>
            </FormControl>
        </div>

        <Button
          type="submit" 
          color="primary" 
          variant="contained"
        >
          Submit
        </Button>
      </form>

    </Container>
  )
}