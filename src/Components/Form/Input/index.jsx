import PropTypes from 'prop-types';
import {useRef, useEffect, useState} from 'react';
import { useField } from '@unform/core'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({label, name, ...rest}) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  return (
    <Box
      component="form"
      sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
      noValidate
      autoComplete="off"
    >
      <TextField inputRef={inputRef} defaultValue={defaultValue} label={label} name={name} variant="outlined" {...rest} />
      {error && <span className="error">{error}</span>}
    </Box>
  );
};

Input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
}