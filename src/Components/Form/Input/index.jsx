import PropTypes from 'prop-types';
import {useRef, useEffect} from 'react';
import {Label, Input} from 'reactstrap';
import {useField} from '@unform/core';

export default function NormalizeInput({label, name, type, ...rest}) {
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
    <>
      {label && <Label>{label}</Label>}
      <Input type={type} innerRef={inputRef} name={fieldName} defaultValue={defaultValue} {...rest}/>
      {error && <span className="error">{error}</span>}
    </>
  );
};

NormalizeInput.defaultProps = {
    type: 'text',
};

NormalizeInput.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
}