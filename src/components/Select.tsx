import React from 'react'
import styled, { css } from 'styled-components'
import { Controller, useFormContext } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { useOnClickOutside } from '../hooks/useClickOutside'
import { Arrow, Error } from '../styles'
import { ServicesOptions } from '../sections/Form'

const CustomSelect = styled.div`
  position: relative;
  user-select: none;
  width: 100%;
  margin-bottom: 15px;
`
const SelectTrigger = styled.div<{ isValid: boolean; isError: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 45px;
  max-height: auto;
  outline: 0;
  background-color: transparent;
  border: 2px solid
    ${({ isValid, isError, theme }) =>
      (isError && theme.palette?.error) || (isValid && theme.palette?.success) || theme.palette?.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.palette?.text.primary};
  padding: 10px 15px;
  font-size: 15px;
  line-height: 1.5;
  span {
    padding-right: 15px;
  }
`

const SelectDropdown = styled.ul`
  position: absolute;
  bottom: 100%;
  margin-bottom: 10px;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette?.bg.secondary};
  color: ${({ theme }) => theme.palette?.text.primary};
  z-index: 9;
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow} rgba(0, 0, 0, 0.3);
  &.options-enter {
    opacity: 0;
    margin-bottom: 0;
  }
  &.options-enter-active {
    margin-bottom: 10px;
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }
  &.options-exit-active {
    margin-bottom: 0;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }
`
const SelectOption = styled.li<{ isActive: boolean }>`
  padding: 10px 12px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s ease-in-out;
  font-size: 15px;
  span {
    font-size: 14px;
    line-height: 1.5;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.palette?.primary};
      color: #fff;
    `}
  &:hover {
    background-color: ${({ theme }) => theme.palette?.primary};
    color: #fff;
  }
`

interface SelectProps {
  options: ServicesOptions[]
  name: string
  placeholder: string
}

export const Select: React.FC<SelectProps> = ({ name, options, placeholder }) => {
  const { control, setValue, formState } = useFormContext()
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<string>('')
  const selectRef = React.useRef(null)
  useOnClickOutside(selectRef, () => setOpen(false))

  const onSetOption = (item: string) => {
    setSelected(item)
    setOpen(false)
  }

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      setSelected('')
    }
  }, [formState])

  React.useEffect(() => {
    if (selected) {
      setValue('services', selected, { shouldValidate: true, shouldDirty: true })
    }
  }, [selected, setValue])

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error, invalid, isDirty } }) => (
        <CustomSelect ref={selectRef}>
          <SelectTrigger
            onClick={() => {
              setOpen((prev) => !prev)
            }}
            isValid={!invalid && isDirty}
            isError={!!error?.message}
          >
            <span>{options.find((item) => item.value === selected)?.label || placeholder}</span>
            <Arrow isOpen={isOpen} />
          </SelectTrigger>
          <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames={'options'}>
            <SelectDropdown>
              {options.map((item, inx) => (
                <SelectOption
                  isActive={selected === item.value}
                  key={`select-option-${inx}`}
                  onClick={() => onSetOption(item.value)}
                >
                  <span>{item.label}</span>
                </SelectOption>
              ))}
            </SelectDropdown>
          </CSSTransition>

          {error && <Error>{error.message}</Error>}
        </CustomSelect>
      )}
    />
  )
}
