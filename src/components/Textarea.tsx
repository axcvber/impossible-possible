import React from 'react'
import styled from 'styled-components'
import { Controller, useFormContext } from 'react-hook-form'
import { Error } from '../styles'

const StyledTextarea = styled.textarea<{ isValid: boolean; isError: boolean }>`
  border: 2px solid
    ${({ isValid, isError, theme }) =>
      (isError && theme.palette?.error) || (isValid && theme.palette?.success) || theme.palette?.secondary};
  width: 100%;
  color: ${({ theme }) => theme.palette?.text.primary};
  height: 100px;
  resize: none;
  padding: 10px 15px;
  border-radius: 5px;
  outline: 0;
  background-color: transparent;
  font-size: 15px;
  &::placeholder {
    opacity: 1;
    color: ${({ theme }) => theme.palette?.text.primary};
  }
  &:focus {
    &::placeholder {
      opacity: 0.5;
    }
  }
`

interface ITextarea {
  name: string
  placeholder?: string
}

const Textarea: React.FC<ITextarea> = ({ name, placeholder }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, invalid, isDirty } }) => (
        <>
          <StyledTextarea
            isValid={!invalid && isDirty}
            isError={!!error?.message}
            placeholder={placeholder}
            {...field}
          ></StyledTextarea>
          {error && <Error>{error.message}</Error>}
        </>
      )}
    />
  )
}

export default Textarea
