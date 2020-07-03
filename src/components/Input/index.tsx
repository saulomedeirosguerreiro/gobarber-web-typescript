import React, { InputHTMLAttributes, useEffect, useRef, useCallback, useState} from 'react';
import {useField} from '@unform/core';
import {IconBaseProps} from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon:Icon, ...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocussed] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const {fieldName, defaultValue, error, registerField} = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocussed(true);
    },[]);

    const handleInputBlur = useCallback(() => {
        setIsFocussed(false);
        setIsFilled(!! inputRef.current?.value);
    },[]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path:'value'
        });
    },[fieldName, registerField]);

  return (
      <Container isFilled={isFilled} isFocused={isFocused} >
          {Icon && <Icon size={20}/>}
          <input onFocus={handleInputFocus} onBlur={handleInputBlur} ref={inputRef} defaultValue={defaultValue}  {...rest}/>
          {error}
      </Container>
  );
}

export default Input;
