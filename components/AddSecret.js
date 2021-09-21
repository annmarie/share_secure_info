import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

function convertTime(unit, unitType) {
    let result;

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

export default function Create() {
  const classes = useStyles()
  const [comment, setComment] = useState('')
  const [secret, setSecret] = useState('')
  const [secretError, setSecretError] = useState(false)
  const [unit, setUnit] = useState('')
  const [unitError, setUnitError] = useState(false)
  const [unitType, setUnitType] = useState('minutes')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSecretError(false)
    setUnitError(false)

    if (secret.trim() === '') {
        setSecretError(true)
    }
    if (unit.trim() === '' || +unit <= 0) {
        setUnitError(true)
    }
    console.log(title, details, category)
  }

  return (
    <Container size="sm">
       <Typography
            variant="h3" 
            color="textPrimary"
            style={{ marginBottom: '20px' }}
      >
        Create New Secret
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormLabel component="legend">Comment</FormLabel>
        <TextField className={classes.field}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Enter comment here" 
            variant="outlined" 
            color="primary" 
            multiline
            rows={4}
            fullWidth
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
        />

        <FormLabel component="legend">Valid Until</FormLabel>
        <div style={{ marginBottom: '10px', paddingLeft: 0 }}>
            <TextField 
                onChange={(e) => setUnit(e.target.value)}
                label="Enter a number"
                variant="outlined"
                color="primary"
                required
                fullWidth="false"
                error={unitError}
                style={{ width: '200px', marginRight: '10px'}}
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