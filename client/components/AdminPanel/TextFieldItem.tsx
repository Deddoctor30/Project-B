// React
import React from 'react'

// MUI
import TextField from '@mui/material/TextField';

const TextFieldItem = ({id, label, type, value, setValue, rows = 1, autoFocus = false, required = false, helper = ''}) => {
  return (
      <TextField
        helperText = {helper}
        autoFocus = {autoFocus}
        margin="dense"
        id={id}
        label={label}
        type={type}
        fullWidth
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={rows}
        multiline
        required={required}
        />
  )
}

export default TextFieldItem