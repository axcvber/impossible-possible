import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Error } from '../styles'
import CheckIcon from '../../public/tick.svg'
import ErrorIcon from '../../public/error.svg'

const Wrapper = styled.div`
  margin: 15px 0;
`
const StyledField = styled.div`
  width: 100%;
  position: relative;
`
const Input = styled.input<{ isValid: boolean; isError: boolean }>`
  width: 100%;
  height: 45px;
  outline: 0;
  background-color: transparent;
  border: 2px solid
    ${({ isValid, isError, theme }) =>
      (isError && theme.palette?.error) || (isValid && theme.palette?.success) || theme.palette?.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.palette?.text.primary};
  padding: 0 40px 0 15px;
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

const IconWrap = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  width: 15px;
  height: 15px;
`

interface IField {
  name: string
  type?: string
  placeholder?: string
}

const Field: React.FC<IField> = ({ name, type = 'text', placeholder }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, invalid, isDirty } }) => (
        <Wrapper>
          <StyledField>
            <Input
              {...field}
              isValid={!invalid && isDirty}
              isError={!!error?.message}
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
            />
            <IconWrap>
              {error && <ErrorIcon />}
              {!invalid && isDirty && <CheckIcon />}
            </IconWrap>
          </StyledField>
          {error && <Error>{error.message}</Error>}
        </Wrapper>
      )}
    />
  )
}

export default Field
